import React from 'react'

const VerifiedStatus = (props) => {
  return (
    <div className='flex gap-6 px-6 py-4 bg-gray-50 border-x border-blue-200'>
      <div className='flex-1 bg-green-50 border-2 border-green-200 p-6 rounded-xl text-center shadow-sm'>
        <h1 className='text-lg font-semibold text-green-800 mb-2'>Verified</h1>
        <p className='text-3xl font-bold text-green-600'>{props.status.verified}</p>
      </div>
      
      <div className='flex-1 bg-red-50 border-2 border-red-200 p-6 rounded-xl text-center shadow-sm'>
        <h1 className='text-lg font-semibold text-red-800 mb-2'>Not Verified</h1>
        <p className='text-3xl font-bold text-red-600'>{props.status.pending}</p>
      </div>
    </div>
  )
}

export default VerifiedStatus