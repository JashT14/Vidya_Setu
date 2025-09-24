import React, { useState } from 'react'
import {
  BookOpen,
  Award,
  Briefcase,
  Target,
  Trophy,
  Upload,
  User,
  FolderOpen,
  FileText,
  CheckCircle,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Eye
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SidebarSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleWorkExperiencesClick = () => {
    navigate('/work-experiences')
  }

  const handleCompetitionsClick = () => {
    navigate('/competitions')
  }

  const handleUploadDocumentClick = () => {
    navigate('/upload-documents')
  }

  return (
    <aside className="w-64 min-h-screen bg-blue-500 text-white font-sans flex flex-col">
      <div className="flex items-center justify-between p-5 border-b border-white border-opacity-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-500 font-bold text-xs">
            RV
          </div>
          <span className="font-semibold text-sm">Welcome, Ram Vyas!</span>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 hover:bg-blue-600 rounded p-2 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="py-4 flex-1 flex flex-col">
        <div className="mb-6">
          <div className="px-4 pb-2 font-bold text-xs tracking-wide uppercase text-white">
            ACADEMIC
          </div>

          <div
            className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200"
            onClick={handleUploadDocumentClick}
          >
            <Upload className="w-4 h-4 mr-3" />
            Upload Document
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <BookOpen className="w-4 h-4 mr-3" />
            My Academic Records
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <Award className="w-4 h-4 mr-3" />
            Certificates & Courses
          </div>

          <div
            className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200"
            onClick={handleWorkExperiencesClick}
          >
            <Briefcase className="w-4 h-4 mr-3" />
            Work Experiences
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <Target className="w-4 h-4 mr-3" />
            Skill Development
          </div>

          <div
            className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200"
            onClick={handleCompetitionsClick}
          >
            <Trophy className="w-4 h-4 mr-3" />
            Competitions
          </div>
        </div>

        <div className="mb-6">
          <div className="px-4 pb-2 font-bold text-xs tracking-wide uppercase text-white">
            PROFILE & APPLICATIONS
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <User className="w-4 h-4 mr-3" />
            Profile
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <FolderOpen className="w-4 h-4 mr-3" />
            Document Hub
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <FileText className="w-4 h-4 mr-3" />
            Applications & Requests
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <CheckCircle className="w-4 h-4 mr-3" />
            Approvals & Verification
          </div>
        </div>

        <div className="mb-8">
          <div className="px-4 pb-2 font-bold text-xs tracking-wide uppercase text-white">
            SETTINGS
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <Settings className="w-4 h-4 mr-3" />
            Account Settings
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <Bell className="w-4 h-4 mr-3" />
            Notification Preferences
          </div>

          <div className="flex items-center px-4 py-3 text-sm cursor-pointer hover:underline transition-all duration-200">
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default SidebarSection
