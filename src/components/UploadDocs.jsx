// // import React, { useState } from 'react';
// // import { Upload, FileText, Search, Filter, Download, Eye, MoreVertical } from 'lucide-react';

// // const App = () => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedCategory, setSelectedCategory] = useState('');
// //   const [showUploadModal, setShowUploadModal] = useState(false);
// //   const [dragActive, setDragActive] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);

// //   const [formData, setFormData] = useState({
// //     category: '',
// //     description: '',
// //     date_done: '',
// //     organizer: '',
// //     duration: '',
// //     credential_link: '',
// //     file: null
// //   });

// //   const documents = [
// //     {
// //       id: 1,
// //       title: 'Academic Transcript Fall 2023',
// //       category: 'Academic Records',
// //       organizer: 'University of Technology',
// //       dateUploaded: '2024/01/15',
// //       fileSize: '2.4 MB',
// //       fileType: 'PDF',
// //       status: 'Verified'
// //     },
// //     {
// //       id: 2,
// //       title: 'React Developer Certificate',
// //       category: 'Certificates',
// //       organizer: 'Meta Professional Certificates',
// //       dateUploaded: '2024/01/10',
// //       fileSize: '1.2 MB',
// //       fileType: 'PDF',
// //       status: 'Pending',
// //       credentialLink: 'https://coursera.org/verify/abc123'
// //     },
// //     {
// //       id: 3,
// //       title: 'Internship Completion Letter',
// //       category: 'Work Experience',
// //       organizer: 'Tech Solutions Inc.',
// //       dateUploaded: '2024/01/05',
// //       fileSize: '856 KB',
// //       fileType: 'PDF',
// //       status: 'Verified'
// //     },
// //     {
// //       id: 4,
// //       title: 'Programming Contest Certificate',
// //       category: 'Competitions',
// //       organizer: 'CodeChef',
// //       dateUploaded: '2023/12/28',
// //       fileSize: '1.8 MB',
// //       fileType: 'PDF',
// //       status: 'Verified'
// //     },
// //     {
// //       id: 5,
// //       title: 'AWS Cloud Practitioner',
// //       category: 'Skill Development',
// //       organizer: 'Amazon Web Services',
// //       dateUploaded: '2023/12/20',
// //       fileSize: '945 KB',
// //       fileType: 'PDF',
// //       status: 'Verified'
// //     }
// //   ];

// //   const categories = [
// //     'All Categories',
// //     'Academic Records',
// //     'Certificates', 
// //     'Work Experience',
// //     'Competitions',
// //     'Skill Development',
// //     'Projects',
// //     'Other'
// //   ];

// //   const getStatusStyle = (status) => {
// //     const statusStyles = {
// //       'Verified': 'text-green-600 bg-green-100',
// //       'Pending': 'text-yellow-600 bg-yellow-100',
// //       'Rejected': 'text-red-600 bg-red-100'
// //     };
// //     return statusStyles[status] || 'text-gray-600 bg-gray-100';
// //   };

// //   const filteredDocs = documents.filter(doc => {
// //     const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          doc.organizer.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || 
// //                            doc.category === selectedCategory;
// //     return matchesSearch && matchesCategory;
// //   });

// //   const updateFormData = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleFileSelect = (e) => {
// //     const file = e.target.files[0];
// //     setFormData(prev => ({ ...prev, file }));
// //   };

// //   const handleDragEvents = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (e.type === 'dragenter' || e.type === 'dragover') {
// //       setDragActive(true);
// //     } else if (e.type === 'dragleave') {
// //       setDragActive(false);
// //     }
// //   };

// //   const handleFileDrop = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(false);
    
// //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// //       setFormData(prev => ({ ...prev, file: e.dataTransfer.files[0] }));
// //     }
// //   };

// //   const submitDocument = (e) => {
// //     e.preventDefault();
// //     console.log('Document submission:', formData);
    
// //     setShowSuccess(true);
// //     setShowUploadModal(false);
// //     setTimeout(() => setShowSuccess(false), 3000);
// //     resetForm();
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       category: '',
// //       description: '',
// //       date_done: '',
// //       organizer: '',
// //       duration: '',
// //       credential_link: '',
// //       file: null
// //     });
// //   };

