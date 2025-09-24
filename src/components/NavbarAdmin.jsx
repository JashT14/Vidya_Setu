import React, { useState, useEffect, useRef } from 'react';
import '../styles/NavbarSection.css';

const NavbarAdmin = () => {
  const [isAdminHovered, setIsAdminHovered] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Check authentication and fetch admin data on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");// || sessionStorage.getItem('authToken');
      
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/admin-profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data.success) {
          setAdmin(data.admin);
          setIsLoggedIn(true);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Remove invalid token
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Remove tokens
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    
    // Reset state
    setAdmin(null);
    setIsLoggedIn(false);
    setShowDropdown(false);
    
    // Redirect to admin login page
    window.location.href = '/admin-login';
  };

  const handleViewDetails = () => {
    setShowDropdown(false);
    // Navigate to protected admin profile route
    window.location.href = '/admin-profile';
  };

  const handleDashboard = () => {
    setShowDropdown(false);
    // Navigate to admin dashboard
    window.location.href = '/admin-dashboard';
  };

  const handleManageUsers = () => {
    setShowDropdown(false);
    // Navigate to user management
    window.location.href = '/admin/manage-users';
  };

  const handleSettings = () => {
    setShowDropdown(false);
    // Navigate to admin settings
    window.location.href = '/admin/settings';
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return names[0][0];
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown);
    } else {
      window.location.href = '/admin-login';
    }
  };

  return (
    <nav className="navbar-section" aria-label="Admin navigation">
      <div className="navbar-left">
        <div className="navbar-logos">
          <a href="https://www.digilocker.gov.in/" target="_blank" rel="noopener noreferrer">
            <img src="src/assets/digilocker.jpg" alt="Digilocker Logo" className="navbar-logo-img" />
          </a>
          <a href="https://www.mygov.in/" target="_blank" rel="noopener noreferrer">
            <img src="src/assets/mygov.png" alt="MyGov Logo" className="navbar-logo-img" />
          </a>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search users, certificates, courses, or events..."
            className="navbar-search-input"
            aria-label="Admin Search"
          />
          <span className="navbar-search-icon" aria-label="Search icon">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <span className="navbar-portfolio-icon" aria-label="Admin Portfolio icon">
            <img src="/src/assets/portfolio.png" alt="admin-portfolio-icon" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
          </span>
          <span className="navbar-info-icon" aria-label="Admin Info icon">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </span>
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
        
        <span className="navbar-portfolio-icon" aria-label="Admin Portfolio icon">
          <img src="/src/assets/portfolio.png" alt="admin-portfolio-icon" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
        </span>
        <span className="navbar-info-icon" aria-label="Admin Info icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </span>

        <span className="navbar-icon-btn" tabIndex={0} aria-label="Admin Notifications">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 1 0-12 0c0 7 6 13 6 13s6-6 6-13z" />
          </svg>
          <span className="navbar-notification-dot" />
          <span className="navbar-tooltip">Admin Notifications</span>
        </span>
        
        <span className="navbar-icon-btn" tabIndex={0} aria-label="Export Reports">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M19 12l-7 7-7-7" />
          </svg>
          <span className="navbar-tooltip">Export Reports</span>
        </span>
        
        <span 
          className="navbar-avatar-btn" 
          tabIndex={0} 
          aria-label={isLoggedIn && admin ? `${admin.adminName || admin.name} profile` : "Admin profile"}
          onMouseEnter={() => setIsAdminHovered(true)}
          onMouseLeave={() => setIsAdminHovered(false)}
          onClick={handleProfileClick}
          style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
          ref={dropdownRef}
        >
          <span className="navbar-avatar" style={{ backgroundColor: '#d32f2f', color: '#fff' }}>
            {loading ? '...' : (isLoggedIn && admin ? getInitials(admin.adminName || admin.name) : 'A')}
          </span>
          <span className="navbar-avatar-dot" style={{ backgroundColor: '#4caf50' }} />
          
          {/* Admin Dropdown Menu */}
          {showDropdown && isLoggedIn && admin && (
            <div style={{ 
              position: 'absolute', 
              top: '45px', 
              right: '0', 
              background: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)', 
              border: '1px solid #e1e8ed',
              minWidth: '220px',
              zIndex: 1000
            }}>
              {/* Admin Info Header */}
              <div style={{ 
                padding: '12px 16px', 
                borderBottom: '1px solid #f0f3f7',
                background: '#f8fafc'
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#d32f2f', marginBottom: '2px' }}>
                  {admin.adminName || admin.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>
                  Admin • {admin.adminId || admin.id}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '2px' }}>
                  {admin.email}
                </div>
              </div>

              {/* Admin Dropdown Options */}
              <div style={{ padding: '8px 0' }}>
                <div 
                  onClick={handleDashboard}
                  style={{ 
                    padding: '10px 16px', 
                    cursor: 'pointer', 
                    fontSize: '0.9rem',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>📊</span>
                  Dashboard
                </div>

                <div 
                  onClick={handleViewDetails}
                  style={{ 
                    padding: '10px 16px', 
                    cursor: 'pointer', 
                    fontSize: '0.9rem',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>👤</span>
                  Profile Details
                </div>

                <div 
                  onClick={handleManageUsers}
                  style={{ 
                    padding: '10px 16px', 
                    cursor: 'pointer', 
                    fontSize: '0.9rem',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>👥</span>
                  Manage Users
                </div>

                <div 
                  onClick={handleSettings}
                  style={{ 
                    padding: '10px 16px', 
                    cursor: 'pointer', 
                    fontSize: '0.9rem',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>⚙️</span>
                  Settings
                </div>
                
                <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #f0f3f7' }} />
                
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
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fff5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>🚪</span>
                  Logout
                </div>
              </div>
            </div>
          )}
        </span>
      </div>
    </nav>
  );
};

export default NavbarAdmin;