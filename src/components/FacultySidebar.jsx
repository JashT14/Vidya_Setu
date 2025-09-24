// import React from 'react';
// import { BsCalendar3, BsClipboard2Fill, BsFillPieChartFill, BsPersonFillCheck, BsFillPersonLinesFill, BsLaptop, BsFiles } from "react-icons/bs";
// import { PiScrollLight } from "react-icons/pi";
// import { IoSettingsSharp, IoExit } from "react-icons/io5";
// import { MdNotificationsActive } from "react-icons/md";

// const FacultySidebar = () => {
//   const userDetails = [
//     { name: 'Shraddha Mishra' },
//   ];

//   const handleItemHover = (e, isHovering) => {
//     if (isHovering) {
//       e.currentTarget.classList.add('bg-white/5', 'text-yellow-200', 'translate-x-1');
//     } else {
//       e.currentTarget.classList.remove('bg-white/5', 'text-yellow-200', 'translate-x-1');
//     }
//   };

//   return (
//     <div className="w-80 h-full bg-slate-800 text-white flex flex-col border-r border-gray-700 z-50">
//       <div className="flex justify-between items-center p-4 border-b border-gray-700 min-h-15">
//         <h1 className="font-semibold text-lg m-0 text-white">
//           Welcome, {userDetails.map(detail => detail.name)}
//         </h1>
//         <button className="font-bold text-lg bg-transparent border-none text-white cursor-pointer py-1 px-2 rounded hover:bg-white/10 transition-colors">
//           {">>"}
//         </button>
//       </div>

//       <nav className="p-4 flex-1 overflow-y-auto flex flex-col">
//         <div className="mb-8">
//           <div className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider pl-2">
//             ACADEMIC
//           </div>
//           <ul className="list-none p-0 m-0 flex flex-col gap-1">
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <BsCalendar3 className="text-lg min-w-4" />
//               <span>View Academic Records</span>
//             </li>
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <PiScrollLight className="text-lg min-w-4" />
//               <span>View Certificates</span>
//             </li>
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <BsClipboard2Fill className="text-lg min-w-4" />
//               <span>View Work Experiences</span>
//             </li>
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <BsFillPieChartFill className="text-lg min-w-4" />
//               <span>Generate Student Report</span>
//             </li>
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <BsLaptop className="text-lg min-w-4" />
//               <span>View Competitions</span>
//             </li>
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <BsFiles className="text-lg min-w-4" />
//               <span>View Course Plan</span>
//             </li>
//           </ul>
//         </div>

//         <div className="mb-8">
//           <div className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider pl-2">
//             PROFILE & APPLICATIONS
//           </div>
//           <ul className="list-none p-0 m-0 flex flex-col gap-1">
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <BsFillPersonLinesFill className="text-lg min-w-4" />
//               <span>User Profiles</span>
//             </li>
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <BsFiles className="text-lg min-w-4" />
//               <span>Document Hub</span>
//             </li>
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <BsPersonFillCheck className="text-lg min-w-4" />
//               <span>Approvals & Verification</span>
//             </li>
//           </ul>
//         </div>

//         <div className="mb-8">
//           <div className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider pl-2">
//             SETTINGS
//           </div>
//           <ul className="list-none p-0 m-0 flex flex-col gap-1">
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <IoSettingsSharp className="text-lg min-w-4" />
//               <span>Account Settings</span>
//             </li>
//             <li 
//               className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
//               onMouseEnter={(e) => handleItemHover(e, true)}
//               onMouseLeave={(e) => handleItemHover(e, false)}
//             >
//               <MdNotificationsActive className="text-lg min-w-4" />
//               <span>Notification Preferences</span>
//             </li>
//           </ul>
//         </div>

//         <div 
//           className="mt-auto py-4 px-2 font-semibold flex items-center gap-3 cursor-pointer text-red-500 rounded-md border-t border-gray-700 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 hover:translate-x-1"
//         >
//           <IoExit className="text-lg min-w-4" />
//           <span>Logout</span>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default FacultySidebar;

//TEST BELOW - DYNAMIC SIDEBAR

import React, { useState, useEffect } from 'react';
import { BsCalendar3, BsClipboard2Fill, BsFillPieChartFill, BsPersonFillCheck, BsFillPersonLinesFill, BsLaptop, BsFiles, BsSearch } from "react-icons/bs";
import { PiScrollLight } from "react-icons/pi";
import { IoSettingsSharp, IoExit } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";

