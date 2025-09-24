import React from 'react'

const FacultyPromotionBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border border-blue-200 rounded-t-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Empower Student Success – Shape the Future of Education!
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Join our mission to streamline student verification and academic excellence. 
            Access advanced tools for student management, generate comprehensive reports, 
            and contribute to building a transparent educational ecosystem recognized by educational institutions nationwide.
          </p>
          <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2">
            Access Faculty Dashboard →
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-md">
            <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM18 11H16V13H14V15H16V17H18V15H20V13H18V11Z"/>
            </svg>
          </div>
          <div className="bg-white p-3 rounded-full shadow-md">
            <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyPromotionBanner