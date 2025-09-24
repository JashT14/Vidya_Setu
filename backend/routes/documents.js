// routes/documents.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import multer from 'multer';
import Document from '../models/Document.js';
import {
  upload,
  uploadToGridFS,
  downloadFromGridFS,
  deleteFromGridFS,
  fileExistsInGridFS,
  getFileInfo,
} from '../config/gridfs.js';

const router = express.Router();

//Middlewares

// Add this middleware function at the top with your other middleware
const verifyMultiRoleToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Set appropriate req property based on role
    if (decoded.role === 'student') {
      req.student = decoded;
    } else if (decoded.role === 'faculty') {
      req.faculty = decoded;
    } else if (['superadmin', 'instituteAdmin', 'auditor'].includes(decoded.role)) {
      req.admin = decoded;
    } else {
      return res.status(403).json({
        success: false,
        message: 'Invalid role'
      });
    }

    req.user = decoded; // Set general user info
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Middleware for faculty OR admin access
const verifyFacultyOrAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'faculty' && decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Faculty or Admin access required'
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!['superadmin', 'instituteAdmin', 'auditor'].includes(decoded.role)) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Middleware to verify faculty token
const verifyFacultyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const facultyToken = authHeader && authHeader.split(' ')[1];

  if (!facultyToken) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(facultyToken, process.env.JWT_SECRET);
    if (decoded.role !== 'faculty') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    req.faculty = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Middleware to verify student token
const verifyStudentToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'student') return res.status(403).json({ success: false, message: 'Access denied' });

    req.student = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};


//end of middlewares


// Helper function to format file size
function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 1. Upload document (Student only)
router.post("/upload", verifyStudentToken, upload.single("file"), async (req, res) => {
    console.log('Upload route hit');
    console.log('req.file:', req.file ? 'File present' : 'No file');
    console.log('req.body:', req.body);
  try {
    const { category, institution, description, dateCompleted, education, credentialLink } = req.body;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "File is required" 
      });
    }

    // Validate required fields
    if (!category || !institution || !dateCompleted) {
      return res.status(400).json({
        success: false,
        message: "Category, institution, and dateCompleted are required"
      });
    }

    // Special validation for Certificates category
    if (category === "Certificates" && !credentialLink) {
      return res.status(400).json({
        success: false,
        message: "Credential link is required for Certificates category"
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${req.file.originalname}`;

    // Upload file to GridFS
    const gridfsFile = await uploadToGridFS(
      req.file.buffer,
      filename,
      req.file.mimetype,
      {
        studentId: req.student.id,
        originalName: req.file.originalname,
        category: category,
      }
    );

    // Create document record in MongoDB
    const document = new Document({
      studentId: req.student.id,
      fileId: gridfsFile.id,
      fileName: gridfsFile.filename,
      fileType: gridfsFile.contentType,
      fileSize: gridfsFile.size,
      category,
      institution: institution.trim(),
      description: description?.trim(),
      dateCompleted: new Date(dateCompleted),
      education: education?.trim(),
      credentialLink: credentialLink || null,
      status: "pending",
    });

    await document.save();
    
    res.status(201).json({ 
      success: true, 
      message: "Document uploaded successfully",
      document: {
        id: document._id,
        fileName: document.fileName,
        category: document.category,
        institution: document.institution,
        status: document.status,
        uploadDate: document.createdAt,
        fileSize: document.fileSize,
      }
    });
  } catch (error) {
    console.error("Document upload error:", error);
    
    // Handle multer errors
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          success: false, 
          message: "File size too large. Maximum 10MB allowed." 
        });
      }
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Failed to upload document" 
    });
  }
});

// 2. Get student's own documents
router.get("/my", verifyStudentToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status } = req.query;
    
    const query = { studentId: req.student.id };
    if (category && category !== 'all') query.category = category;
    if (status && status !== 'all') query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-fileId'); // Don't send fileId for security

    const total = await Document.countDocuments(query);

    // Add file size formatting
    const formattedDocuments = documents.map(doc => ({
      ...doc.toObject(),
      fileSizeFormatted: formatFileSize(doc.fileSize),
    }));

    res.json({ 
      success: true, 
      documents: formattedDocuments,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error("Get documents error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch documents" 
    });
  }
});

// 3. Download document file
router.get("/:documentId/download", verifyMultiRoleToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    // Find document record
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }

    // Check permissions - FIXED the undefined id issue
    let isOwner = false;
    if (req.student && req.student.id && document.studentId) {
      isOwner = document.studentId === req.student.id;
    }
    
    const isFacultyOrAdmin = req.faculty || req.admin;
    
    if (!isOwner && !isFacultyOrAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied" 
      });
    }

    // Get file from GridFS
    const { stream, file } = await downloadFromGridFS(document.fileId);

    // Set response headers
    res.set({
      'Content-Type': file.contentType || document.fileType,
      'Content-Disposition': `attachment; filename="${file.filename || document.fileName}"`,
      'Content-Length': file.length || document.fileSize,
    });

    // Handle stream errors
    stream.on('error', (error) => {
      console.error('Download stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ 
          success: false, 
          message: "Error streaming file" 
        });
      }
    });

    // Pipe file to response
    stream.pipe(res);
    
  } catch (error) {
    console.error("File download error:", error);
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false, 
        message: error.message || "Failed to download file" 
      });
    }
  }
});

// 4. Faculty/Admin - Get all documents
router.get("/all", verifyFacultyOrAdminToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, category, studentId, search } = req.query;
    
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (category && category !== 'all') query.category = category;
    if (studentId) query.studentId = studentId;
    
    // Add search functionality
    if (search) {
      query.$or = [
        { institution: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { fileName: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const documents = await Document.find(query)
      .populate('studentId', 'studentName studentId email collegeName deptName')
      .populate('reviewedBy', 'facultyName email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-fileId'); // Don't send fileId for security

    const total = await Document.countDocuments(query);

    res.json({ 
      success: true, 
      documents,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error("Get all documents error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch documents" 
    });
  }
});

// 5. Faculty - Review document (verify/reject)
router.patch("/:documentId/review", verifyFacultyToken, async (req, res) => {
  try {
    const { documentId } = req.params;
    const { action, rejectionReason } = req.body;

    if (!['verify', 'reject'].includes(action)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid action. Use 'verify' or 'reject'" 
      });
    }

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }

    // Check if document is still pending
    if (document.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Document is already ${document.status}`
      });
    }

    // Update document status
    if (action === "verify") {
      document.status = "verified";
      document.rejectionReason = null;
    } else if (action === "reject") {
      if (!rejectionReason || rejectionReason.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: "Rejection reason is required" 
        });
      }
      document.status = "rejected";
      document.rejectionReason = rejectionReason.trim();
    }

    document.reviewedBy = req.faculty.id;
    document.reviewDate = new Date();

    await document.save();

    // Populate the response
    await document.populate([
      { path: 'reviewedBy', select: 'facultyName email' },
      { path: 'studentId', select: 'studentName studentId email' }
    ]);
    
    res.json({ 
      success: true, 
      message: `Document ${action}d successfully`,
      document
    });
  } catch (error) {
    console.error("Document review error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to review document" 
    });
  }
});

// 6. Admin - Delete document
router.delete("/:documentId", verifyAdminToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }

    // Delete file from GridFS
    try {
      await deleteFromGridFS(document.fileId);
      console.log(`Deleted file from GridFS: ${document.fileName}`);
    } catch (gridError) {
      console.error("GridFS delete error:", gridError);
      // Continue with document deletion even if GridFS delete fails
    }

    // Delete document record
    await Document.findByIdAndDelete(documentId);

    res.json({ 
      success: true, 
      message: "Document deleted successfully" 
    });
  } catch (error) {
    console.error("Delete document error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete document" 
    });
  }
});

// 7. Get document details by ID
// Replace the existing document details route (around line 567)
router.get("/:documentId", verifyMultiRoleToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    const document = await Document.findById(documentId)
      .populate('studentId', 'studentName studentId email collegeName deptName')
      .populate('reviewedBy', 'facultyName email')
      .select('-fileId');

    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }

    // Check access permissions - FIXED the undefined id issue
    let isOwner = false;
    if (req.student && req.student.id && document.studentId) {
      isOwner = document.studentId._id.toString() === req.student.id;
    }
    
    const isFacultyOrAdmin = req.faculty || req.admin;
    
    if (!isOwner && !isFacultyOrAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied" 
      });
    }

    res.json({ 
      success: true, 
      document: {
        ...document.toObject(),
        fileSizeFormatted: formatFileSize(document.fileSize),
      }
    });
  } catch (error) {
    console.error("Get document details error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch document details" 
    });
  }
});

// 8. Student - Delete own document (only if pending)
router.delete("/:documentId/student", verifyStudentToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    const document = await Document.findOne({
      _id: documentId,
      studentId: req.student.id
    });

    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }

    // Only allow deletion of pending documents
    if (document.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: "Only pending documents can be deleted" 
      });
    }

    // Delete file from GridFS
    try {
      await deleteFromGridFS(document.fileId);
    } catch (gridError) {
      console.error("GridFS delete error:", gridError);
    }

    // Delete document record
    await Document.findByIdAndDelete(documentId);

    res.json({ 
      success: true, 
      message: "Document deleted successfully" 
    });
  } catch (error) {
    console.error("Student delete document error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete document" 
    });
  }
});

// 9. Get document statistics
router.get("/stats/overview", verifyFacultyOrAdminToken, async (req, res) => {
  try {
    const stats = await Document.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await Document.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalDocuments = await Document.countDocuments();
    const totalStudents = await Document.distinct('studentId').then(ids => ids.length);

    res.json({
      success: true,
      stats: {
        byStatus: stats.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        byCategory: categoryStats.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        totalDocuments,
        totalStudents,
      }
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics"
    });
  }
});

export default router;