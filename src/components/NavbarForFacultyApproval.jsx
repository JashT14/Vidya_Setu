// This file is copied from NavbarFaculty.jsx for FacultyApprovalPage usage

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const NavbarForFacultyApproval = () => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [faculty, setFaculty] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const dropdownRef = useRef(null);

  // Live Search states
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Live Mumbai Time Clock
  useEffect(() => {
    const updateMumbaiTime = () => {
      const now = new Date();
      const mumbaiTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
      const timeString = mumbaiTime.toLocaleTimeString('en-IN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    };

    // Update immediately
    updateMumbaiTime();

    // Set up interval to update every second
    const timeInterval = setInterval(updateMumbaiTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

  // Check authentication and fetch faculty data
  useEffect(() => {
    const checkFacultyAuth = async () => {
      const facultyToken = localStorage.getItem("facultyToken");

      if (!facultyToken) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/faculty-profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${facultyToken}` }
        });

        const data = await response.json();

        if (data.success) {
          setFaculty(data.faculty);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('facultyToken');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Faculty auth check failed:', error);
        localStorage.removeItem('facultyToken');
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkFacultyAuth();
  }, []);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Live Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await axios.get(`http://localhost:5000/api/auth/search?query=${encodeURIComponent(query)}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('facultyToken')}`,
          },
        });

        setResults(res.data?.results ? res.data.results : []);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleLogout = () => {
    localStorage.removeItem('facultyToken');
    setFaculty(null);
    setIsLoggedIn(false);
    setShowDropdown(false);
    window.location.href = '/';
  };

  const handleViewProfile = () => {
    setShowDropdown(false);
    window.location.href = '/faculty-profile';
  };

  const getInitials = (name) => {
    if (!name) return 'F';
    const cleanName = name.replace(/^(Dr\.?|Prof\.?|Mr\.?|Mrs\.?|Ms\.?|Miss)\s+/i, '');
    const names = cleanName.trim().split(' ').filter(n => n.length > 0);
    return names.length >= 2 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <>
      <div className="bg-blue-700 text-white text-sm py-1 text-center w-full">
        <div className="flex items-center justify-center gap-4">
          {/* Live Mumbai Time Display */}
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Mumbai Time:</span>
            <span className="text-white font-bold bg-blue-800 px-2 py-1 rounded">
              {currentTime}
            </span>
          </div>
          <span className="ml-6">
            <span className="mx-1 cursor-pointer">A-</span>
            <span className="mx-1 cursor-pointer font-bold border border-white rounded px-1">A</span>
            <span className="mx-1 cursor-pointer">A+</span>
            <span className="mx-1 cursor-pointer">◐</span>
            <span className="mx-1 cursor-pointer">🧑‍🦽</span>
            <span className="mx-1 cursor-pointer">More</span>
          </span>
        </div>
      </div>

      <nav className="navbar-section relative" aria-label="Main navigation">
        <div className="navbar-left relative">
          <div className="navbar-logos">
            <a href="https://www.digilocker.gov.in/" target="_blank" rel="noopener noreferrer">
              <img src="src/assets/digilocker.jpg" alt="Digilocker Logo" className="navbar-logo-img" />
            </a>
            <a href="https://www.mygov.in/" target="_blank" rel="noopener noreferrer">
              <img src="src/assets/mygov.png" alt="MyGov Logo" className="navbar-logo-img" />
            </a>
          </div>

          {/* Live Search Bar */}
          <div className="navbar-search relative">
            <input
              type="text"
              placeholder="Search Using Student ID..."
              className="navbar-search-input"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="navbar-search-icon" aria-label="Search icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>

            {/* Live Results Dropdown */}
            {query && results.length > 0 && (
              <ul className="absolute top-10 left-0 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto z-50">
                {results.slice(0, 10).map((student) => (
                  <li
                    key={student._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery('');
                      window.location.href = `/student/${student.studentId}`;
                    }}
                  >
                    <div className="font-semibold text-gray-800">{student.studentName}</div>
                    <div className="text-gray-500 text-sm">
                      ID: {student.studentId} &bull; Dept: {student.deptName || 'N/A'}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {searching && (
              <div className="absolute top-10 left-0 w-full bg-white border rounded px-4 py-2">
                Searching...
              </div>
            )}

            {/* No results */}
            {query && !searching && results.length === 0 && (
              <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-md z-50 px-3 py-2 text-sm text-gray-500">
                No student found
              </div>
            )}
          </div>
        </div>

        <div className="navbar-right">
          <span className="navbar-language-icon" aria-label="Language icon">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </span>
          <span className="navbar-language-label">Change Language:</span>
          <select className="navbar-language-select" defaultValue="English" aria-label="Change language">
            <option value="English">English</option>
            <option value="Hindi">हिन्दी</option>
            <option value="Marathi">मराठी</option>
          </select>

          <span
            className="navbar-avatar-btn relative inline-block cursor-pointer"
            tabIndex={0}
            aria-label={isLoggedIn && faculty ? `${faculty.name} profile` : "Faculty profile"}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
            onClick={handleProfileClick}
            ref={dropdownRef}
          >
            <span className="navbar-avatar">
              {loading ? '...' : (isLoggedIn && faculty ? getInitials(faculty.name) : 'F')}
            </span>
            <span className="navbar-avatar-dot" />

            {showDropdown && isLoggedIn && faculty && (
              <div
                style={{
                  position: 'absolute',
                  top: '45px',
                  right: '0',
                  background: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  border: '1px solid #e1e8ed',
                  minWidth: '220px',
                  zIndex: 1000
                }}
              >
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f3f7', background: '#f8fafc' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1a2e4f', marginBottom: '2px' }}>
                    {faculty.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    {faculty.facultyId} • Faculty
                  </div>
                  {faculty.designation && (
                    <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>{faculty.designation}</div>
                  )}
                  {faculty.department && (
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{faculty.department}</div>
                  )}
                </div>

                <div style={{ padding: '8px 0' }}>
                  <div
                    onClick={handleViewProfile}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      color: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    👤 View Profile
                  </div>
                  <div
                    onClick={() => {
                      setShowDropdown(false);
                      window.location.href = '/faculty-dashboard';
                    }}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      color: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    📊 Dashboard
                  </div>
                  <div
                    onClick={() => {
                      setShowDropdown(false);
                      window.location.href = '/faculty-settings';
                    }}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      color: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    ⚙️ Settings
                  </div>
                  <div style={{ height: '1px', background: '#f0f3f7', margin: '8px 0' }} />
                  <div
                    onClick={handleLogout}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      color: '#d32f2f',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#fff5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    🚪 Logout
                  </div>
                </div>
              </div>
            )}
          </span>
        </div>
      </nav>
    </>
  );
};

export default NavbarForFacultyApproval;