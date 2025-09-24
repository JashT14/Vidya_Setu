// import React from 'react'
// import { BiSort } from "react-icons/bi";
// import studentData from '../data/studentdata';
// import { RiFileListFill } from "react-icons/ri";

// const FacultyStudentDataTable = () => {
//   const getVerificationBadge = (status) => {
//     if (status === 'Verified' || status === 'verified') {
//       return (
//         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
//           ✓ Verified
//         </span>
//       );
//     } else {
//       return (
//         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
//           ✗ Pending
//         </span>
//       );
//     }
//   };

//   return (
//     <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
//       <h1 className='text-xl font-bold flex items-center gap-2 mb-6 text-gray-800'>
//         <RiFileListFill className="text-blue-600" />
//         Student Records and Verification Status
//       </h1>
      
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-50 border-b-2 border-gray-200">
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Student Name
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Student ID
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Department
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Verification Status
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {studentData.map((element, index) => (
//               <tr 
//                 key={index} 
//                 className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//               >
//                 <td className="py-4 px-6 font-medium text-gray-900">
//                   {element.name}
//                 </td>
//                 <td className="py-4 px-6 text-gray-700 font-mono text-sm">
//                   {element.id}
//                 </td>
//                 <td className="py-4 px-6 text-gray-700">
//                   <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
//                     {element.department}
//                   </span>
//                 </td>
//                 <td className="py-4 px-6">
//                   {getVerificationBadge(element.verification)}
//                 </td>
//                 <td className="py-4 px-6">
//                   <button
//                     onClick={() => generateStudentPortfolio(element)}
//                     className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     Generate Portfolio
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default FacultyStudentDataTable


// import React, { useState, useEffect } from 'react';
// import { BiSort } from "react-icons/bi";
// import { RiFileListFill } from "react-icons/ri";

// const FacultyStudentDataTable = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch students data when component mounts
//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('facultyToken'); // or however you store the token
      
//       const response = await fetch('/api/auth/faculty/students', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setStudents(data.students);
//       } else {
//         setError(data.message || 'Failed to fetch students');
//       }
//     } catch (err) {
//       console.error('Error fetching students:', err);
//       setError('Network error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getVerificationBadge = (status) => {
//     // Keep verification status blank for now as it's a different schema
//     return (
//       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
//         - Not Available -
//       </span>
//     );
//   };

//   const generateStudentPortfolio = (student) => {
//     // Portfolio generation logic here
//     console.log('Generating portfolio for:', student);
//     // Implement portfolio generation
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
//         <div className="flex justify-center items-center h-32">
//           <div className="text-gray-500">Loading students...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
//         <div className="flex justify-center items-center h-32">
//           <div className="text-red-500">Error: {error}</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
//       <h1 className='text-xl font-bold flex items-center gap-2 mb-6 text-gray-800'>
//         <RiFileListFill className="text-blue-600" />
//         Student Records and Verification Status
//       </h1>
      
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-50 border-b-2 border-gray-200">
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Student Name
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Student ID
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Department
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Verification Status
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="py-8 px-6 text-center text-gray-500">
//                   No students found
//                 </td>
//               </tr>
//             ) : (
//               students.map((student, index) => (
//                 <tr 
//                   key={student._id || index} 
//                   className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="py-4 px-6 font-medium text-gray-900">
//                     {student.studentName}
//                   </td>
//                   <td className="py-4 px-6 text-gray-700 font-mono text-sm">
//                     {student.studentId}
//                   </td>
//                   <td className="py-4 px-6 text-gray-700">
//                     <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
//                       {student.deptName}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     {getVerificationBadge(null)}
//                   </td>
//                   <td className="py-4 px-6">
//                     <button
//                       onClick={() => generateStudentPortfolio(student)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
//                     >
//                       Generate Resume
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FacultyStudentDataTable;

import React, { useState, useEffect } from 'react';
import { BiSort, BiX, BiDownload } from "react-icons/bi";
import { RiFileListFill } from "react-icons/ri";

const FacultyStudentDataTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const sampleStudents = [
    {
      _id: '1',
      studentId: '202400000001',
      studentName: 'Aarav Mehta',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Computer Science',
      deptId: 'CSE01',
      email: 'aarav.mehta@example.com',
      status: 'active',
      academicYear: '2024-2025',
      semester: '5',
      phoneNumber: '9876543210'
    },
    {
      _id: '6',
      studentId: '202400000006',
      studentName: 'Ananya Roy',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Electronics',
      deptId: 'ECE01',
      email: 'ananya.roy@example.com',
      status: 'active',
      academicYear: '2023-2024',
      semester: '4',
      phoneNumber: '9554433221'
    },
    {
      _id: '7',
      studentId: '202400000007',
      studentName: 'Devansh Patel',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Mechanical',
      deptId: 'MECH01',
      email: 'devansh.patel@example.com',
      status: 'active',
      academicYear: '2024-2025',
      semester: '2',
      phoneNumber: '9112233445'
    },
    {
      _id: '5',
      studentId: '202400000005',
      studentName: 'Kabir Verma',
      collegeName: 'Vidyasetu College of Science',
      deptName: 'Physics',
      deptId: 'PHY01',
      email: 'kabir.verma@example.com',
      status: 'suspended',
      academicYear: '2021-2022',
      semester: '6',
      phoneNumber: '9001122334'
    },
    {
      _id: '2',
      studentId: '202400000002',
      studentName: 'Priya Sharma',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Information Technology',
      deptId: 'IT01',
      email: 'priya.sharma@example.com',
      status: 'active',
      academicYear: '2023-2024',
      semester: '7',
      phoneNumber: '9876501234'
    },
    {
      _id: '3',
      studentId: '202400000003',
      studentName: 'Rohan Gupta',
      collegeName: 'Vidyasetu College of Business',
      deptName: 'Management',
      deptId: 'MGT01',
      email: 'rohan.gupta@example.com',
      status: 'inactive',
      academicYear: '2022-2023',
      semester: '3',
      phoneNumber: '9123456789'
    },
    {
      _id: '4',
      studentId: '202400000004',
      studentName: 'Sneha Iyer',
      collegeName: 'Vidyasetu College of Arts',
      deptName: 'English Literature',
      deptId: 'ENG01',
      email: 'sneha.iyer@example.com',
      status: 'active',
      academicYear: '2024-2025',
      semester: '1',
      phoneNumber: '9988776655'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setStudents(sampleStudents);
      setLoading(false);
    }, 800);
  }, []);

  const createResumeData = (student) => {
    const roles = ['Full Stack Developer', 'ML Engineer', 'Mobile App Developer', 'Data Scientist', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer'];
    const companies = ['TechCorp', 'InnovateLabs', 'StartupHub', 'CodeCraft', 'Digital Solutions', 'TechVenture'];
    
    const skills = {
      'Computer Science': ['React', 'Node.js', 'Python', 'MongoDB', 'JavaScript', 'TypeScript', 'AWS'],
      'Information Technology': ['Java', 'Spring Boot', 'MySQL', 'Docker', 'Kubernetes', 'Jenkins', 'Git'],
      'Management': ['Project Management', 'Agile', 'Scrum', 'Business Analysis', 'Leadership', 'Strategy'],
      'English Literature': ['Content Writing', 'Technical Documentation', 'Communication', 'Research', 'Editing'],
      'Physics': ['Python', 'MATLAB', 'Data Analysis', 'Machine Learning', 'Research', 'Scientific Computing'],
      'Electronics': ['C++', 'Arduino', 'VLSI Design', 'PCB Design', 'Embedded Systems', 'IoT', 'Signal Processing'],
      'Mechanical': ['AutoCAD', 'SolidWorks', 'MATLAB', '3D Modeling', 'Manufacturing', 'Design Analysis', 'CAM']
    };

    const projects = [
      { name: 'E-commerce Platform', tech: 'React, Node.js, MongoDB', desc: 'Built a full-stack e-commerce application with payment integration' },
      { name: 'AI Chatbot', tech: 'Python, TensorFlow, NLP', desc: 'Developed an intelligent chatbot using natural language processing' },
      { name: 'Mobile Weather App', tech: 'React Native, API Integration', desc: 'Created a cross-platform weather application with real-time data' },
      { name: 'Task Management System', tech: 'Vue.js, Express, PostgreSQL', desc: 'Built a collaborative task management platform for teams' },
      { name: 'Data Visualization Dashboard', tech: 'D3.js, Python, Flask', desc: 'Created interactive dashboards for business analytics' }
    ];

    const role = roles[Math.floor(Math.random() * roles.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const studentSkills = skills[student.deptName] || skills['Computer Science'];
    const selectedProjects = projects.sort(() => 0.5 - Math.random()).slice(0, 3);

    return {
      role,
      summary: `Passionate ${role.toLowerCase()} with strong foundation in ${student.deptName}. Experienced in building scalable applications and working with modern technologies. Quick learner with excellent problem-solving skills.`,
      experience: [
        {
          position: `${role} Intern`,
          company: company,
          duration: 'Jun 2024 - Aug 2024',
          tasks: [
            'Developed and maintained web applications using modern frameworks',
            'Collaborated with senior developers on critical projects',
            'Participated in code reviews and testing processes',
            'Improved application performance by 30%'
          ]
        },
        {
          position: 'Junior Developer',
          company: 'FreelanceHub',
          duration: 'Jan 2024 - May 2024',
          tasks: [
            'Built responsive web interfaces for client projects',
            'Implemented RESTful APIs for data management',
            'Worked with databases and server-side technologies'
          ]
        }
      ],
      education: {
        degree: `Bachelor of ${student.deptName === 'Computer Science' ? 'Technology' : student.deptName === 'Information Technology' ? 'Technology' : 'Arts/Science'}`,
        major: student.deptName,
        college: student.collegeName,
        year: student.academicYear,
        gpa: '8.5/10.0'
      },
      skills: studentSkills,
      projects: selectedProjects,
      certifications: [
        'AWS Certified Developer Associate',
        'Google Analytics Certified',
        'Microsoft Azure Fundamentals'
      ]
    };
  };

  const handleGenerateResume = (student) => {
    const resumeData = createResumeData(student);
    setSelectedStudent({ ...student, resumeData });
    setShowResumeModal(true);
  };

  const handleDownload = () => {
    if (!selectedStudent) return;

    const resumeContent = document.getElementById('resume-content');
    const printWindow = window.open('', '_blank');
    
    const styles = `
      body { 
        font-family: Arial, sans-serif; 
        line-height: 1.6; 
        color: #333; 
        max-width: 800px; 
        margin: 0 auto; 
        padding: 20px; 
      }
      h1 { 
        color: #2563eb; 
        border-bottom: 2px solid #2563eb; 
        padding-bottom: 10px; 
      }
      h2 { 
        color: #1d4ed8; 
        margin-top: 30px; 
        margin-bottom: 15px; 
      }
      h3 { 
        color: #1e40af; 
        margin-bottom: 5px; 
      }
      .contact-info { 
        display: flex; 
        justify-content: space-between; 
        margin-bottom: 20px; 
      }
      .section { 
        margin-bottom: 25px; 
      }
      .experience-item, .project-item { 
        margin-bottom: 20px; 
      }
      .skills { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 10px; 
      }
      .skill-tag { 
        background: #eff6ff; 
        color: #1d4ed8; 
        padding: 5px 10px; 
        border-radius: 15px; 
        font-size: 12px; 
      }
      ul { 
        padding-left: 20px; 
      }
    `;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedStudent.studentName} - Resume</title>
          <style>${styles}</style>
        </head>
        <body>
          ${resumeContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  };

  const getVerificationBadge = () => {
    return (
      <span className="px-3 py-1 bg-gray-100 text-gray-500 border border-gray-200 rounded-full text-xs font-medium inline-flex items-center">
        - Not Available -
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Loading students...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
        <div className="flex justify-center items-center h-32">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
        <h1 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-800">
          <RiFileListFill className="text-blue-600" />
          Student Records and Verification Status
        </h1>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    Student Name
                    <BiSort className="text-gray-400 hover:text-gray-600" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    Student ID
                    <BiSort className="text-gray-400 hover:text-gray-600" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    Department
                    <BiSort className="text-gray-400 hover:text-gray-600" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    Verification Status
                    <BiSort className="text-gray-400 hover:text-gray-600" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 px-6 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr 
                    key={student._id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {student.studentName}
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-mono text-sm">
                      {student.studentId}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-xs font-medium inline-flex items-center">
                        {student.deptName}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {getVerificationBadge()}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleGenerateResume(student)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        Generate Resume
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showResumeModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedStudent.studentName}'s Resume
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  <BiDownload /> Download
                </button>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <BiX size={24} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto h-96">
              <div id="resume-content" className="p-8 bg-white">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-blue-600 mb-2">
                    {selectedStudent.studentName}
                  </h1>
                  <p className="text-xl text-gray-700 mb-4">
                    {selectedStudent.resumeData.role}
                  </p>
                  <div className="flex justify-center gap-6 text-sm text-gray-600">
                    <span>📧 {selectedStudent.email}</span>
                    <span>📱 {selectedStudent.phoneNumber}</span>
                    <span>🎓 {selectedStudent.deptName}</span>
                  </div>
                </div>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedStudent.resumeData.summary}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                    Experience
                  </h2>
                  {selectedStudent.resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {exp.position}
                          </h3>
                          <p className="text-blue-600 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 text-sm">{exp.duration}</span>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 ml-4">
                        {exp.tasks.map((task, idx) => (
                          <li key={idx} className="mb-1">{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                    Education
                  </h2>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {selectedStudent.resumeData.education.degree}
                    </h3>
                    <p className="text-blue-600">{selectedStudent.resumeData.education.major}</p>
                    <p className="text-gray-600">{selectedStudent.resumeData.education.college}</p>
                    <div className="flex justify-between text-gray-500 text-sm mt-1">
                      <span>Academic Year: {selectedStudent.resumeData.education.year}</span>
                      <span>GPA: {selectedStudent.resumeData.education.gpa}</span>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                    Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.resumeData.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                    Projects
                  </h2>
                  {selectedStudent.resumeData.projects.map((project, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                      <p className="text-blue-600 text-sm font-medium mb-2">
                        Technologies: {project.tech}
                      </p>
                      <p className="text-gray-700">{project.desc}</p>
                    </div>
                  ))}
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                    Certifications
                  </h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedStudent.resumeData.certifications.map((cert, index) => (
                      <li key={index} className="mb-1">{cert}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyStudentDataTable;