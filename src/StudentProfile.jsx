import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming token is stored in localStorage
        const res = await axios.get("http://localhost:5000/api/auth/student-profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          setStudent(res.data.student);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Profile</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-semibold">Student ID:</span>
          <span>{student.studentId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Name:</span>
          <span>{student.studentName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{student.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">College:</span>
          <span>{student.collegeName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Department:</span>
          <span>{student.deptName} ({student.deptId})</span>
        </div>
      </div>
    </div>
  );
}