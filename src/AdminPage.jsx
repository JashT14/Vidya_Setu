// import React from 'react'
// import NavbarAdmin from './components/NavbarAdmin'

// const AdminPage = () => {
//   return (
//     <>
//         <NavbarAdmin/>
//         <h1>Admin Dashboard HERE</h1>
//     </>
//   )
// }

// export default AdminPage




import React, { useEffect, useState } from "react";
import NavbarAdmin from "./components/NavbarAdmin";

const AdminPage = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Example: fetch from your backend
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch('http://localhost:5000/api/auth/admin-profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setAdmin(data.admin);
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Admin Dashboard
        </h1>

        {!admin ? (
          <p className="text-gray-500">Loading admin profile...</p>
        ) : (
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-center text-indigo-500 mb-6">
              Profile Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">ID:</span>
                <span className="text-gray-600">{admin.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-gray-600">{admin.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">{admin.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Role:</span>
                <span className="text-gray-600">{admin.role}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Institute:</span>
                <span className="text-gray-600">{admin.instituteName}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Designation:</span>
                <span className="text-gray-600">{admin.designation}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Compliance Access:</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    admin.complianceAccess
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {admin.complianceAccess ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Report Generation:</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    admin.reportGeneration
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {admin.reportGeneration ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPage;
