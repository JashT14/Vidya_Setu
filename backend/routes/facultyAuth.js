// import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Faculty from '../models/Faculty.js';

// const router = express.Router();

// // Faculty Login Route
// router.post('/faculty-login', async (req, res) => {
//   try {
//     const { facultyId, password } = req.body;

//     // Validate input
//     if (!facultyId || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Faculty ID and password are required'
//       });
//     }

//     // Find faculty in MongoDB
//     const faculty = await Faculty.findOne({ facultyId });

//     if (!faculty) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid faculty ID or password'
//       });
//     }

//     // Faculty password field (hash stored in DB if using auth)
//     const isPasswordValid = await bcrypt.compare(password, faculty.facultyPassword);

//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid faculty ID or password'
//       });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       {
//         id: faculty._id,
//         facultyId: faculty.facultyId,
//         role: 'faculty'
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     // Update last login timestamp
//     await Faculty.findByIdAndUpdate(faculty._id, {
//       lastLogin: new Date()
//     });

//     // Return success response (no password)
//     res.json({
//       success: true,
//       message: 'Login successful',
//       token: token,
//       faculty: {
//         id: faculty._id,
//         facultyId: faculty.facultyId,
//         name: faculty.name.full,
//         email: faculty.email,
//         designation: faculty.designation,
//         department: faculty.department,
//         roles: faculty.roles,
//         expertise: faculty.expertise
//       }
//     });

//   } catch (error) {
//     console.error('Faculty login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Middleware to verify faculty token
// const verifyFacultyToken = (req, res, next) => {
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
//     if (decoded.role !== 'faculty') {
//       return res.status(403).json({
//         success: false,
//         message: 'Access denied'
//       });
//     }
//     req.faculty = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid or expired token'
//     });
//   }
// };

// // Protected route - Get faculty profile
// router.get('/faculty-profile', verifyFacultyToken, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id).select('-facultyPassword');

//     if (!faculty) {
//       return res.status(404).json({
//         success: false,
//         message: 'Faculty not found'
//       });
//     }

//     res.json({
//       success: true,
//       faculty: {
//         id: faculty._id,
//         facultyId: faculty.facultyId,
//         name: faculty.name.full,
//         email: faculty.email,
//         designation: faculty.designation,
//         department: faculty.department,
//         roles: faculty.roles,
//         expertise: faculty.expertise,
//         status: faculty.status
//       }
//     });
//   } catch (error) {
//     console.error('Get faculty profile error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Update faculty details route (blank for now)
// router.put('/update-faculty', verifyFacultyToken, async (req, res) => {
//   try {
//     // Keep blank for now
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

// // Token validation route
// router.get('/verify-faculty-token', verifyFacultyToken, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id).select('-facultyPassword');
    
//     if (!faculty) {
//       return res.status(404).json({
//         success: false,
//         message: 'Faculty not found'
//       });
//     }

//     res.json({
//       success: true,
//       valid: true,
//       faculty: {
//         id: faculty._id,
//         facultyId: faculty.facultyId,
//         name: faculty.name.full,
//         designation: faculty.designation,
//         department: faculty.department,
//         roles: faculty.roles
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

// export default router;
