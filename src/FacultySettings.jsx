import React, { useState, useEffect } from 'react';
import { 
  BsPersonFill, 
  BsBellFill, 
  BsShieldLockFill, 
  BsDisplayFill,
  BsCalendarFill,
  BsGearFill,
  BsCloudArrowUpFill,
  BsFileEarmarkTextFill,
  BsEnvelopeFill,
  BsCameraFill,
  BsPencilSquare,
  BsCheckCircleFill,
  BsXCircleFill
} from "react-icons/bs";
import { IoSettingsSharp, IoNotifications, IoLockClosed, IoEye, IoEyeOff } from "react-icons/io5";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

const FacultySettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [facultyData, setFacultyData] = useState({
    // Profile Information
    personalInfo: {
      fullName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      emergencyContact: '',
      dateOfBirth: '',
      address: '',
      profilePicture: null
    },
    // Academic Information
    academicInfo: {
      facultyId: '',
      designation: '',
      department: '',
      joiningDate: '',
      qualifications: '',
      specialization: '',
      experience: '',
      researchInterests: '',
      personalWebsite: '',
      linkedinProfile: '',
      orcidId: ''
    },
    // Notification Settings
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      studentSubmissions: true,
      systemUpdates: true,
      courseUpdates: true,
      reminderNotifications: true,
      weeklyDigest: false,
      notificationFrequency: 'immediate'
    },
    // Privacy & Security
    security: {
      twoFactorEnabled: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      sessionTimeout: '30',
      profileVisibility: 'public',
      contactInfoVisibility: 'department'
    },
    // Display Preferences
    display: {
      theme: 'light',
      language: 'english',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      dashboardLayout: 'default'
    },
    // Teaching Preferences
    teaching: {
      officeHours: {
        monday: { start: '10:00', end: '12:00', available: true },
        tuesday: { start: '10:00', end: '12:00', available: true },
        wednesday: { start: '10:00', end: '12:00', available: true },
        thursday: { start: '10:00', end: '12:00', available: true },
        friday: { start: '10:00', end: '12:00', available: true },
        saturday: { start: '', end: '', available: false },
        sunday: { start: '', end: '', available: false }
      },
      maxStudentsPerSlot: '3',
      bookingAdvanceTime: '24',
      autoApproveAppointments: false,
      emailReminders: true
    }
  });

  const [originalData, setOriginalData] = useState(facultyData);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    fetchFacultyData();
  }, []);

  // API NEEDED: GET /api/auth/faculty/settings
  const fetchFacultyData = async () => {
    try {
      const token = localStorage.getItem('facultyToken');
      const response = await fetch('/api/auth/faculty/settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFacultyData(data.settings);
        setOriginalData(data.settings);
      }
    } catch (error) {
      console.error('Error fetching faculty settings:', error);
      // Show demo data for now
      setSaveStatus('Demo mode - Changes will not be saved');
    }
  };

  // API NEEDED: PUT /api/auth/faculty/settings
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('facultyToken');
      const response = await fetch('/api/auth/faculty/settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(facultyData)
      });

      if (response.ok) {
        setOriginalData(facultyData);
        setIsEditing(false);
        setSaveStatus('Settings saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('Error saving settings. Please try again.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('Work in Progress - API not implemented yet');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleCancel = () => {
    setFacultyData(originalData);
    setIsEditing(false);
    setSaveStatus('Changes discarded');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  // API NEEDED: POST /api/auth/faculty/upload-profile-picture
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        const token = localStorage.getItem('facultyToken');
        const response = await fetch('/api/auth/faculty/upload-profile-picture', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          setFacultyData(prev => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              profilePicture: result.profilePictureUrl
            }
          }));
          setSaveStatus('Profile picture uploaded successfully!');
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        setSaveStatus('Work in Progress - Profile upload API not implemented');
      }
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Academic', icon: <BsPersonFill /> },
    { id: 'notifications', label: 'Notifications', icon: <BsBellFill /> },
    { id: 'security', label: 'Privacy & Security', icon: <BsShieldLockFill /> },
    { id: 'display', label: 'Display Settings', icon: <BsDisplayFill /> },
    { id: 'teaching', label: 'Teaching Preferences', icon: <BsCalendarFill /> }
  ];

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BsCameraFill className="text-blue-600" />
          Profile Picture
        </h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {facultyData.personalInfo.profilePicture ? (
              <img 
                src={facultyData.personalInfo.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <BsPersonFill className="text-4xl text-gray-500" />
            )}
          </div>
          <div>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
            <label 
              htmlFor="profilePicture"
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <BsCloudArrowUpFill />
              Upload Photo
            </label>
            <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={facultyData.personalInfo.fullName}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, fullName: e.target.value }
              }))}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={facultyData.personalInfo.email}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, email: e.target.value }
              }))}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={facultyData.personalInfo.phoneNumber}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, phoneNumber: e.target.value }
              }))}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
            <input
              type="tel"
              value={facultyData.personalInfo.emergencyContact}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, emergencyContact: e.target.value }
              }))}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Faculty ID</label>
            <input
              type="text"
              value={facultyData.academicInfo.facultyId}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
            <select
              value={facultyData.academicInfo.designation}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                academicInfo: { ...prev.academicInfo, designation: e.target.value }
              }))}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="">Select Designation</option>
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Senior Lecturer">Senior Lecturer</option>
              <option value="Research Fellow">Research Fellow</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              value={facultyData.academicInfo.department}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date</label>
            <input
              type="date"
              value={facultyData.academicInfo.joiningDate}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Research Interests</label>
            <textarea
              value={facultyData.academicInfo.researchInterests}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                academicInfo: { ...prev.academicInfo, researchInterests: e.target.value }
              }))}
              disabled={!isEditing}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Describe your research interests and areas of expertise..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <IoNotifications className="text-blue-600" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and mobile app notifications' },
            { key: 'studentSubmissions', label: 'Student Submissions', desc: 'Notify when students submit assignments' },
            { key: 'systemUpdates', label: 'System Updates', desc: 'Important system announcements' },
            { key: 'courseUpdates', label: 'Course Updates', desc: 'Changes to course schedules and content' },
            { key: 'reminderNotifications', label: 'Reminder Notifications', desc: 'Upcoming deadlines and events' },
            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of weekly activities' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={facultyData.notifications[item.key]}
                  onChange={(e) => setFacultyData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, [item.key]: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <IoLockClosed className="text-red-600" />
          Security Settings
        </h3>
        <div className="space-y-6">
          {/* Change Password */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Change Password</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={facultyData.security.currentPassword}
                    onChange={(e) => setFacultyData(prev => ({
                      ...prev,
                      security: { ...prev.security, currentPassword: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-sm text-orange-600 mt-2 bg-orange-50 p-2 rounded">
              Work in Progress - Password change API not implemented yet
            </p>
          </div>

          {/* Two Factor Authentication */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={facultyData.security.twoFactorEnabled}
                  onChange={(e) => setFacultyData(prev => ({
                    ...prev,
                    security: { ...prev.security, twoFactorEnabled: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {facultyData.security.twoFactorEnabled && (
              <p className="text-sm text-orange-600 mt-2 bg-orange-50 p-2 rounded">
                Work in Progress - 2FA setup API not implemented yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisplayTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BsDisplayFill className="text-purple-600" />
          Display Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select
              value={facultyData.display.theme}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                display: { ...prev.display, theme: e.target.value }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={facultyData.display.language}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                display: { ...prev.display, language: e.target.value }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="marathi">Marathi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
            <select
              value={facultyData.display.timezone}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                display: { ...prev.display, timezone: e.target.value }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">EST (America/New_York)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select
              value={facultyData.display.dateFormat}
              onChange={(e) => setFacultyData(prev => ({
                ...prev,
                display: { ...prev.display, dateFormat: e.target.value }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeachingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BsCalendarFill className="text-green-600" />
          Office Hours & Teaching Preferences
        </h3>
        <div className="space-y-6">
          {/* Office Hours */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Office Hours</h4>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(facultyData.teaching.officeHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                  <div className="w-24">
                    <span className="font-medium capitalize">{day}</span>
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hours.available}
                      onChange={(e) => setFacultyData(prev => ({
                        ...prev,
                        teaching: {
                          ...prev.teaching,
                          officeHours: {
                            ...prev.teaching.officeHours,
                            [day]: { ...hours, available: e.target.checked }
                          }
                        }
                      }))}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    Available
                  </label>
                  {hours.available && (
                    <>
                      <input
                        type="time"
                        value={hours.start}
                        onChange={(e) => setFacultyData(prev => ({
                          ...prev,
                          teaching: {
                            ...prev.teaching,
                            officeHours: {
                              ...prev.teaching.officeHours,
                              [day]: { ...hours, start: e.target.value }
                            }
                          }
                        }))}
                        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={hours.end}
                        onChange={(e) => setFacultyData(prev => ({
                          ...prev,
                          teaching: {
                            ...prev.teaching,
                            officeHours: {
                              ...prev.teaching.officeHours,
                              [day]: { ...hours, end: e.target.value }
                            }
                          }
                        }))}
                        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-orange-600 mt-2 bg-orange-50 p-2 rounded">
              Work in Progress - Office hours API not implemented yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Faculty Settings</h1>
          <p className="text-gray-600">Manage your profile, preferences, and account settings</p>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            saveStatus.includes('successfully') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : saveStatus.includes('Error') || saveStatus.includes('Work in Progress')
              ? 'bg-orange-50 text-orange-800 border border-orange-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {saveStatus.includes('successfully') ? <BsCheckCircleFill /> : <BsXCircleFill />}
            {saveStatus}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <MdEdit />
              Edit Settings
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <MdSave />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <MdCancel />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                  <BsGearFill className="text-blue-600" />
                  Settings Menu
                </h2>
              </div>
              <nav className="p-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center gap-3 transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <span className={`text-lg ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'}`}>
                      {tab.icon}
                    </span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* API Status Info */}
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <BsFileEarmarkTextFill />
                API Status
              </h3>
              <div className="text-sm text-amber-700 space-y-1">
                <p>✅ Profile Data: Available</p>
                <p>🔄 Settings Save: In Progress</p>
                <p>🔄 Password Change: Not Implemented</p>
                <p>🔄 2FA Setup: Not Implemented</p>
                <p>🔄 Office Hours: Not Implemented</p>
                <p>🔄 Profile Upload: Not Implemented</p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'display' && renderDisplayTab()}
            {activeTab === 'teaching' && renderTeachingTab()}
          </div>
        </div>

        {/* Required APIs Comment Section */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BsFileEarmarkTextFill className="text-blue-600" />
            Required API Endpoints (For Backend Development)
          </h3>
          <div className="text-sm text-gray-700 space-y-2 font-mono bg-white p-4 rounded border">
            <p><strong>GET</strong> /api/auth/faculty/settings - Fetch current faculty settings</p>
            <p><strong>PUT</strong> /api/auth/faculty/settings - Update faculty settings</p>
            <p><strong>POST</strong> /api/auth/faculty/upload-profile-picture - Upload profile picture</p>
            <p><strong>PUT</strong> /api/auth/faculty/change-password - Change password</p>
            <p><strong>POST</strong> /api/auth/faculty/enable-2fa - Enable/disable 2FA</p>
            <p><strong>PUT</strong> /api/auth/faculty/office-hours - Update office hours</p>
            <p><strong>GET</strong> /api/auth/faculty/notification-settings - Get notification preferences</p>
            <p><strong>PUT</strong> /api/auth/faculty/notification-settings - Update notification preferences</p>
            <p><strong>DELETE</strong> /api/auth/faculty/delete-account - Delete faculty account (admin)</p>
            <p><strong>POST</strong> /api/auth/faculty/export-data - Export faculty data (GDPR compliance)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultySettings;