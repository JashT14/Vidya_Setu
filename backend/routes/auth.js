import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

// import mongoose from "mongoose";
// import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
// import Document from "../models/Document.js";

const router = express.Router();

// Student Login Route
router.post('/student-login', async (req, res) => {
  try {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
      return res.status(400).json({ success: false, message: 'Student ID and password are required' });
    }

    // Validate student ID format (12 digits)
    if (!/^\d{12}$/.test(studentId)) {
      return res.status(400).json({ success: false, message: 'Student ID must be exactly 12 digits' });
    }

    const student = await Student.findOne({ studentId }).select('+studentPassword');
    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid student ID or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, student.studentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid student ID or password' });
    }

    const token = jwt.sign(
      { id: student._id, studentId: student.studentId, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    await Student.findByIdAndUpdate(student._id, { lastLogin: new Date() });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        studentId: student.studentId,
        studentName: student.studentName,
        email: student.email,
        collegeName: student.collegeName,
        deptName: student.deptName,
        deptId: student.deptId,
        yearOfAdmission: student.yearOfAdmission,
        currentYear: student.currentYear
      }
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// // Middleware to verify student token
// const verifyStudentToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Access token required'
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'student') {
//       return res.status(403).json({
//         success: false,
//         message: 'Access denied'
//       });
//     }
//     req.student = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid or expired token'
//     });
//   }
// };

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

// Protected route - Get student profile
// Protected - Get student profile
router.get('/student-profile', verifyStudentToken, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-studentPassword');
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    res.json({ success: true, student });
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update student details route (blank for now)
router.put('/update-details', verifyStudentToken, async (req, res) => {
  try {
    // Keep blank for now
    res.json({
      success: true,
      message: 'Update details endpoint - to be implemented'
    });
  } catch (error) {
    console.error('Update details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Token validation route
// Token validation
router.get('/verify-token', verifyStudentToken, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-studentPassword');
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    res.json({ success: true, valid: true, student });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ success: false, valid: false, message: 'Invalid token' });
  }
});


// FACULTY AUTH BELOW
import Faculty from '../models/faculty.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// Faculty Login Route
router.post('/faculty-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Faculty email and password are required'
      });
    }

    // Find faculty in MongoDB
    const faculty = await Faculty.findOne({ email }).select('+facultyPassword');

    if (!faculty) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, faculty.facultyPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create JWT token
    const facultyToken = jwt.sign(
      {
        id: faculty._id,
        facultyId: faculty.faculty_id,
        role: 'faculty'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login timestamp
    await Faculty.findByIdAndUpdate(faculty._id, {
      lastLogin: new Date()
    });

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      token: facultyToken,
      faculty: {
        id: faculty._id,
        facultyId: faculty.faculty_id,
        name: faculty.name.full,
        email: faculty.email,
        designation: faculty.designation,
        department: faculty.department,
        roles: faculty.roles,
        expertise: faculty.expertise
      }
    });

  } catch (error) {
    console.error('Faculty login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

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

//search

// Faculty search students
router.get('/search', verifyFacultyToken, async (req, res) => {
  try {
    const { query } = req.query; // example: ?query=John
    if (!query) return res.status(400).json({ success: false, message: 'Search query required' });

    const students = await Student.find({
      $or: [
        { studentName: { $regex: query, $options: 'i' } },
        { studentId: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { collegeName: { $regex: query, $options: 'i' } },
        { deptName: { $regex: query, $options: 'i' } }
      ]
    }).select('-studentPassword');

    res.json({ success: true, results: students });
  } catch (error) {
    console.error('Faculty search error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


//above - search route

// Protected route - Get faculty profile
router.get('/faculty-profile', verifyFacultyToken, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id).select('-facultyPassword');

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    res.json({
      success: true,
      faculty: {
        id: faculty._id,
        facultyId: faculty.faculty_id,
        name: faculty.name.full,
        email: faculty.email,
        designation: faculty.designation,
        department: faculty.department,
        roles: faculty.roles,
        expertise: faculty.expertise,
        status: faculty.status
      }
    });
  } catch (error) {
    console.error('Get faculty profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update faculty details route (blank for now)
router.put('/update-faculty', verifyFacultyToken, async (req, res) => {
  try {
    // Keep blank for now
    res.json({
      success: true,
      message: 'Update faculty endpoint - to be implemented'
    });
  } catch (error) {
    console.error('Update faculty details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Token validation route
router.get('/verify-faculty-token', verifyFacultyToken, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id).select('-facultyPassword');

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    res.json({
      success: true,
      valid: true,
      faculty: {
        id: faculty._id,
        facultyId: faculty.faculty_id,
        name: faculty.name.full,
        designation: faculty.designation,
        department: faculty.department,
        roles: faculty.roles
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      valid: false,
      message: 'Invalid token'
    });
  }
});


//NEW ROUTES - TO BE REVISED FURTHER BEFORE PRESENTATION

// Add this route after your existing faculty routes in auth.js

// Get all students - Faculty only access
router.get('/faculty/students', verifyFacultyToken, async (req, res) => {
  try {
    // Optional: Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Fetch students with only required fields
    const students = await Student.find({})
      .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
      .sort({ studentName: 1 }) // Sort by name
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalStudents = await Student.countDocuments();

    res.json({
      success: true,
      students,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalStudents / limit),
        totalStudents,
        hasNext: page < Math.ceil(totalStudents / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// // Get specific student by ID - Faculty only access
// router.get('/faculty/students/:studentId', verifyFacultyToken, async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     const student = await Student.findOne({ studentId })
//       .select('-studentPassword'); // Exclude password

//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: 'Student not found'
//       });
//     }

//     res.json({
//       success: true,
//       student
//     });
//   } catch (error) {
//     console.error('Get student by ID error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Faculty search students (enhanced existing route)
// router.get('/faculty/search', verifyFacultyToken, async (req, res) => {
//   try {
//     const { query, department, year } = req.query;
    
//     if (!query && !department && !year) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'At least one search parameter required' 
//       });
//     }

//     // Build search criteria
//     let searchCriteria = {};
    
//     if (query) {
//       searchCriteria.$or = [
//         { studentName: { $regex: query, $options: 'i' } },
//         { studentId: { $regex: query, $options: 'i' } },
//         { email: { $regex: query, $options: 'i' } },
//         { collegeName: { $regex: query, $options: 'i' } }
//       ];
//     }
    
//     if (department) {
//       searchCriteria.deptName = { $regex: department, $options: 'i' };
//     }
    
//     if (year) {
//       searchCriteria.currentYear = parseInt(year);
//     }

//     const students = await Student.find(searchCriteria)
//       .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
//       .sort({ studentName: 1 })
//       .limit(100); // Limit search results

//     res.json({ 
//       success: true, 
//       results: students,
//       count: students.length 
//     });
//   } catch (error) {
//     console.error('Faculty search error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// Faculty search students (generic query supported)
router.get('/faculty/search', verifyFacultyToken, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query required' 
      });
    }

    // Build generic search criteria
    let searchCriteria = {
      $or: [
        { studentName: { $regex: query, $options: 'i' } },
        { studentId: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { collegeName: { $regex: query, $options: 'i' } },
        { deptName: { $regex: query, $options: 'i' } } // added back for dept search
      ]
    };

    // Optional: if query looks numeric, also try matching currentYear
    if (!isNaN(query)) {
      searchCriteria.$or.push({ currentYear: parseInt(query) });
    }

    const students = await Student.find(searchCriteria)
      .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
      .sort({ studentName: 1 })
      .limit(100);

    res.json({ 
      success: true, 
      results: students,
      count: students.length 
    });
  } catch (error) {
    console.error('Faculty search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});


// // Additional middleware for admin access (to be implemented)
// const verifyAdminToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Access token required'
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'admin') {
//       return res.status(403).json({
//         success: false,
//         message: 'Admin access required'
//       });
//     }
//     req.admin = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid or expired token'
//     });
//   }
// };

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

// Alternative route with faculty OR admin access
router.get('/students', verifyFacultyOrAdminToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const students = await Student.find({})
      .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
      .sort({ studentName: 1 })
      .skip(skip)
      .limit(limit);

    const totalStudents = await Student.countDocuments();

    res.json({
      success: true,
      students,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalStudents / limit),
        totalStudents,
        hasNext: page < Math.ceil(totalStudents / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});


// ADMIN AUTH ROUTES
import Admin from '../models/Admin.js';

// Admin Login Route
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find admin and include password field
    const admin = await Admin.findOne({ email, isActive: true }).select('+passwordHash');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        instituteId: admin.instituteId,
        instituteName: admin.instituteName
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login
    await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        instituteName: admin.instituteName,
        designation: admin.designation,
        complianceAccess: admin.complianceAccess,
        reportGeneration: admin.reportGeneration
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

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

// Middleware for superadmin only
const verifySuperAdminToken = (req, res, next) => {
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
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'SuperAdmin access required'
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

// Get admin profile
router.get('/admin-profile', verifyAdminToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-passwordHash');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify admin token
router.get('/verify-admin-token', verifyAdminToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-passwordHash');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      valid: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        instituteName: admin.instituteName,
        designation: admin.designation,
        complianceAccess: admin.complianceAccess
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      valid: false,
      message: 'Invalid token'
    });
  }
});

// Get all admins (SuperAdmin only)
router.get('/admin/all-admins', verifySuperAdminToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const admins = await Admin.find({})
      .select('-passwordHash')
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    const totalAdmins = await Admin.countDocuments();

    res.json({
      success: true,
      admins,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalAdmins / limit),
        totalAdmins,
        hasNext: page < Math.ceil(totalAdmins / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get all admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get admins by institute
router.get('/admin/institute-admins', verifyAdminToken, async (req, res) => {
  try {
    let instituteId = req.admin.instituteId;
    
    // SuperAdmin can query specific institute
    if (req.admin.role === 'superadmin' && req.query.instituteId) {
      instituteId = req.query.instituteId;
    }

    const admins = await Admin.find({ 
      instituteId, 
      isActive: true 
    }).select('-passwordHash');

    res.json({
      success: true,
      admins
    });
  } catch (error) {
    console.error('Get institute admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get compliance admins for specific compliance type
router.get('/admin/compliance-admins/:complianceType', verifyAdminToken, async (req, res) => {
  try {
    const { complianceType } = req.params;
    let instituteId = req.admin.instituteId;
    
    if (req.admin.role === 'superadmin' && req.query.instituteId) {
      instituteId = req.query.instituteId;
    }

    const admins = await Admin.findComplianceAdmins(instituteId, complianceType);
    
    res.json({
      success: true,
      complianceType,
      admins
    });
  } catch (error) {
    console.error('Get compliance admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get audit-ready admin summary
router.get('/admin/audit-summary', verifyAdminToken, async (req, res) => {
  try {
    let instituteId = req.admin.instituteId;
    
    if (req.admin.role === 'superadmin' && req.query.instituteId) {
      instituteId = req.query.instituteId;
    }

    const auditSummary = await Admin.getAuditReadySummary(instituteId);
    
    res.json({
      success: true,
      auditSummary
    });
  } catch (error) {
    console.error('Get audit summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get compliance summary by institute (SuperAdmin only)
router.get('/admin/compliance-summary', verifySuperAdminToken, async (req, res) => {
  try {
    const complianceSummary = await Admin.getComplianceSummaryByInstitute();
    
    res.json({
      success: true,
      complianceSummary
    });
  } catch (error) {
    console.error('Get compliance summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update admin profile
router.put('/admin/update-profile', verifyAdminToken, async (req, res) => {
  try {
    const allowedUpdates = ['phone', 'metadata'];
    const updates = {};
    
    // Only allow certain fields to be updated
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update'
      });
    }

    updates.updatedBy = req.admin.id;

    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      updates,
      { new: true, runValidators: true }
    ).select('-passwordHash');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      admin
    });
  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update compliance access (SuperAdmin only)
router.put('/admin/update-compliance/:adminId', verifySuperAdminToken, async (req, res) => {
  try {
    const { adminId } = req.params;
    const { complianceAccess } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { 
        complianceAccess,
        updatedBy: req.admin.id
      },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: 'Compliance access updated successfully',
      admin
    });
  } catch (error) {
    console.error('Update compliance access error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update report generation permissions (SuperAdmin only)
router.put('/admin/update-report-permissions/:adminId', verifySuperAdminToken, async (req, res) => {
  try {
    const { adminId } = req.params;
    const { reportGeneration } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { 
        reportGeneration,
        updatedBy: req.admin.id
      },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: 'Report permissions updated successfully',
      admin
    });
  } catch (error) {
    console.error('Update report permissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new admin (SuperAdmin only)
router.post('/admin/create-admin', verifySuperAdminToken, async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      instituteId,
      designation,
      employeeId,
      complianceAccess,
      reportGeneration,
      phone,
      metadata
    } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      passwordHash,
      role,
      instituteId,
      designation,
      employeeId,
      complianceAccess,
      reportGeneration,
      phone,
      metadata,
      createdBy: req.admin.id
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        instituteName: newAdmin.instituteName,
        designation: newAdmin.designation
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Deactivate admin (SuperAdmin only)
router.put('/admin/deactivate/:adminId', verifySuperAdminToken, async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { 
        isActive: false,
        updatedBy: req.admin.id
      },
      { new: true }
    ).select('-passwordHash');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: 'Admin deactivated successfully',
      admin
    });
  } catch (error) {
    console.error('Deactivate admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Activate admin (SuperAdmin only)
router.put('/admin/activate/:adminId', verifySuperAdminToken, async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { 
        isActive: true,
        updatedBy: req.admin.id
      },
      { new: true }
    ).select('-passwordHash');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: 'Admin activated successfully',
      admin
    });
  } catch (error) {
    console.error('Activate admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Admin search functionality
router.get('/admin/search', verifyAdminToken, async (req, res) => {
  try {
    const { query, role, institute } = req.query;

    if (!query && !role && !institute) {
      return res.status(400).json({
        success: false,
        message: 'At least one search parameter required'
      });
    }

    let searchCriteria = { isActive: true };

    // Build search criteria
    if (query) {
      searchCriteria.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { designation: { $regex: query, $options: 'i' } },
        { employeeId: { $regex: query, $options: 'i' } }
      ];
    }

    if (role) {
      searchCriteria.role = role;
    }

    if (institute) {
      searchCriteria.instituteName = { $regex: institute, $options: 'i' };
    }

    // Non-superadmins can only search within their institute
    if (req.admin.role !== 'superadmin') {
      searchCriteria.instituteId = req.admin.instituteId;
    }

    const admins = await Admin.find(searchCriteria)
      .select('-passwordHash')
      .sort({ name: 1 })
      .limit(100);

    res.json({
      success: true,
      results: admins,
      count: admins.length
    });
  } catch (error) {
    console.error('Admin search error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Record report generation activity
router.post('/admin/record-report', verifyAdminToken, async (req, res) => {
  try {
    const { reportType } = req.body;

    // Check if admin can generate this report type
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin.canGenerateReport(reportType)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to generate this report type'
      });
    }

    // Update report generation activity
    await Admin.findByIdAndUpdate(req.admin.id, {
      'reportGeneration.lastReportGenerated': new Date(),
      $inc: { 'reportGeneration.reportsGeneratedCount': 1 }
    });

    res.json({
      success: true,
      message: 'Report generation recorded successfully'
    });
  } catch (error) {
    console.error('Record report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});



export default router;













// // REDIS FULL CODE BELOW, COMPARE AND CONTRAST ROUTES

// import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import redis from 'redis';
// import Student from '../models/Student.js';
// import Faculty from '../models/faculty.js';
// import Admin from '../models/Admin.js';

// const router = express.Router();

// // Redis client setup
// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
//   password: process.env.REDIS_PASSWORD || undefined,
//   db: process.env.REDIS_DB || 0,
//   retry_strategy: (options) => {
//     if (options.error && options.error.code === 'ECONNREFUSED') {
//       console.error('Redis server refused connection');
//       return new Error('Redis server refused connection');
//     }
//     if (options.total_retry_time > 1000 * 60 * 60) {
//       return new Error('Retry time exhausted');
//     }
//     if (options.attempt > 10) {
//       return undefined;
//     }
//     return Math.min(options.attempt * 100, 3000);
//   }
// });

// redisClient.on('connect', () => {
//   console.log('Connected to Redis');
// });

// redisClient.on('error', (err) => {
//   console.error('Redis error:', err);
// });

// redisClient.on('ready', () => {
//   console.log('Redis client ready');
// });

// // Redis helper functions
// const redisHelpers = {
//   // Set data with expiration (default 1 hour)
//   setCache: async (key, data, expireInSeconds = 3600) => {
//     try {
//       await redisClient.setex(key, expireInSeconds, JSON.stringify(data));
//     } catch (error) {
//       console.error('Redis setCache error:', error);
//     }
//   },

//   // Get cached data
//   getCache: async (key) => {
//     try {
//       const data = await redisClient.get(key);
//       return data ? JSON.parse(data) : null;
//     } catch (error) {
//       console.error('Redis getCache error:', error);
//       return null;
//     }
//   },

//   // Delete cache
//   deleteCache: async (key) => {
//     try {
//       await redisClient.del(key);
//     } catch (error) {
//       console.error('Redis deleteCache error:', error);
//     }
//   },

//   // Check if key exists
//   exists: async (key) => {
//     try {
//       return await redisClient.exists(key);
//     } catch (error) {
//       console.error('Redis exists error:', error);
//       return false;
//     }
//   },

//   // Set with hash for complex objects
//   setHash: async (key, field, value) => {
//     try {
//       await redisClient.hset(key, field, JSON.stringify(value));
//     } catch (error) {
//       console.error('Redis setHash error:', error);
//     }
//   },

//   // Get hash field
//   getHash: async (key, field) => {
//     try {
//       const data = await redisClient.hget(key, field);
//       return data ? JSON.parse(data) : null;
//     } catch (error) {
//       console.error('Redis getHash error:', error);
//       return null;
//     }
//   },

//   // Invalidate pattern-based keys
//   invalidatePattern: async (pattern) => {
//     try {
//       const keys = await redisClient.keys(pattern);
//       if (keys.length > 0) {
//         await redisClient.del(...keys);
//       }
//     } catch (error) {
//       console.error('Redis invalidatePattern error:', error);
//     }
//   }
// };

// // Cache key generators
// const cacheKeys = {
//   studentProfile: (studentId) => `student:profile:${studentId}`,
//   facultyProfile: (facultyId) => `faculty:profile:${facultyId}`,
//   adminProfile: (adminId) => `admin:profile:${adminId}`,
//   studentSearch: (query) => `search:students:${Buffer.from(query).toString('base64')}`,
//   adminSearch: (query) => `search:admins:${Buffer.from(query).toString('base64')}`,
//   studentsPage: (page, limit) => `students:page:${page}:${limit}`,
//   adminsPage: (page, limit) => `admins:page:${page}:${limit}`,
//   blacklistedToken: (token) => `blacklist:token:${token}`,
//   sessionData: (userId, role) => `session:${role}:${userId}`,
//   complianceAdmins: (instituteId, complianceType) => `compliance:${instituteId}:${complianceType}`,
//   auditSummary: (instituteId) => `audit:summary:${instituteId}`
// };

// // Token blacklist helper
// const tokenBlacklist = {
//   add: async (token, expiry) => {
//     try {
//       const expiryTime = Math.floor((expiry - Date.now()) / 1000);
//       if (expiryTime > 0) {
//         await redisClient.setex(cacheKeys.blacklistedToken(token), expiryTime, 'blacklisted');
//       }
//     } catch (error) {
//       console.error('Token blacklist add error:', error);
//     }
//   },

//   check: async (token) => {
//     try {
//       return await redisClient.exists(cacheKeys.blacklistedToken(token));
//     } catch (error) {
//       console.error('Token blacklist check error:', error);
//       return false;
//     }
//   }
// };

// // Enhanced middleware with Redis token validation
// const verifyTokenWithRedis = (requiredRole) => {
//   return async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Access token required'
//       });
//     }

//     try {
//       // Check if token is blacklisted
//       const isBlacklisted = await tokenBlacklist.check(token);
//       if (isBlacklisted) {
//         return res.status(401).json({
//           success: false,
//           message: 'Token has been revoked'
//         });
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
//       // Check role permission
//       if (Array.isArray(requiredRole)) {
//         if (!requiredRole.includes(decoded.role)) {
//           return res.status(403).json({
//             success: false,
//             message: 'Insufficient permissions'
//           });
//         }
//       } else if (requiredRole && decoded.role !== requiredRole) {
//         return res.status(403).json({
//           success: false,
//           message: 'Access denied'
//         });
//       }

//       // Cache session data
//       const sessionKey = cacheKeys.sessionData(decoded.id, decoded.role);
//       await redisHelpers.setCache(sessionKey, decoded, 3600); // 1 hour

//       req.user = decoded;
//       if (decoded.role === 'student') req.student = decoded;
//       if (decoded.role === 'faculty') req.faculty = decoded;
//       if (decoded.role === 'admin' || decoded.role === 'superadmin' || decoded.role === 'instituteAdmin') req.admin = decoded;
      
//       next();
//     } catch (error) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid or expired token'
//       });
//     }
//   };
// };

// // Individual role middleware
// const verifyStudentToken = verifyTokenWithRedis('student');
// const verifyFacultyToken = verifyTokenWithRedis('faculty');
// const verifyAdminToken = verifyTokenWithRedis(['superadmin', 'instituteAdmin', 'auditor']);
// const verifySuperAdminToken = verifyTokenWithRedis('superadmin');
// const verifyFacultyOrAdminToken = verifyTokenWithRedis(['faculty', 'superadmin', 'instituteAdmin', 'auditor']);

// // ===================
// // STUDENT ROUTES
// // ===================

// // Student Login Route
// router.post('/student-login', async (req, res) => {
//   try {
//     const { studentId, password } = req.body;

//     if (!studentId || !password) {
//       return res.status(400).json({ success: false, message: 'Student ID and password are required' });
//     }

//     // Validate student ID format (12 digits)
//     if (!/^\d{12}$/.test(studentId)) {
//       return res.status(400).json({ success: false, message: 'Student ID must be exactly 12 digits' });
//     }

//     // Check cache first
//     const cacheKey = `student:auth:${studentId}`;
//     let student = await redisHelpers.getCache(cacheKey);
    
//     if (!student) {
//       student = await Student.findOne({ studentId }).select('+studentPassword');
//       if (student) {
//         // Cache student data for 15 minutes
//         await redisHelpers.setCache(cacheKey, student, 900);
//       }
//     }

//     if (!student) {
//       return res.status(401).json({ success: false, message: 'Invalid student ID or password' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, student.studentPassword);
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: 'Invalid student ID or password' });
//     }

//     const token = jwt.sign(
//       { id: student._id, studentId: student.studentId, role: 'student' },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     // Update last login and cache profile
//     await Student.findByIdAndUpdate(student._id, { lastLogin: new Date() });
//     const profileCacheKey = cacheKeys.studentProfile(student._id);
//     await redisHelpers.setCache(profileCacheKey, {
//       id: student._id,
//       studentId: student.studentId,
//       studentName: student.studentName,
//       email: student.email,
//       collegeName: student.collegeName,
//       deptName: student.deptName,
//       deptId: student.deptId,
//       yearOfAdmission: student.yearOfAdmission,
//       currentYear: student.currentYear
//     }, 3600);

//     res.json({
//       success: true,
//       message: 'Login successful',
//       token,
//       student: {
//         id: student._id,
//         studentId: student.studentId,
//         studentName: student.studentName,
//         email: student.email,
//         collegeName: student.collegeName,
//         deptName: student.deptName,
//         deptId: student.deptId,
//         yearOfAdmission: student.yearOfAdmission,
//         currentYear: student.currentYear
//       }
//     });
//   } catch (error) {
//     console.error('Student login error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Get student profile with caching
// router.get('/student-profile', verifyStudentToken, async (req, res) => {
//   try {
//     const cacheKey = cacheKeys.studentProfile(req.student.id);
//     let student = await redisHelpers.getCache(cacheKey);

//     if (!student) {
//       student = await Student.findById(req.student.id).select('-studentPassword');
//       if (!student) {
//         return res.status(404).json({ success: false, message: 'Student not found' });
//       }
      
//       // Cache for 1 hour
//       await redisHelpers.setCache(cacheKey, student, 3600);
//     }

//     res.json({ success: true, student });
//   } catch (error) {
//     console.error('Get student profile error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Update student details route
// router.put('/update-details', verifyStudentToken, async (req, res) => {
//   try {
//     // Invalidate cached profile
//     const cacheKey = cacheKeys.studentProfile(req.student.id);
//     await redisHelpers.deleteCache(cacheKey);
    
//     // Invalidate search caches
//     await redisHelpers.invalidatePattern('search:students:*');
//     await redisHelpers.invalidatePattern('students:page:*');

//     res.json({
//       success: true,
//       message: 'Update details endpoint - to be implemented'
//     });
//   } catch (error) {
//     console.error('Update details error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Token validation with Redis session check
// router.get('/verify-token', verifyStudentToken, async (req, res) => {
//   try {
//     const sessionKey = cacheKeys.sessionData(req.student.id, 'student');
//     const sessionData = await redisHelpers.getCache(sessionKey);
    
//     if (!sessionData) {
//       return res.status(401).json({ success: false, valid: false, message: 'Session expired' });
//     }

//     const cacheKey = cacheKeys.studentProfile(req.student.id);
//     let student = await redisHelpers.getCache(cacheKey);

//     if (!student) {
//       student = await Student.findById(req.student.id).select('-studentPassword');
//       if (!student) {
//         return res.status(404).json({ success: false, message: 'Student not found' });
//       }
//       await redisHelpers.setCache(cacheKey, student, 3600);
//     }

//     res.json({ success: true, valid: true, student });
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(401).json({ success: false, valid: false, message: 'Invalid token' });
//   }
// });

// // Student logout with token blacklisting
// router.post('/student-logout', verifyStudentToken, async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (token) {
//       const decoded = jwt.decode(token);
//       if (decoded && decoded.exp) {
//         await tokenBlacklist.add(token, decoded.exp * 1000);
//       }
//     }

//     // Clear session cache
//     const sessionKey = cacheKeys.sessionData(req.student.id, 'student');
//     await redisHelpers.deleteCache(sessionKey);

//     res.json({ success: true, message: 'Logged out successfully' });
//   } catch (error) {
//     console.error('Student logout error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // ===================
// // FACULTY ROUTES
// // ===================

// // Faculty Login Route
// router.post('/faculty-login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Faculty email and password are required'
//       });
//     }

//     // Check cache first
//     const cacheKey = `faculty:auth:${email}`;
//     let faculty = await redisHelpers.getCache(cacheKey);
    
//     if (!faculty) {
//       faculty = await Faculty.findOne({ email }).select('+facultyPassword');
//       if (faculty) {
//         await redisHelpers.setCache(cacheKey, faculty, 900); // Cache for 15 minutes
//       }
//     }

//     if (!faculty) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }

//     const isPasswordValid = await bcrypt.compare(password, faculty.facultyPassword);

//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }

//     const facultyToken = jwt.sign(
//       {
//         id: faculty._id,
//         facultyId: faculty.faculty_id,
//         role: 'faculty'
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     // Update last login and cache profile
//     await Faculty.findByIdAndUpdate(faculty._id, {
//       lastLogin: new Date()
//     });

//     const profileData = {
//       id: faculty._id,
//       facultyId: faculty.faculty_id,
//       name: faculty.name.full,
//       email: faculty.email,
//       designation: faculty.designation,
//       department: faculty.department,
//       roles: faculty.roles,
//       expertise: faculty.expertise
//     };

//     const profileCacheKey = cacheKeys.facultyProfile(faculty._id);
//     await redisHelpers.setCache(profileCacheKey, profileData, 3600);

//     res.json({
//       success: true,
//       message: 'Login successful',
//       token: facultyToken,
//       faculty: profileData
//     });

//   } catch (error) {
//     console.error('Faculty login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Faculty search students with caching
// router.get('/search', verifyFacultyToken, async (req, res) => {
//   try {
//     const { query } = req.query;
//     if (!query) return res.status(400).json({ success: false, message: 'Search query required' });

//     const cacheKey = cacheKeys.studentSearch(query);
//     let students = await redisHelpers.getCache(cacheKey);

//     if (!students) {
//       students = await Student.find({
//         $or: [
//           { studentName: { $regex: query, $options: 'i' } },
//           { studentId: { $regex: query, $options: 'i' } },
//           { email: { $regex: query, $options: 'i' } },
//           { collegeName: { $regex: query, $options: 'i' } },
//           { deptName: { $regex: query, $options: 'i' } }
//         ]
//       }).select('-studentPassword').limit(100);

//       // Cache for 10 minutes
//       await redisHelpers.setCache(cacheKey, students, 600);
//     }

//     res.json({ success: true, results: students });
//   } catch (error) {
//     console.error('Faculty search error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Get faculty profile with caching
// router.get('/faculty-profile', verifyFacultyToken, async (req, res) => {
//   try {
//     const cacheKey = cacheKeys.facultyProfile(req.faculty.id);
//     let faculty = await redisHelpers.getCache(cacheKey);

//     if (!faculty) {
//       const facultyDoc = await Faculty.findById(req.faculty.id).select('-facultyPassword');
//       if (!facultyDoc) {
//         return res.status(404).json({
//           success: false,
//           message: 'Faculty not found'
//         });
//       }

//       faculty = {
//         id: facultyDoc._id,
//         facultyId: facultyDoc.faculty_id,
//         name: facultyDoc.name.full,
//         email: facultyDoc.email,
//         designation: facultyDoc.designation,
//         department: facultyDoc.department,
//         roles: facultyDoc.roles,
//         expertise: facultyDoc.expertise,
//         status: facultyDoc.status
//       };

//       await redisHelpers.setCache(cacheKey, faculty, 3600);
//     }

//     res.json({ success: true, faculty });
//   } catch (error) {
//     console.error('Get faculty profile error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Update faculty details route
// router.put('/update-faculty', verifyFacultyToken, async (req, res) => {
//   try {
//     // Invalidate cached profile
//     const cacheKey = cacheKeys.facultyProfile(req.faculty.id);
//     await redisHelpers.deleteCache(cacheKey);
    
//     res.json({
//       success: true,
//       message: 'Update faculty endpoint - to be implemented'
//     });
//   } catch (error) {
//     console.error('Update faculty details error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Token validation for faculty
// router.get('/verify-faculty-token', verifyFacultyToken, async (req, res) => {
//   try {
//     const sessionKey = cacheKeys.sessionData(req.faculty.id, 'faculty');
//     const sessionData = await redisHelpers.getCache(sessionKey);
    
//     if (!sessionData) {
//       return res.status(401).json({ success: false, valid: false, message: 'Session expired' });
//     }

//     const cacheKey = cacheKeys.facultyProfile(req.faculty.id);
//     let faculty = await redisHelpers.getCache(cacheKey);

//     if (!faculty) {
//       const facultyDoc = await Faculty.findById(req.faculty.id).select('-facultyPassword');
//       if (!facultyDoc) {
//         return res.status(404).json({
//           success: false,
//           message: 'Faculty not found'
//         });
//       }

//       faculty = {
//         id: facultyDoc._id,
//         facultyId: facultyDoc.faculty_id,
//         name: facultyDoc.name.full,
//         designation: facultyDoc.designation,
//         department: facultyDoc.department,
//         roles: facultyDoc.roles
//       };

//       await redisHelpers.setCache(cacheKey, faculty, 3600);
//     }

//     res.json({ success: true, valid: true, faculty });
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(401).json({
//       success: false,
//       valid: false,
//       message: 'Invalid token'
//     });
//   }
// });

// // Faculty logout
// router.post('/faculty-logout', verifyFacultyToken, async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (token) {
//       const decoded = jwt.decode(token);
//       if (decoded && decoded.exp) {
//         await tokenBlacklist.add(token, decoded.exp * 1000);
//       }
//     }

//     // Clear session cache
//     const sessionKey = cacheKeys.sessionData(req.faculty.id, 'faculty');
//     await redisHelpers.deleteCache(sessionKey);

//     res.json({ success: true, message: 'Logged out successfully' });
//   } catch (error) {
//     console.error('Faculty logout error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Get all students - Faculty only access with caching
// router.get('/faculty/students', verifyFacultyToken, async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 50;
//     const skip = (page - 1) * limit;

//     const cacheKey = cacheKeys.studentsPage(page, limit);
//     let cachedData = await redisHelpers.getCache(cacheKey);

//     if (!cachedData) {
//       const students = await Student.find({})
//         .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
//         .sort({ studentName: 1 })
//         .skip(skip)
//         .limit(limit);

//       const totalStudents = await Student.countDocuments();

//       cachedData = {
//         students,
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(totalStudents / limit),
//           totalStudents,
//           hasNext: page < Math.ceil(totalStudents / limit),
//           hasPrev: page > 1
//         }
//       };

//       // Cache for 5 minutes
//       await redisHelpers.setCache(cacheKey, cachedData, 300);
//     }

//     res.json({
//       success: true,
//       ...cachedData
//     });
//   } catch (error) {
//     console.error('Get students error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Faculty search students (enhanced with caching)
// router.get('/faculty/search', verifyFacultyToken, async (req, res) => {
//   try {
//     const { query } = req.query;

//     if (!query) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Search query required' 
//       });
//     }

//     const cacheKey = cacheKeys.studentSearch(`faculty:${query}`);
//     let students = await redisHelpers.getCache(cacheKey);

//     if (!students) {
//       // Build generic search criteria
//       let searchCriteria = {
//         $or: [
//           { studentName: { $regex: query, $options: 'i' } },
//           { studentId: { $regex: query, $options: 'i' } },
//           { email: { $regex: query, $options: 'i' } },
//           { collegeName: { $regex: query, $options: 'i' } },
//           { deptName: { $regex: query, $options: 'i' } }
//         ]
//       };

//       // Optional: if query looks numeric, also try matching currentYear
//       if (!isNaN(query)) {
//         searchCriteria.$or.push({ currentYear: parseInt(query) });
//       }

//       students = await Student.find(searchCriteria)
//         .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
//         .sort({ studentName: 1 })
//         .limit(100);

//       // Cache for 10 minutes
//       await redisHelpers.setCache(cacheKey, students, 600);
//     }

//     res.json({ 
//       success: true, 
//       results: students,
//       count: students.length 
//     });
//   } catch (error) {
//     console.error('Faculty search error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// // Alternative route with faculty OR admin access
// router.get('/students', verifyFacultyOrAdminToken, async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 50;
//     const skip = (page - 1) * limit;

//     const cacheKey = cacheKeys.studentsPage(page, limit);
//     let cachedData = await redisHelpers.getCache(cacheKey);

//     if (!cachedData) {
//       const students = await Student.find({})
//         .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
//         .sort({ studentName: 1 })
//         .skip(skip)
//         .limit(limit);

//       const totalStudents = await Student.countDocuments();

//       cachedData = {
//         students,
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(totalStudents / limit),
//           totalStudents,
//           hasNext: page < Math.ceil(totalStudents / limit),
//           hasPrev: page > 1
//         }
//       };

//       // Cache for 5 minutes
//       await redisHelpers.setCache(cacheKey, cachedData, 300);
//     }

//     res.json({
//       success: true,
//       ...cachedData
//     });
//   } catch (error) {
//     console.error('Get students error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // ===================
// // ADMIN ROUTES
// // ===================

// // Admin Login Route
// router.post('/admin-login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and password are required'
//       });
//     }

//     // Check cache first
//     const cacheKey = `admin:auth:${email}`;
//     let admin = await redisHelpers.getCache(cacheKey);
    
//     if (!admin) {
//       admin = await Admin.findOne({ email, isActive: true }).select('+passwordHash');
//       if (admin) {
//         await redisHelpers.setCache(cacheKey, admin, 900); // Cache for 15 minutes
//       }
//     }
    
//     if (!admin) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       {
//         id: admin._id,
//         email: admin.email,
//         role: admin.role,
//         instituteId: admin.instituteId,
//         instituteName: admin.instituteName
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     // Update last login
//     await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

//     // Cache admin profile
//     const profileData = {
//       id: admin._id,
//       name: admin.name,
//       email: admin.email,
//       role: admin.role,
//       instituteName: admin.instituteName,
//       designation: admin.designation,
//       complianceAccess: admin.complianceAccess,
//       reportGeneration: admin.reportGeneration
//     };

//     const profileCacheKey = cacheKeys.adminProfile(admin._id);
//     await redisHelpers.setCache(profileCacheKey, profileData, 3600);

//     res.json({
//       success: true,
//       message: 'Login successful',
//       token,
//       admin: profileData
//     });
//   } catch (error) {
//     console.error('Admin login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Get admin profile with caching
// router.get('/admin-profile', verifyAdminToken, async (req, res) => {
//   try {
//     const cacheKey = cacheKeys.adminProfile(req.admin.id);
//     let admin = await redisHelpers.getCache(cacheKey);

//     if (!admin) {
//       admin = await Admin.findById(req.admin.id).select('-passwordHash');
//       if (!admin) {
//         return res.status(404).json({
//           success: false,
//           message: 'Admin not found'
//         });
//       }

//       await redisHelpers.setCache(cacheKey, admin, 3600);
//     }

//     res.json({
//       success: true,
//       admin
//     });
//   } catch (error) {
//     console.error('Get admin profile error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Verify admin token
// router.get('/verify-admin-token', verifyAdminToken, async (req, res) => {
//   try {
//     const sessionKey = cacheKeys.sessionData(req.admin.id, req.admin.role);
//     const sessionData = await redisHelpers.getCache(sessionKey);
    
//     if (!sessionData) {
//       return res.status(401).json({ success: false, valid: false, message: 'Session expired' });
//     }

//     const cacheKey = cacheKeys.adminProfile(req.admin.id);
//     let admin = await redisHelpers.getCache(cacheKey);
    
//     if (!admin) {
//       admin = await Admin.findById(req.admin.id).select('-passwordHash');
//       if (!admin) {
//         return res.status(404).json({
//           success: false,
//           message: 'Admin not found'
//         });
//       }
//       await redisHelpers.setCache(cacheKey, admin, 3600);
//     }

//     res.json({
//       success: true,
//       valid: true,
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//         instituteName: admin.instituteName,
//         designation: admin.designation,
//         complianceAccess: admin.complianceAccess
//       }
//     });
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(401).json({
//       success: false,
//       valid: false,
//       message: 'Invalid token'
//     });
//   }
// });

// // Admin logout
// router.post('/admin-logout', verifyAdminToken, async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (token) {
//       const decoded = jwt.decode(token);
//       if (decoded && decoded.exp) {
//         await tokenBlacklist.add(token, decoded.exp * 1000);
//       }
//     }

//     // Clear session cache
//     const sessionKey = cacheKeys.sessionData(req.admin.id, req.admin.role);
//     await redisHelpers.deleteCache(sessionKey);

//     // Clear profile cache
//     const profileKey = cacheKeys.adminProfile(req.admin.id);
//     await redisHelpers.deleteCache(profileKey);

//     res.json({ success: true, message: 'Logged out successfully' });
//   } catch (error) {
//     console.error('Admin logout error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Get all admins (SuperAdmin only) with caching
// router.get('/admin/all-admins', verifySuperAdminToken, async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 50;
//     const skip = (page - 1) * limit;

//     const cacheKey = cacheKeys.adminsPage(page, limit);
//     let cachedData = await redisHelpers.getCache(cacheKey);

//     if (!cachedData) {
//       const admins = await Admin.find({})
//         .select('-passwordHash')
//         .sort({ name: 1 })
//         .skip(skip)
//         .limit(limit);

//       const totalAdmins = await Admin.countDocuments();

//       cachedData = {
//         admins,
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(totalAdmins / limit),
//           totalAdmins,
//           hasNext: page < Math.ceil(totalAdmins / limit),
//           hasPrev: page > 1
//         }
//       };

//       // Cache for 5 minutes
//       await redisHelpers.setCache(cacheKey, cachedData, 300);
//     }

//     res.json({
//       success: true,
//       ...cachedData
//     });
//   } catch (error) {
//     console.error('Get all admins error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Get admins by institute with caching
// router.get('/admin/institute-admins', verifyAdminToken, async (req, res) => {
//   try {
//     let instituteId = req.admin.instituteId;
    
//     // SuperAdmin can query specific institute
//     if (req.admin.role === 'superadmin' && req.query.instituteId) {
//       instituteId = req.query.instituteId;
//     }

//     const cacheKey = `institute:admins:${instituteId}`;
//     let admins = await redisHelpers.getCache(cacheKey);

//     if (!admins) {
//       admins = await Admin.find({ 
//         instituteId, 
//         isActive: true 
//       }).select('-passwordHash');

//       // Cache for 10 minutes
//       await redisHelpers.setCache(cacheKey, admins, 600);
//     }

//     res.json({
//       success: true,
//       admins
//     });
//   } catch (error) {
//     console.error('Get institute admins error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Get compliance admins for specific compliance type with caching
// router.get('/admin/compliance-admins/:complianceType', verifyAdminToken, async (req, res) => {
//   try {
//     const { complianceType } = req.params;
//     let instituteId = req.admin.instituteId;
    
//     if (req.admin.role === 'superadmin' && req.query.instituteId) {
//       instituteId = req.query.instituteId;
//     }

//     const cacheKey = cacheKeys.complianceAdmins(instituteId, complianceType);
//     let admins = await redisHelpers.getCache(cacheKey);

//     if (!admins) {
//       admins = await Admin.findComplianceAdmins(instituteId, complianceType);
      
//       // Cache for 15 minutes
//       await redisHelpers.setCache(cacheKey, admins, 900);
//     }
    
//     res.json({
//       success: true,
//       complianceType,
//       admins
//     });
//   } catch (error) {
//     console.error('Get compliance admins error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Get audit-ready admin summary with caching
// router.get('/admin/audit-summary', verifyAdminToken, async (req, res) => {
//   try {
//     let instituteId = req.admin.instituteId;
    
//     if (req.admin.role === 'superadmin' && req.query.instituteId) {
//       instituteId = req.query.instituteId;
//     }

//     const cacheKey = cacheKeys.auditSummary(instituteId);
//     let auditSummary = await redisHelpers.getCache(cacheKey);

//     if (!auditSummary) {
//       auditSummary = await Admin.getAuditReadySummary(instituteId);
      
//       // Cache for 30 minutes
//       await redisHelpers.setCache(cacheKey, auditSummary, 1800);
//     }
    
//     res.json({
//       success: true,
//       auditSummary
//     });
//   } catch (error) {
//     console.error('Get audit summary error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Get compliance summary by institute (SuperAdmin only) with caching
// router.get('/admin/compliance-summary', verifySuperAdminToken, async (req, res) => {
//   try {
//     const cacheKey = 'compliance:summary:all';
//     let complianceSummary = await redisHelpers.getCache(cacheKey);

//     if (!complianceSummary) {
//       complianceSummary = await Admin.getComplianceSummaryByInstitute();
      
//       // Cache for 1 hour
//       await redisHelpers.setCache(cacheKey, complianceSummary, 3600);
//     }
    
//     res.json({
//       success: true,
//       complianceSummary
//     });
//   } catch (error) {
//     console.error('Get compliance summary error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Update admin profile with cache invalidation
// router.put('/admin/update-profile', verifyAdminToken, async (req, res) => {
//   try {
//     const allowedUpdates = ['phone', 'metadata'];
//     const updates = {};
    
//     // Only allow certain fields to be updated
//     Object.keys(req.body).forEach(key => {
//       if (allowedUpdates.includes(key)) {
//         updates[key] = req.body[key];
//       }
//     });

//     if (Object.keys(updates).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No valid fields provided for update'
//       });
//     }

//     updates.updatedBy = req.admin.id;

//     const admin = await Admin.findByIdAndUpdate(
//       req.admin.id,
//       updates,
//       { new: true, runValidators: true }
//     ).select('-passwordHash');

//     // Invalidate caches
//     await redisHelpers.deleteCache(cacheKeys.adminProfile(req.admin.id));
//     await redisHelpers.invalidatePattern('admin:*');
//     await redisHelpers.invalidatePattern('institute:*');

//     res.json({
//       success: true,
//       message: 'Profile updated successfully',
//       admin
//     });
//   } catch (error) {
//     console.error('Update admin profile error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Update compliance access (SuperAdmin only) with cache invalidation
// router.put('/admin/update-compliance/:adminId', verifySuperAdminToken, async (req, res) => {
//   try {
//     const { adminId } = req.params;
//     const { complianceAccess } = req.body;

//     const admin = await Admin.findByIdAndUpdate(
//       adminId,
//       { 
//         complianceAccess,
//         updatedBy: req.admin.id
//       },
//       { new: true, runValidators: true }
//     ).select('-passwordHash');

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admin not found'
//       });
//     }

//     // Invalidate caches
//     await redisHelpers.deleteCache(cacheKeys.adminProfile(adminId));
//     await redisHelpers.invalidatePattern('compliance:*');
//     await redisHelpers.invalidatePattern('institute:*');

//     res.json({
//       success: true,
//       message: 'Compliance access updated successfully',
//       admin
//     });
//   } catch (error) {
//     console.error('Update compliance access error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Update report generation permissions (SuperAdmin only) with cache invalidation
// router.put('/admin/update-report-permissions/:adminId', verifySuperAdminToken, async (req, res) => {
//   try {
//     const { adminId } = req.params;
//     const { reportGeneration } = req.body;

//     const admin = await Admin.findByIdAndUpdate(
//       adminId,
//       { 
//         reportGeneration,
//         updatedBy: req.admin.id
//       },
//       { new: true, runValidators: true }
//     ).select('-passwordHash');

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admin not found'
//       });
//     }

//     // Invalidate caches
//     await redisHelpers.deleteCache(cacheKeys.adminProfile(adminId));
//     await redisHelpers.invalidatePattern('admin:*');

//     res.json({
//       success: true,
//       message: 'Report permissions updated successfully',
//       admin
//     });
//   } catch (error) {
//     console.error('Update report permissions error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Create new admin (SuperAdmin only) with cache invalidation
// router.post('/admin/create-admin', verifySuperAdminToken, async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       role,
//       instituteId,
//       designation,
//       employeeId,
//       complianceAccess,
//       reportGeneration,
//       phone,
//       metadata
//     } = req.body;

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({
//         success: false,
//         message: 'Admin with this email already exists'
//       });
//     }

//     // Hash password
//     const saltRounds = 12;
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     // Create new admin
//     const newAdmin = new Admin({
//       name,
//       email,
//       passwordHash,
//       role,
//       instituteId,
//       designation,
//       employeeId,
//       complianceAccess,
//       reportGeneration,
//       phone,
//       metadata,
//       createdBy: req.admin.id
//     });

//     await newAdmin.save();

//     // Invalidate admin list caches
//     await redisHelpers.invalidatePattern('admin:*');
//     await redisHelpers.invalidatePattern('institute:*');
//     await redisHelpers.invalidatePattern('compliance:*');

//     res.status(201).json({
//       success: true,
//       message: 'Admin created successfully',
//       admin: {
//         id: newAdmin._id,
//         name: newAdmin.name,
//         email: newAdmin.email,
//         role: newAdmin.role,
//         instituteName: newAdmin.instituteName,
//         designation: newAdmin.designation
//       }
//     });
//   } catch (error) {
//     console.error('Create admin error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Deactivate admin (SuperAdmin only) with cache invalidation
// router.put('/admin/deactivate/:adminId', verifySuperAdminToken, async (req, res) => {
//   try {
//     const { adminId } = req.params;

//     const admin = await Admin.findByIdAndUpdate(
//       adminId,
//       { 
//         isActive: false,
//         updatedBy: req.admin.id
//       },
//       { new: true }
//     ).select('-passwordHash');

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admin not found'
//       });
//     }

//     // Invalidate caches and blacklist any active tokens
//     await redisHelpers.deleteCache(cacheKeys.adminProfile(adminId));
//     await redisHelpers.invalidatePattern('admin:*');
//     await redisHelpers.invalidatePattern('institute:*');
    
//     // Find and blacklist active sessions
//     const sessionKey = cacheKeys.sessionData(adminId, admin.role);
//     await redisHelpers.deleteCache(sessionKey);

//     res.json({
//       success: true,
//       message: 'Admin deactivated successfully',
//       admin
//     });
//   } catch (error) {
//     console.error('Deactivate admin error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Activate admin (SuperAdmin only) with cache invalidation
// router.put('/admin/activate/:adminId', verifySuperAdminToken, async (req, res) => {
//   try {
//     const { adminId } = req.params;

//     const admin = await Admin.findByIdAndUpdate(
//       adminId,
//       { 
//         isActive: true,
//         updatedBy: req.admin.id
//       },
//       { new: true }
//     ).select('-passwordHash');

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admin not found'
//       });
//     }

//     // Invalidate caches
//     await redisHelpers.invalidatePattern('admin:*');
//     await redisHelpers.invalidatePattern('institute:*');

//     res.json({
//       success: true,
//       message: 'Admin activated successfully',
//       admin
//     });
//   } catch (error) {
//     console.error('Activate admin error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Admin search functionality with caching
// router.get('/admin/search', verifyAdminToken, async (req, res) => {
//   try {
//     const { query, role, institute } = req.query;

//     if (!query && !role && !institute) {
//       return res.status(400).json({
//         success: false,
//         message: 'At least one search parameter required'
//       });
//     }

//     const searchQuery = `${query || ''}:${role || ''}:${institute || ''}:${req.admin.instituteId}`;
//     const cacheKey = cacheKeys.adminSearch(searchQuery);
//     let admins = await redisHelpers.getCache(cacheKey);

//     if (!admins) {
//       let searchCriteria = { isActive: true };

//       // Build search criteria
//       if (query) {
//         searchCriteria.$or = [
//           { name: { $regex: query, $options: 'i' } },
//           { email: { $regex: query, $options: 'i' } },
//           { designation: { $regex: query, $options: 'i' } },
//           { employeeId: { $regex: query, $options: 'i' } }
//         ];
//       }

//       if (role) {
//         searchCriteria.role = role;
//       }

//       if (institute) {
//         searchCriteria.instituteName = { $regex: institute, $options: 'i' };
//       }

//       // Non-superadmins can only search within their institute
//       if (req.admin.role !== 'superadmin') {
//         searchCriteria.instituteId = req.admin.instituteId;
//       }

//       admins = await Admin.find(searchCriteria)
//         .select('-passwordHash')
//         .sort({ name: 1 })
//         .limit(100);

//       // Cache for 10 minutes
//       await redisHelpers.setCache(cacheKey, admins, 600);
//     }

//     res.json({
//       success: true,
//       results: admins,
//       count: admins.length
//     });
//   } catch (error) {
//     console.error('Admin search error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Record report generation activity with caching
// router.post('/admin/record-report', verifyAdminToken, async (req, res) => {
//   try {
//     const { reportType } = req.body;

//     // Check if admin can generate this report type
//     const admin = await Admin.findById(req.admin.id);
    
//     if (!admin.canGenerateReport(reportType)) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have permission to generate this report type'
//       });
//     }

//     // Update report generation activity
//     await Admin.findByIdAndUpdate(req.admin.id, {
//       'reportGeneration.lastReportGenerated': new Date(),
//       $inc: { 'reportGeneration.reportsGeneratedCount': 1 }
//     });

//     // Invalidate admin profile cache
//     await redisHelpers.deleteCache(cacheKeys.adminProfile(req.admin.id));

//     res.json({
//       success: true,
//       message: 'Report generation recorded successfully'
//     });
//   } catch (error) {
//     console.error('Record report error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // ===================
// // UTILITY ROUTES
// // ===================

// // Clear specific user cache (SuperAdmin only)
// router.delete('/admin/clear-cache/:userType/:userId', verifySuperAdminToken, async (req, res) => {
//   try {
//     const { userType, userId } = req.params;

//     let cacheKey;
//     switch (userType) {
//       case 'student':
//         cacheKey = cacheKeys.studentProfile(userId);
//         break;
//       case 'faculty':
//         cacheKey = cacheKeys.facultyProfile(userId);
//         break;
//       case 'admin':
//         cacheKey = cacheKeys.adminProfile(userId);
//         break;
//       default:
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid user type'
//         });
//     }

//     await redisHelpers.deleteCache(cacheKey);
    
//     res.json({
//       success: true,
//       message: `Cache cleared for ${userType}: ${userId}`
//     });
//   } catch (error) {
//     console.error('Clear cache error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Clear all caches (SuperAdmin only)
// router.delete('/admin/clear-all-cache', verifySuperAdminToken, async (req, res) => {
//   try {
//     await redisClient.flushdb();
    
//     res.json({
//       success: true,
//       message: 'All caches cleared successfully'
//     });
//   } catch (error) {
//     console.error('Clear all cache error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Get cache statistics (SuperAdmin only)
// router.get('/admin/cache-stats', verifySuperAdminToken, async (req, res) => {
//   try {
//     const info = await redisClient.info('memory');
//     const keyspace = await redisClient.info('keyspace');
//     const stats = await redisClient.info('stats');
    
//     res.json({
//       success: true,
//       cacheStats: {
//         memory: info,
//         keyspace: keyspace,
//         stats: stats
//       }
//     });
//   } catch (error) {
//     console.error('Get cache stats error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Health check with Redis status
// router.get('/health', async (req, res) => {
//   try {
//     let redisStatus = 'disconnected';
//     try {
//       await redisClient.ping();
//       redisStatus = 'connected';
//     } catch (redisError) {
//       console.error('Redis health check failed:', redisError);
//     }

//     res.json({
//       success: true,
//       status: 'healthy',
//       timestamp: new Date().toISOString(),
//       services: {
//         api: 'running',
//         redis: redisStatus,
//         database: 'connected' // Assuming MongoDB is connected if this route works
//       }
//     });
//   } catch (error) {
//     console.error('Health check error:', error);
//     res.status(500).json({
//       success: false,
//       status: 'unhealthy',
//       error: error.message
//     });
//   }
// });

// // ===================
// // ERROR HANDLING & CLEANUP
// // ===================

// // Graceful Redis cleanup on process termination
// process.on('SIGINT', async () => {
//   console.log('Received SIGINT, closing Redis connection...');
//   try {
//     await redisClient.quit();
//     console.log('Redis connection closed.');
//   } catch (error) {
//     console.error('Error closing Redis connection:', error);
//   }
//   process.exit(0);
// });

// process.on('SIGTERM', async () => {
//   console.log('Received SIGTERM, closing Redis connection...');
//   try {
//     await redisClient.quit();
//     console.log('Redis connection closed.');
//   } catch (error) {
//     console.error('Error closing Redis connection:', error);
//   }
//   process.exit(0);
// });

// // Export Redis client for use in other modules if needed
// export { redisClient, redisHelpers, cacheKeys };

// export default router;