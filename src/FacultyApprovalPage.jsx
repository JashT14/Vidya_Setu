import React, { useState, useEffect } from 'react';
import { Check, X, FileText, Calendar, Building, HardDrive, File as FileIcon, Search, Filter, Download, User } from 'lucide-react';
import NavbarForFacultyApproval from './components/NavbarForFacultyApproval';

const FacultyApprovalPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewDocument, setPreviewDocument] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 10
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'verified', label: 'Verified' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Academic Records', label: 'Academic Records' },
    { value: 'Certificates', label: 'Certificates' },
    { value: 'Work Experience', label: 'Work Experience' },
    { value: 'Competitions', label: 'Competitions' },
    { value: 'Skill Development', label: 'Skill Development' }
  ];

  // Get auth token from localStorage or context
  const getAuthToken = () => {
    return localStorage.getItem('facultyToken');
  };

  // Fetch documents from backend
  const fetchDocuments = async (page = 1) => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString()
      });

      if (selectedStatus !== 'all') params.append('status', selectedStatus);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchTerm.trim()) params.append('search', searchTerm.trim());

      const response = await fetch(`/api/documents/all?${params}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch documents');
      }

      if (data.success) {
        setDocuments(data.documents);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Fetch documents error:', error);
      setError(error.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and refetch when filters change
  useEffect(() => {
    fetchDocuments(1);
  }, [selectedStatus, selectedCategory, searchTerm]);

  // Handle pagination
  const handlePageChange = (page) => {
    fetchDocuments(page);
  };

  // Handle document preview
  const handlePreview = async (document) => {
    try {
      // Fetch detailed document info
      const response = await fetch(`/api/documents/${document._id}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setPreviewDocument(data.document);
      } else {
        setError(data.message || 'Failed to load document details');
      }
    } catch (error) {
      console.error('Preview error:', error);
      setError('Failed to load document details');
    }
  };

  // Handle document verification
  const handleVerify = async () => {
    try {
      const response = await fetch(`/api/documents/${previewDocument._id}/review`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessMessage('Document verified successfully!');
        // Update local state
        setDocuments(docs =>
          docs.map(doc =>
            doc._id === previewDocument._id
              ? { ...doc, status: 'verified', reviewedBy: data.document.reviewedBy, reviewDate: data.document.reviewDate }
              : doc
          )
        );
        
        setTimeout(() => {
          setShowSuccessMessage('');
          setPreviewDocument(null);
          // Optionally refetch to get updated data
          fetchDocuments(pagination.current);
        }, 2000);
      } else {
        setError(data.message || 'Failed to verify document');
      }
    } catch (error) {
      console.error('Verify error:', error);
      setError('Failed to verify document');
    }
  };

  // Handle document rejection
  const handleReject = () => {
    setShowRejectModal(true);
  };

  // Submit rejection
  const submitRejection = async () => {
    if (!rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    try {
      const response = await fetch(`/api/documents/${previewDocument._id}/review`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reject',
          rejectionReason: rejectionReason.trim()
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessMessage('Document rejected with feedback!');
        // Update local state
        setDocuments(docs =>
          docs.map(doc =>
            doc._id === previewDocument._id
              ? { 
                  ...doc, 
                  status: 'rejected', 
                  rejectionReason: rejectionReason,
                  reviewedBy: data.document.reviewedBy,
                  reviewDate: data.document.reviewDate
                }
              : doc
          )
        );

        setTimeout(() => {
          setShowSuccessMessage('');
          setShowRejectModal(false);
          setPreviewDocument(null);
          setRejectionReason('');
          // Optionally refetch to get updated data
          fetchDocuments(pagination.current);
        }, 2000);
      } else {
        setError(data.message || 'Failed to reject document');
      }
    } catch (error) {
      console.error('Reject error:', error);
      setError('Failed to reject document');
    }
  };

  // Handle file download
  const handleDownload = async (documentId, fileName) => {
    try {
      const response = await fetch(`/api/documents/${documentId}/download`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to download file');
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      setError(error.message || 'Failed to download file');
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return (
          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
            {status}
          </span>
        );
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <NavbarForFacultyApproval />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Approval &amp; Verification</h1>
            <p className="text-gray-600">Review and verify student documents</p>
            {pagination.total > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Total: {pagination.total} documents
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
              <button 
                onClick={() => setError('')}
                className="float-right text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          )}

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1 w-full relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by title, institution, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-40"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-40"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading documents...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">No documents found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Student & Document</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Institution</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date Completed</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {documents.map((document) => (
                    <tr key={document._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="text-blue-600" size={20} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {document.fileName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {document.fileType} • {document.fileSizeFormatted || 'Unknown size'}
                            </div>
                            {document.studentId && (
                              <div className="text-xs text-blue-600 mt-1 flex items-center">
                                <User size={12} className="mr-1" />
                                {document.studentId.studentName} ({document.studentId.studentId})
                              </div>
                            )}
                            {document.credentialLink && (
                              <div className="text-xs text-blue-600 mt-1">
                                <a href={document.credentialLink} target="_blank" rel="noopener noreferrer" 
                                   className="hover:underline">
                                  View Certificate
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{document.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{document.institution}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(document.dateCompleted)}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(document.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePreview(document)}
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                            title="View Document"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(document._id, document.fileName)}
                            className="px-3 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                            title="Download Document"
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!loading && documents.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Showing {((pagination.current - 1) * pagination.limit) + 1} to {Math.min(pagination.current * pagination.limit, pagination.total)} of {pagination.total} documents
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.current - 1)}
                  disabled={pagination.current <= 1}
                  className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                  const startPage = Math.max(1, pagination.current - 2);
                  const pageNum = startPage + i;
                  if (pageNum > pagination.pages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        pageNum === pagination.current
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.current + 1)}
                  disabled={pagination.current >= pagination.pages}
                  className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Preview Modal */}
          {previewDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  {/* Modal Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{previewDocument.fileName}</h2>
                      {previewDocument.studentId && (
                        <p className="text-gray-600 mt-1">
                          Student: {previewDocument.studentId.studentName} ({previewDocument.studentId.studentId})
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setPreviewDocument(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Document Preview Area */}
                  <div className="bg-gray-100 rounded-lg p-8 mb-6 min-h-96 flex items-center justify-center">
                    <div className="text-center">
                      <FileText size={64} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">Document Preview</p>
                      <p className="text-gray-500 text-sm">
                        {previewDocument.fileType} • {previewDocument.fileSizeFormatted}
                      </p>
                      <button
                        onClick={() => handleDownload(previewDocument._id, previewDocument.fileName)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                      >
                        <Download size={16} />
                        <span>Download File</span>
                      </button>
                    </div>
                  </div>

                  {/* Success Message */}
                  {showSuccessMessage && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      {showSuccessMessage}
                    </div>
                  )}

                  {/* Action Buttons - Only show for pending documents */}
                  {previewDocument.status === 'pending' && (
                    <div className="flex space-x-4 mb-6">
                      <button
                        onClick={handleVerify}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                      >
                        <Check size={20} />
                        <span>Verify</span>
                      </button>
                      <button
                        onClick={handleReject}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                      >
                        <X size={20} />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}

                  {/* Document Details */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Title</p>
                          <p className="text-sm text-gray-600">{previewDocument.fileName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Category</p>
                          <p className="text-sm text-gray-600">{previewDocument.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Institution</p>
                          <p className="text-sm text-gray-600">{previewDocument.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Date Completed</p>
                          <p className="text-sm text-gray-600">{formatDate(previewDocument.dateCompleted)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Upload Date</p>
                          <p className="text-sm text-gray-600">{formatDate(previewDocument.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <HardDrive className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">File Size</p>
                          <p className="text-sm text-gray-600">{previewDocument.fileSizeFormatted}</p>
                        </div>
                      </div>
                      {previewDocument.description && (
                        <div className="flex items-start space-x-3 md:col-span-2">
                          <FileIcon className="text-gray-400 mt-1" size={18} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">Description</p>
                            <p className="text-sm text-gray-600">{previewDocument.description}</p>
                          </div>
                        </div>
                      )}
                      {previewDocument.credentialLink && (
                        <div className="flex items-center space-x-3 md:col-span-2">
                          <FileIcon className="text-gray-400" size={18} />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Credential Link</p>
                            <a 
                              href={previewDocument.credentialLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {previewDocument.credentialLink}
                            </a>
                          </div>
                        </div>
                      )}
                      {previewDocument.rejectionReason && (
                        <div className="flex items-start space-x-3 md:col-span-2">
                          <X className="text-red-400 mt-1" size={18} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">Rejection Reason</p>
                            <p className="text-sm text-red-600">{previewDocument.rejectionReason}</p>
                          </div>
                        </div>
                      )}
                      {previewDocument.reviewedBy && (
                        <div className="flex items-center space-x-3 md:col-span-2">
                          <User className="text-gray-400" size={18} />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Reviewed By</p>
                            <p className="text-sm text-gray-600">
                              {previewDocument.reviewedBy.facultyName || previewDocument.reviewedBy.email}
                              {previewDocument.reviewDate && (
                                <span className="text-gray-500">
                                  {' '}on {formatDate(previewDocument.reviewDate)}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Modal */}
          {showRejectModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Reason for Rejection</h3>

                  {showSuccessMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                      {showSuccessMessage}
                    </div>
                  )}

                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a detailed reason for rejecting this document..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />

                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => {
                        setShowRejectModal(false);
                        setRejectionReason('');
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitRejection}
                      disabled={!rejectionReason.trim()}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FacultyApprovalPage;