// //   const closeUploadModal = () => {
// //     setShowUploadModal(false);
// //     resetForm();
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
// //       <div className="w-full max-w-7xl mx-auto">
// //         <div className="flex justify-between items-center mb-8">
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-900 mb-2">My Files & Assets</h1>
// //             <p className="text-gray-600">Manage your academic records, certificates, and other documents</p>
// //           </div>
// //           <button
// //             onClick={() => setShowUploadModal(true)}
// //             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
// //           >
// //             <Upload className="w-5 h-5" />
// //             Upload Document
// //           </button>
// //         </div>

// //         {showSuccess && (
// //           <div className="bg-green-100 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 text-center transition-all duration-300">
// //             Document uploaded successfully!
// //           </div>
// //         )}

// //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
// //           <div className="flex flex-col md:flex-row gap-4 mb-6">
// //             <div className="relative flex-1">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Search documents or organizations..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
// //               />
// //             </div>
// //             <div className="flex gap-3">
// //               <select
// //                 value={selectedCategory}
// //                 onChange={(e) => setSelectedCategory(e.target.value)}
// //                 className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-48"
// //               >
// //                 {categories.map((cat) => (
// //                   <option key={cat} value={cat}>{cat}</option>
// //                 ))}
// //               </select>
// //               <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
// //                 <Filter className="w-5 h-5 text-gray-600" />
// //               </button>
// //             </div>
// //           </div>

// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="border-b border-gray-200">
// //                   <th className="text-left py-3 px-4 font-medium text-gray-700">Document</th>
// //                   <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
// //                   <th className="text-left py-3 px-4 font-medium text-gray-700">Organization</th>
// //                   <th className="text-left py-3 px-4 font-medium text-gray-700">Date Uploaded</th>
// //                   <th className="text-left py-3 px-4 font-medium text-gray-700">Size</th>
// //                   <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
// //                   <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredDocs.map((doc) => (
// //                   <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
// //                     <td className="py-4 px-4">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
// //                           <FileText className="w-5 h-5 text-red-600" />
// //                         </div>
// //                         <div>
// //                           <div className="font-medium text-gray-900">{doc.title}</div>
// //                           <div className="text-sm text-gray-500">{doc.fileType}</div>
// //                           {doc.credentialLink && (
// //                             <div className="text-xs text-blue-600 mt-1">
// //                               Certificate link: {doc.credentialLink}
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="py-4 px-4 text-gray-600">{doc.category}</td>
// //                     <td className="py-4 px-4 text-gray-600">{doc.organizer}</td>
// //                     <td className="py-4 px-4 text-gray-600">{doc.dateUploaded}</td>
// //                     <td className="py-4 px-4 text-gray-600">{doc.fileSize}</td>
// //                     <td className="py-4 px-4">
// //                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(doc.status)}`}>
// //                         {doc.status}
// //                       </span>
// //                     </td>
// //                     <td className="py-4 px-4">
// //                       <div className="flex items-center gap-2">
// //                         <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
// //                           <Eye className="w-4 h-4" />
// //                         </button>
// //                         <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
// //                           <Download className="w-4 h-4" />
// //                         </button>
// //                         <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
// //                           <MoreVertical className="w-4 h-4" />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
// //             <p className="text-sm text-gray-600">
// //               Showing {filteredDocs.length} of {documents.length} documents
// //             </p>
// //             <div className="flex gap-2">
// //               <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
// //                 Previous
// //               </button>
// //               <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
// //                 1
// //               </button>
// //               <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
// //                 2
// //               </button>
// //               <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
// //                 Next
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {showUploadModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
// //             <div className="p-6 border-b border-gray-200">
// //               <div className="flex justify-between items-center">
// //                 <h2 className="text-2xl font-bold text-gray-900">Upload Document</h2>
// //                 <button
// //                   onClick={closeUploadModal}
// //                   className="text-gray-400 hover:text-gray-600 text-2xl"
// //                 >
// //                   ×
// //                 </button>
// //               </div>
// //             </div>
            
// //             <div className="p-6 space-y-6">
// //               <div className="bg-blue-100 rounded-xl p-8 shadow-md border border-blue-200">
// //                 <div className="flex items-center gap-3 mb-6">
// //                   <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
// //                     <FileText className="w-5 h-5 text-blue-600" />
// //                   </div>
// //                   <h3 className="text-xl font-semibold text-gray-900">
// //                     Select Document
// //                   </h3>
// //                 </div>
                
// //                 <div
// //                   className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
// //                     dragActive 
// //                       ? 'border-blue-400 bg-blue-50' 
// //                       : 'border-gray-300 hover:border-gray-400'
// //                   }`}
// //                   onDragEnter={handleDragEvents}
// //                   onDragLeave={handleDragEvents}
// //                   onDragOver={handleDragEvents}
// //                   onDrop={handleFileDrop}
// //                 >
// //                   <Upload className="w-14 h-14 text-gray-400 mx-auto mb-4" />
// //                   <p className="text-lg font-medium text-gray-700 mb-2">
// //                     {formData.file 
// //                       ? formData.file.name 
// //                       : 'Drop your document here or click to browse'
// //                     }
// //                   </p>
// //                   <p className="text-sm text-gray-500 mb-6">
// //                     Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
// //                   </p>
                  
// //                   <input
// //                     type="file"
// //                     onChange={handleFileSelect}
// //                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
// //                     className="hidden"
// //                     id="file-upload"
// //                   />
// //                   <label
// //                     htmlFor="file-upload"
// //                     className="inline-flex items-center justify-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 cursor-pointer transition-colors font-medium text-base shadow-sm"
// //                   >
// //                     Choose File
// //                   </label>
// //                 </div>
// //               </div>

// //               <div className="bg-blue-100 rounded-xl p-8 shadow-md border border-blue-200">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Category
// //                     </label>
// //                     <select
// //                       name="category"
// //                       value={formData.category}
// //                       onChange={updateFormData}
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
// //                       required
// //                     >
// //                       <option value="">Select a category</option>
// //                       {categories.filter(cat => cat !== 'All Categories').map((cat) => (
// //                         <option key={cat} value={cat}>
// //                           {cat}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Organizer/Institution
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="organizer"
// //                       value={formData.organizer}
// //                       onChange={updateFormData}
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
// //                       placeholder="Enter organizer name"
// //                       required
// //                     />
// //                   </div>

// //                   {formData.category === 'Certificates' && (
// //                     <div className="md:col-span-2">
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Credential Link
// //                       </label>
// //                       <input
// //                         type="url"
// //                         name="credential_link"
// //                         value={formData.credential_link}
// //                         onChange={updateFormData}
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
// //                         placeholder="Enter certificate verification link"
// //                         required
// //                       />
// //                     </div>
// //                   )}

// //                   <div className="md:col-span-2">
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Description
// //                     </label>
// //                     <textarea
// //                       name="description"
// //                       value={formData.description}
// //                       onChange={updateFormData}
// //                       rows={4}
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
// //                       placeholder="Describe your document..."
// //                       required
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Date Completed
// //                     </label>
// //                     <input
// //                       type="date"
// //                       name="date_done"
// //                       value={formData.date_done}
// //                       onChange={updateFormData}
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
// //                       required
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Duration
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="duration"
// //                       value={formData.duration}
// //                       onChange={updateFormData}
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
// //                       placeholder="e.g., 3 months, 1 year, 40 hours"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 {formData.credential_link && formData.category === 'Certificates' && (
// //                   <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
// //                     <p className="text-sm text-gray-700">
// //                       <span className="font-medium">Certificate link:</span> {formData.credential_link}
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>
              
// //               <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
// //                 <button
// //                   type="button"
// //                   className="px-6 py-3 text-lg font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
// //                   onClick={closeUploadModal}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={submitDocument}
// //                   className="px-8 py-3 text-lg font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors shadow-sm"
// //                 >
// //                   Upload Document
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default App;










// import React, { useState, useEffect } from 'react';
// import { Upload, FileText, Search, Filter, Download, Eye, MoreVertical } from 'lucide-react';

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [uploadLoading, setUploadLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     category: '',
//     description: '',
//     dateCompleted: '',
//     institution: '',
//     education: '',
//     credentialLink: '',
//     file: null
//   });

//   // API base URL - adjust this to your backend URL
//   const API_BASE_URL = 'http://localhost:5000/api/auth'; // Change this to your actual backend URL

//   const categories = [
//     'All Categories',
//     'Academic Records',
//     'Certificates', 
//     'Work Experience',
//     'Competitions',
//     'Skill Development',
//     'Projects',
//     'Other'
//   ];

//   // Get auth token from localStorage (adjust based on your auth implementation)
//   const getAuthToken = () => {
//     return localStorage.getItem('token'); // Adjust key name as per your auth system
//   };

//   // Fetch documents from backend
//   const fetchDocuments = async () => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         console.error('No authentication token found');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(`${API_BASE_URL}/documents/my`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         console.log('Documents fetched successfully:', data.documents);
//         setDocuments(data.documents);
//       } else {
//         console.error('Failed to fetch documents:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load documents on component mount
//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const getStatusStyle = (status) => {
//     const statusStyles = {
//       'verified': 'text-green-600 bg-green-100',
//       'pending': 'text-yellow-600 bg-yellow-100',
//       'rejected': 'text-red-600 bg-red-100'
//     };
//     return statusStyles[status] || 'text-gray-600 bg-gray-100';
//   };

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const filteredDocs = documents.filter(doc => {
//     const matchesSearch = doc.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          doc.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || 
//                            doc.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const updateFormData = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     setFormData(prev => ({ ...prev, file }));
//   };

//   const handleDragEvents = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleFileDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setFormData(prev => ({ ...prev, file: e.dataTransfer.files[0] }));
//     }
//   };

//   const submitDocument = async () => {
//     if (!formData.file) {
//       alert('Please select a file');
//       return;
//     }

//     setUploadLoading(true);
    
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         alert('Authentication required');
//         setUploadLoading(false);
//         return;
//       }

//       const uploadFormData = new FormData();
//       uploadFormData.append('file', formData.file);
//       uploadFormData.append('category', formData.category);
//       uploadFormData.append('institution', formData.institution);
//       uploadFormData.append('description', formData.description);
//       uploadFormData.append('dateCompleted', formData.dateCompleted);
//       uploadFormData.append('education', formData.education);
      
//       // Only add credentialLink if category is Certificates
//       if (formData.category === 'Certificates' && formData.credentialLink) {
//         uploadFormData.append('credentialLink', formData.credentialLink);
//       }

//       console.log('Uploading document with data:', {
//         fileName: formData.file.name,
//         category: formData.category,
//         institution: formData.institution,
//         description: formData.description,
//         dateCompleted: formData.dateCompleted,
//         education: formData.education,
//         credentialLink: formData.credentialLink
//       });

//       const response = await fetch(`${API_BASE_URL}/documents`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: uploadFormData,
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         console.log('Document uploaded successfully:', data.document);
//         setShowSuccess(true);
//         setShowUploadModal(false);
//         setTimeout(() => setShowSuccess(false), 3000);
//         resetForm();
        
//         // Refresh documents list
//         fetchDocuments();
//       } else {
//         console.error('Upload failed:', data.message);
//         alert(`Upload failed: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       alert('Upload failed. Please try again.');
//     } finally {
//       setUploadLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       category: '',
//       description: '',
//       dateCompleted: '',
//       institution: '',
//       education: '',
//       credentialLink: '',
//       file: null
//     });
//   };

//   const closeUploadModal = () => {
//     setShowUploadModal(false);
//     resetForm();
//   };

//   // Handle file download
//   const handleDownload = async (fileId, fileName) => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         alert('Authentication required');
//         return;
//       }

//       const response = await fetch(`${API_BASE_URL}/documents/${fileId}/download`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = fileName;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         console.log('File downloaded successfully:', fileName);
//       } else {
//         console.error('Download failed');
//         alert('Download failed');
//       }
//     } catch (error) {
//       console.error('Download error:', error);
//       alert('Download failed. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading documents...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
//       <div className="w-full max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">My Files & Assets</h1>
//             <p className="text-gray-600">Manage your academic records, certificates, and other documents</p>
//           </div>
//           <button
//             onClick={() => setShowUploadModal(true)}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
//           >
//             <Upload className="w-5 h-5" />
//             Upload Document
//           </button>
//         </div>

//         {showSuccess && (
//           <div className="bg-green-100 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 text-center transition-all duration-300">
//             Document uploaded successfully!
//           </div>
//         )}

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search documents or institutions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>
//             <div className="flex gap-3">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-48"
//               >
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//               <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                 <Filter className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-4 font-medium text-gray-700">Document</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-700">Institution</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-700">Date Uploaded</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-700">Size</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredDocs.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="py-8 px-4 text-center text-gray-500">
//                       {documents.length === 0 ? 'No documents uploaded yet' : 'No documents match your search criteria'}
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredDocs.map((doc) => (
//                     <tr key={doc._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
//                             <FileText className="w-5 h-5 text-red-600" />
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900">{doc.fileName}</div>
//                             <div className="text-sm text-gray-500">{doc.fileType}</div>
//                             {doc.credentialLink && (
//                               <div className="text-xs text-blue-600 mt-1">
//                                 <a href={doc.credentialLink} target="_blank" rel="noopener noreferrer">
//                                   Certificate link
//                                 </a>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 text-gray-600">{doc.category}</td>
//                       <td className="py-4 px-4 text-gray-600">{doc.institution}</td>
//                       <td className="py-4 px-4 text-gray-600">{formatDate(doc.uploadDate)}</td>
//                       <td className="py-4 px-4 text-gray-600">{formatFileSize(doc.fileSize)}</td>
//                       <td className="py-4 px-4">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(doc.status)}`}>
//                           {doc.status?.charAt(0).toUpperCase() + doc.status?.slice(1) || 'Pending'}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-2">
//                           <button 
//                             onClick={() => handleDownload(doc.fileId, doc.fileName)}
//                             className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                             title="Download"
//                           >
//                             <Download className="w-4 h-4" />
//                           </button>
//                           <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
//                             <MoreVertical className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
//             <p className="text-sm text-gray-600">
//               Showing {filteredDocs.length} of {documents.length} documents
//             </p>
//           </div>
//         </div>
//       </div>

//       {showUploadModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-900">Upload Document</h2>
//                 <button
//                   onClick={closeUploadModal}
//                   className="text-gray-400 hover:text-gray-600 text-2xl"
//                   disabled={uploadLoading}
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>
            
//             <div className="p-6 space-y-6">
//               <div className="bg-blue-100 rounded-xl p-8 shadow-md border border-blue-200">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
//                     <FileText className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900">
//                     Select Document
//                   </h3>
//                 </div>
                
//                 <div
//                   className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
//                     dragActive 
//                       ? 'border-blue-400 bg-blue-50' 
//                       : 'border-gray-300 hover:border-gray-400'
//                   }`}
//                   onDragEnter={handleDragEvents}
//                   onDragLeave={handleDragEvents}
//                   onDragOver={handleDragEvents}
//                   onDrop={handleFileDrop}
//                 >
//                   <Upload className="w-14 h-14 text-gray-400 mx-auto mb-4" />
//                   <p className="text-lg font-medium text-gray-700 mb-2">
//                     {formData.file 
//                       ? formData.file.name 
//                       : 'Drop your document here or click to browse'
//                     }
//                   </p>
//                   <p className="text-sm text-gray-500 mb-6">
//                     Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
//                   </p>
                  
//                   <input
//                     type="file"
//                     onChange={handleFileSelect}
//                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                     className="hidden"
//                     id="file-upload"
//                     disabled={uploadLoading}
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className={`inline-flex items-center justify-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 cursor-pointer transition-colors font-medium text-base shadow-sm ${uploadLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     Choose File
//                   </label>
//                 </div>
//               </div>

//               <div className="bg-blue-100 rounded-xl p-8 shadow-md border border-blue-200">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Category *
//                     </label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={updateFormData}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                       required
//                       disabled={uploadLoading}
//                     >
//                       <option value="">Select a category</option>
//                       {categories.filter(cat => cat !== 'All Categories').map((cat) => (
//                         <option key={cat} value={cat}>
//                           {cat}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Institution/Organization *
//                     </label>
//                     <input
//                       type="text"
//                       name="institution"
//                       value={formData.institution}
//                       onChange={updateFormData}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                       placeholder="Enter institution name"
//                       required
//                       disabled={uploadLoading}
//                     />
//                   </div>

//                   {formData.category === 'Certificates' && (
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Credential Link
//                       </label>
//                       <input
//                         type="url"
//                         name="credentialLink"
//                         value={formData.credentialLink}
//                         onChange={updateFormData}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="Enter certificate verification link"
//                         disabled={uploadLoading}
//                       />
//                     </div>
//                   )}

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Description *
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={updateFormData}
//                       rows={4}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
//                       placeholder="Describe your document..."
//                       required
//                       disabled={uploadLoading}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Date Completed *
//                     </label>
//                     <input
//                       type="date"
//                       name="dateCompleted"
//                       value={formData.dateCompleted}
//                       onChange={updateFormData}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                       required
//                       disabled={uploadLoading}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Education Level
//                     </label>
//                     <input
//                       type="text"
//                       name="education"
//                       value={formData.education}
//                       onChange={updateFormData}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                       placeholder="e.g., Bachelor's, Master's, Certificate"
//                       disabled={uploadLoading}
//                     />
//                   </div>
//                 </div>

//                 {formData.credentialLink && formData.category === 'Certificates' && (
//                   <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
//                     <p className="text-sm text-gray-700">
//                       <span className="font-medium">Certificate link:</span> {formData.credentialLink}
//                     </p>
//                   </div>
//                 )}
//               </div>
              
//               <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
//                 <button
//                   type="button"
//                   className="px-6 py-3 text-lg font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
//                   onClick={closeUploadModal}
//                   disabled={uploadLoading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={submitDocument}
//                   className="px-8 py-3 text-lg font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                   disabled={uploadLoading}
//                 >
//                   {uploadLoading && (
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   )}
//                   {uploadLoading ? 'Uploading...' : 'Upload Document'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { Upload, FileText, Search, Filter, Download, Eye, MoreVertical, Trash2, AlertCircle } from 'lucide-react';

const UploadDocs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0, limit: 10 });
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    category: '',
    description: '',
    dateCompleted: '',
    institution: '',
    education: '',
    credentialLink: '',
    file: null
  });

  // API base URL - adjust this to your backend URL
  const API_BASE_URL = 'http://localhost:5000/api'; // Change this to your actual backend URL

  const categories = [
    'All Categories',
    'Academic Records',
    'Certificates', 
    'Work Experience',
    'Competitions',
    'Skill Development',
    'Projects',
    'Other'
  ];

  const statuses = [
    'All Statuses',
    'pending',
    'verified',
    'rejected'
  ];

  // Get auth token from localStorage
  const getAuthToken = () => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token ? 'Token found' : 'No token found');
    return token;
  };

  // Fetch documents from backend with pagination and filters
   // Fetch documents from backend - simple version
  const fetchDocuments = async () => {
    console.log('Fetching documents...');
    setLoading(true);
    setError('');
    
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('No authentication token found');
        setError('Authentication required. Please login again.');
        setLoading(false);
        return;
      }

      const url = `${API_BASE_URL}/documents/my`;
      console.log('Fetching from URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        console.log('Documents fetched successfully:', data.documents.length, 'documents');
        setDocuments(data.documents || []);
        // Set simple pagination since backend doesn't handle it
        setPagination({ current: 1, pages: 1, total: data.documents?.length || 0, limit: data.documents?.length || 0 });
      } else {
        console.error('Failed to fetch documents:', data.message);
        setError(data.message || 'Failed to fetch documents');
        setDocuments([]);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Network error. Please check your connection and try again.');
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);


  const getStatusStyle = (status) => {
    const statusStyles = {
      'verified': 'text-green-600 bg-green-100',
      'pending': 'text-yellow-600 bg-yellow-100',
      'rejected': 'text-red-600 bg-red-100'
    };
    return statusStyles[status] || 'text-gray-600 bg-gray-100';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const filteredDocs = documents.filter(doc => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      doc.fileName?.toLowerCase().includes(searchLower) ||
      doc.institution?.toLowerCase().includes(searchLower) ||
      doc.description?.toLowerCase().includes(searchLower)
    );
  });

  const updateFormData = (e) => {
    const { name, value } = e.target;
    console.log('Form field updated:', name, '=', value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleDragEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Check file size
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      console.log('File dropped:', file.name);
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const validateForm = () => {
    const { category, institution, dateCompleted, description, file, credentialLink } = formData;
    
    if (!file) {
      alert('Please select a file');
      return false;
    }
    
    if (!category) {
      alert('Please select a category');
      return false;
    }
    
    if (!institution.trim()) {
      alert('Please enter institution/organization name');
      return false;
    }
    
    if (!dateCompleted) {
      alert('Please select date completed');
      return false;
    }
    
    if (!description.trim()) {
      alert('Please enter a description');
      return false;
    }
    
    // Special validation for Certificates
    if (category === 'Certificates' && !credentialLink.trim()) {
      alert('Credential link is required for Certificates category');
      return false;
    }
    
    return true;
  };

  const submitDocument = async () => {
    console.log('Submit document called');
    
    if (!validateForm()) {
      return;
    }

    setUploadLoading(true);
    
    try {
      const token = getAuthToken();
      if (!token) {
        alert('Authentication required');
        setUploadLoading(false);
        return;
      }

      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.file);
      uploadFormData.append('category', formData.category);
      uploadFormData.append('institution', formData.institution.trim());
      uploadFormData.append('description', formData.description.trim());
      uploadFormData.append('dateCompleted', formData.dateCompleted);
      
      if (formData.education?.trim()) {
        uploadFormData.append('education', formData.education.trim());
      }
      
      // Only add credentialLink if category is Certificates and link is provided
      if (formData.category === 'Certificates' && formData.credentialLink?.trim()) {
        uploadFormData.append('credentialLink', formData.credentialLink.trim());
      }

      console.log('Uploading document with data:', {
        fileName: formData.file.name,
        category: formData.category,
        institution: formData.institution,
        description: formData.description,
        dateCompleted: formData.dateCompleted,
        education: formData.education,
        credentialLink: formData.credentialLink,
        fileSize: formData.file.size
      });

      const response = await fetch(`${API_BASE_URL}/documents/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      console.log('Upload response status:', response.status);
      const data = await response.json();
      console.log('Upload response data:', data);
      
      if (data.success) {
        console.log('Document uploaded successfully:', data.document);
        setShowSuccess(true);
        setShowUploadModal(false);
        setTimeout(() => setShowSuccess(false), 3000);
        resetForm();
        
        // Refresh documents list
        fetchDocuments(pagination.current, selectedCategory, selectedStatus);
      } else {
        console.error('Upload failed:', data.message);
        alert(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  const resetForm = () => {
    console.log('Resetting form');
    setFormData({
      category: '',
      description: '',
      dateCompleted: '',
      institution: '',
      education: '',
      credentialLink: '',
      file: null
    });
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    resetForm();
  };

  // Handle file download
  const handleDownload = async (documentId, fileName) => {
    console.log('Downloading document:', { documentId, fileName });
    
    try {
      const token = getAuthToken();
      if (!token) {
        alert('Authentication required');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/documents/${documentId}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Download response status:', response.status);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        console.log('File downloaded successfully:', fileName);
      } else {
        const errorData = await response.json();
        console.error('Download failed:', errorData);
        alert(errorData.message || 'Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  // Handle document deletion (only pending documents)
  const handleDelete = async (documentId, status) => {
    if (status !== 'pending') {
      alert('Only pending documents can be deleted');
      return;
    }

    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    console.log('Deleting document:', documentId);

    try {
      const token = getAuthToken();
      if (!token) {
        alert('Authentication required');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/documents/${documentId}/student`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Delete response status:', response.status);
      const data = await response.json();
      console.log('Delete response data:', data);

      if (data.success) {
        console.log('Document deleted successfully');
        alert('Document deleted successfully');
        fetchDocuments(pagination.current, selectedCategory, selectedStatus);
      } else {
        console.error('Delete failed:', data.message);
        alert(data.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed. Please try again.');
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    console.log('Changing to page:', page);
    fetchDocuments(page, selectedCategory, selectedStatus);
  };

  if (loading && documents.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Files & Assets</h1>
            <p className="text-gray-600">Manage your academic records, certificates, and other documents</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
        </div>

        {showSuccess && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 text-center transition-all duration-300">
            Document uploaded successfully!
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents, institutions, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-48"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-32"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Document</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Institution</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Upload Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && documents.length > 0 && (
                  <tr>
                    <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        Loading...
                      </div>
                    </td>
                  </tr>
                )}
                
                {!loading && filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 px-4 text-center text-gray-500">
                      {documents.length === 0 ? 'No documents uploaded yet' : 'No documents match your search criteria'}
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => (
                    <tr key={doc._id || doc.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{doc.fileName}</div>
                            <div className="text-sm text-gray-500">{doc.fileType}</div>
                            {doc.credentialLink && (
                              <div className="text-xs text-blue-600 mt-1">
                                <a href={doc.credentialLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  Certificate link
                                </a>
                              </div>
                            )}
                            {doc.rejectionReason && doc.status === 'rejected' && (
                              <div className="text-xs text-red-600 mt-1 font-medium">
                                Reason: {doc.rejectionReason}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{doc.category}</td>
                      <td className="py-4 px-4 text-gray-600">{doc.institution}</td>
                      <td className="py-4 px-4 text-gray-600">{formatDate(doc.uploadDate || doc.createdAt)}</td>
                      <td className="py-4 px-4 text-gray-600">{doc.fileSizeFormatted || (doc.fileSize ? `${Math.round(doc.fileSize / 1024)} KB` : 'N/A')}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(doc.status)}`}>
                          {doc.status?.charAt(0).toUpperCase() + doc.status?.slice(1) || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleDownload(doc._id || doc.id, doc.fileName)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          {doc.status === 'pending' && (
                            <button 
                              onClick={() => handleDelete(doc._id || doc.id, doc.status)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete (Pending only)"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredDocs.length} of {pagination.total} documents
            </p>
            
            {pagination.pages > 1 && (
              <div className="flex gap-2">
                <button 
                  onClick={() => handlePageChange(pagination.current - 1)}
                  disabled={pagination.current <= 1}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                        pageNum === pagination.current
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button 
                  onClick={() => handlePageChange(pagination.current + 1)}
                  disabled={pagination.current >= pagination.pages}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Upload Document</h2>
                <button
                  onClick={closeUploadModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                  disabled={uploadLoading}
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-blue-100 rounded-xl p-8 shadow-md border border-blue-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Select Document
                  </h3>
                </div>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDragEvents}
                  onDragLeave={handleDragEvents}
                  onDragOver={handleDragEvents}
                  onDrop={handleFileDrop}
                >
                  <Upload className="w-14 h-14 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {formData.file 
                      ? formData.file.name 
                      : 'Drop your document here or click to browse'
                    }
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                  </p>
                  
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                    disabled={uploadLoading}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`inline-flex items-center justify-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 cursor-pointer transition-colors font-medium text-base shadow-sm ${uploadLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Choose File
                  </label>
                </div>
              </div>

              <div className="bg-blue-100 rounded-xl p-8 shadow-md border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={updateFormData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                      disabled={uploadLoading}
                    >
                      <option value="">Select a category</option>
                      {categories.filter(cat => cat !== 'All Categories').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution/Organization *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={updateFormData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Enter institution name"
                      required
                      disabled={uploadLoading}
                    />
                  </div>

                  {formData.category === 'Certificates' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Credential Link *
                      </label>
                      <input
                        type="url"
                        name="credentialLink"
                        value={formData.credentialLink}
                        onChange={updateFormData}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Enter certificate verification link"
                        required={formData.category === 'Certificates'}
                        disabled={uploadLoading}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Required for Certificates category
                      </p>
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={updateFormData}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      placeholder="Describe your document..."
                      required
                      disabled={uploadLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Completed *
                    </label>
                    <input
                      type="date"
                      name="dateCompleted"
                      value={formData.dateCompleted}
                      onChange={updateFormData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                      disabled={uploadLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education Level
                    </label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={updateFormData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g., Bachelor's, Master's, Certificate"
                      disabled={uploadLoading}
                    />
                  </div>
                </div>

                {formData.credentialLink && formData.category === 'Certificates' && (
                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Certificate link:</span> 
                      <a href={formData.credentialLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
                        {formData.credentialLink}
                      </a>
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="px-6 py-3 text-lg font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                  onClick={closeUploadModal}
                  disabled={uploadLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitDocument}
                  className="px-8 py-3 text-lg font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={uploadLoading}
                >
                  {uploadLoading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  )}
                  {uploadLoading ? 'Uploading...' : 'Upload Document'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocs;