import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const token = localStorage.getItem("facultyToken"); // assuming token stored in localStorage
        const res = await axios.get("http://localhost:5000/api/auth/faculty-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFaculty(res.data.faculty);
      } catch (error) {
        console.error("Error fetching faculty profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!faculty) {
    return <div className="text-center mt-10 text-red-500">Faculty not found</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Faculty Profile</h2>
      <div className="space-y-3">
        <p><span className="font-semibold">ID:</span> {faculty.facultyId}</p>
        <p><span className="font-semibold">Name:</span> {faculty.name}</p>
        <p><span className="font-semibold">Email:</span> {faculty.email}</p>
        <p><span className="font-semibold">Designation:</span> {faculty.designation}</p>
        <p><span className="font-semibold">Department:</span> {faculty.department}</p>
        <p><span className="font-semibold">Roles:</span> {faculty.roles?.join(", ")}</p>
        <p><span className="font-semibold">Expertise:</span> {faculty.expertise?.join(", ")}</p>
        <p><span className="font-semibold">Status:</span> {faculty.status}</p>
      </div>
    </div>
  );
};

export default FacultyProfile;