const FacultySidebar = ({ onMenuSelect, onLogout }) => {
  const [facultyDetails, setFacultyDetails] = useState({ name: 'Loading...' });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    fetchFacultyProfile();
  }, []);

  const fetchFacultyProfile = async () => {
    try {
      const token = localStorage.getItem('facultyToken');
      if (!token) return;

      const response = await fetch('/api/auth/faculty-profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFacultyDetails({ name: data.faculty.name });
      } else {
        console.error('Failed to fetch faculty profile');
      }
    } catch (error) {
      console.error('Error fetching faculty profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('facultyToken');
      localStorage.removeItem('facultyData');
      
      // Call parent logout handler if provided
      if (onLogout) {
        onLogout();
      }
      
      // Redirect to login page
      window.location.href = '/faculty-login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleMenuClick = (menuId, menuData) => {
    setActiveItem(menuId);
    if (onMenuSelect) {
      onMenuSelect(menuId, menuData);
    }
  };

  const handleItemHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.classList.add('bg-white/5', 'text-yellow-200', 'translate-x-1');
    } else {
      e.currentTarget.classList.remove('bg-white/5', 'text-yellow-200', 'translate-x-1');
    }
  };

  const menuItems = {
    academic: [
      {
        id: 'view-students',
        icon: <BsFillPersonLinesFill className="text-lg min-w-4" />,
        label: 'View All Students',
        endpoint: '/api/auth/faculty/students',
        description: 'View all student records with pagination'
      },
      {
        id: 'academic-records',
        icon: <BsCalendar3 className="text-lg min-w-4" />,
        label: 'View Academic Records',
        endpoint: '/api/auth/faculty/academic-records',
        description: 'View student academic records'
      },
      {
        id: 'certificates',
        icon: <PiScrollLight className="text-lg min-w-4" />,
        label: 'View Certificates',
        endpoint: null,
        description: 'View student certificates (To be implemented)'
      },
      {
        id: 'work-experiences',
        icon: <BsClipboard2Fill className="text-lg min-w-4" />,
        label: 'View Work Experiences',
        endpoint: '/api/auth/faculty/work-experiences',
        description: 'View student work experiences'
      },
      {
        id: 'student-report',
        icon: <BsFillPieChartFill className="text-lg min-w-4" />,
        label: 'Generate Student Report',
        endpoint: '/api/auth/faculty/student-report',
        description: 'Generate comprehensive student reports'
      },
      {
        id: 'competitions',
        icon: <BsLaptop className="text-lg min-w-4" />,
        label: 'View Competitions',
        endpoint: '/api/auth/faculty/competitions',
        description: 'View student competitions'
      },
      {
        id: 'course-plan',
        icon: <BsFiles className="text-lg min-w-4" />,
        label: 'View Course Plan',
        endpoint: null,
        description: 'View course plans (To be implemented)'
      }
    ],
    profile: [
      {
        id: 'user-profiles',
        icon: <BsFillPersonLinesFill className="text-lg min-w-4" />,
        label: 'User Profiles',
        endpoint: '/api/auth/faculty-profile',
        description: 'View and manage user profiles'
      },
      {
        id: 'document-hub',
        icon: <BsFiles className="text-lg min-w-4" />,
        label: 'Document Hub',
        endpoint: null,
        description: 'Access document repository (To be implemented)'
      },
      {
        id: 'approvals',
        icon: <BsPersonFillCheck className="text-lg min-w-4" />,
        label: 'Approvals & Verification',
        endpoint: null,
        description: 'Handle approvals and verifications (To be implemented)'
      }
    ],
    settings: [
      {
        id: 'account-settings',
        icon: <IoSettingsSharp className="text-lg min-w-4" />,
        label: 'Account Settings',
        endpoint: '/api/auth/update-faculty',
        description: 'Update faculty account settings'
      },
    ]
  };

  const renderMenuItem = (item) => (
    <li 
      key={item.id}
      className={`flex items-center gap-3 cursor-pointer py-3 px-2 rounded-md text-sm font-medium transition-all duration-200 ${
        activeItem === item.id 
          ? 'bg-blue-600/20 text-blue-300 border-l-2 border-blue-400' 
          : 'text-gray-300 hover:bg-white/5 hover:text-yellow-200'
      } ${!item.endpoint ? 'opacity-60' : ''}`}
      onMouseEnter={(e) => handleItemHover(e, true)}
      onMouseLeave={(e) => handleItemHover(e, false)}
      onClick={() => item.endpoint && handleMenuClick(item.id, item)}
      title={item.description}
    >
      {item.icon}
      {!isCollapsed && (
        <>
          <span>{item.label}</span>
          {!item.endpoint && <span className="text-xs text-gray-500 ml-auto">(Soon)</span>}
        </>
      )}
    </li>
  );

  return (
    <div className={`${isCollapsed ? 'w-18' : 'w-80'} h-full bg-slate-800 text-white flex flex-col border-r border-gray-700 z-50 transition-all duration-300`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-700 min-h-15">
        {!isCollapsed && (
          <h1 className="font-semibold text-lg m-0 text-white">
            Welcome, {facultyDetails.name}
          </h1>
        )}
        <button 
          className="font-bold text-lg bg-transparent border-none text-white cursor-pointer py-1 px-2 rounded hover:bg-white/10 transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? ">>" : "<<"}
        </button>
      </div>

      <nav className="p-4 flex-1 overflow-y-auto flex flex-col">
        <div className="mb-8">
          {!isCollapsed && (
            <div className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider pl-2">
              ACADEMIC & STUDENTS
            </div>
          )}
          <ul className="list-none p-0 m-0 flex flex-col gap-1">
            {menuItems.academic.map(renderMenuItem)}
          </ul>
        </div>

        <div className="mb-8">
          {!isCollapsed && (
            <div className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider pl-2">
              PROFILE & APPLICATIONS
            </div>
          )}
          <ul className="list-none p-0 m-0 flex flex-col gap-1">
            {menuItems.profile.map(renderMenuItem)}
          </ul>
        </div>

        <div className="mb-8">
          {!isCollapsed && (
            <div className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider pl-2">
              SETTINGS
            </div>
          )}
          <ul className="list-none p-0 m-0 flex flex-col gap-1">
            {menuItems.settings.map(renderMenuItem)}
          </ul>
        </div>

        <div 
          className="mt-auto py-4 px-2 font-semibold flex items-center gap-3 cursor-pointer text-red-500 rounded-md border-t border-gray-700 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 hover:translate-x-1"
          onClick={handleLogout}
          title="Logout from faculty panel"
        >
          <IoExit className="text-lg min-w-4" />
          {!isCollapsed && <span>Logout</span>}
        </div>
      </nav>
    </div>
  );
};

export default FacultySidebar;