// // // // // seedData.js - Script to add sample students to MongoDB
// // // // import mongoose from 'mongoose';
// // // // import bcrypt from 'bcrypt';
// // // // import dotenv from 'dotenv';

// // // // // Load environment variables
// // // // dotenv.config();

// // // // // Student Schema (inline for this script)
// // // // const studentSchema = new mongoose.Schema({
// // // //   studentId: {
// // // //     type: String,
// // // //     required: true,
// // // //     unique: true,
// // // //     match: /^\d{12}$/,
// // // //     index: true
// // // //   },
// // // //   studentPassword: {
// // // //     type: String,
// // // //     required: true,
// // // //     minlength: 6
// // // //   },
// // // //   studentName: {
// // // //     type: String,
// // // //     required: true,
// // // //     trim: true
// // // //   },
// // // //   collegeName: {
// // // //     type: String,
// // // //     required: true,
// // // //     trim: true
// // // //   },
// // // //   deptName: {
// // // //     type: String,
// // // //     required: true,
// // // //     trim: true
// // // //   },
// // // //   deptId: {
// // // //     type: String,
// // // //     required: true,
// // // //     trim: true
// // // //   },
// // // //   email: {
// // // //     type: String,
// // // //     default: null,
// // // //     trim: true,
// // // //     lowercase: true
// // // //   },
// // // //   status: {
// // // //     type: String,
// // // //     enum: ['active', 'inactive', 'suspended'],
// // // //     default: 'active'
// // // //   },
// // // //   lastLogin: {
// // // //     type: Date,
// // // //     default: null
// // // //   }
// // // // }, {
// // // //   timestamps: true
// // // // });

// // // // // Hash password before saving
// // // // studentSchema.pre('save', async function(next) {
// // // //   if (!this.isModified('studentPassword')) return next();
  
// // // //   try {
// // // //     const salt = await bcrypt.genSalt(10);
// // // //     this.studentPassword = await bcrypt.hash(this.studentPassword, salt);
// // // //     next();
// // // //   } catch (error) {
// // // //     next(error);
// // // //   }
// // // // });

// // // // const Student = mongoose.model('Student', studentSchema);

// // // // // Sample student data
// // // // const sampleStudents = [
// // // //   {
// // // //     studentId: '123456789012',
// // // //     studentPassword: 'password123',
// // // //     studentName: 'Rahul Sharma',
// // // //     collegeName: 'Delhi University',
// // // //     deptName: 'Computer Science',
// // // //     deptId: 'CS001',
// // // //     email: 'rahul.sharma@du.ac.in'
// // // //   },
// // // //   {
// // // //     studentId: '234567890123',
// // // //     studentPassword: 'mypassword456',
// // // //     studentName: 'Priya Patel',
// // // //     collegeName: 'IIT Mumbai',
// // // //     deptName: 'Information Technology',
// // // //     deptId: 'IT002',
// // // //     email: 'priya.patel@iitb.ac.in'
// // // //   },
// // // //   {
// // // //     studentId: '345678901234',
// // // //     studentPassword: 'secure789',
// // // //     studentName: 'Arjun Kumar',
// // // //     collegeName: 'NIT Trichy',
// // // //     deptName: 'Electronics Engineering',
// // // //     deptId: 'EC003',
// // // //     email: 'arjun.kumar@nitt.edu'
// // // //   },
// // // //   {
// // // //     studentId: '456789012345',
// // // //     studentPassword: 'student2024',
// // // //     studentName: 'Sneha Gupta',
// // // //     collegeName: 'Jadavpur University',
// // // //     deptName: 'Mechanical Engineering',
// // // //     deptId: 'ME004',
// // // //     email: null // Email can be null initially
// // // //   },
// // // //   {
// // // //     studentId: '567890123456',
// // // //     studentPassword: 'demo123456',
// // // //     studentName: 'Vikram Singh',
// // // //     collegeName: 'Anna University',
// // // //     deptName: 'Civil Engineering',
// // // //     deptId: 'CE005',
// // // //     email: 'vikram.singh@annauniv.edu'
// // // //   }
// // // // ];

// // // // // Function to seed the database
// // // // async function seedDatabase() {
// // // //   try {
// // // //     // Connect to MongoDB
// // // //     console.log('🔄 Connecting to MongoDB...');
// // // //     await mongoose.connect(process.env.MONGODB_URI, {
// // // //       useNewUrlParser: true,
// // // //       useUnifiedTopology: true
// // // //     });
// // // //     console.log('✅ Connected to MongoDB Atlas');

// // // //     // Clear existing students (optional - remove if you want to keep existing data)
// // // //     console.log('🔄 Clearing existing students...');
// // // //     await Student.deleteMany({});
// // // //     console.log('✅ Existing students cleared');

// // // //     // Insert sample students
// // // //     console.log('🔄 Inserting sample students...');
    
// // // //     for (const studentData of sampleStudents) {
// // // //       const student = new Student(studentData);
// // // //       await student.save();
// // // //       console.log(`✅ Added student: ${student.studentName} (${student.studentId})`);
// // // //     }

// // // //     console.log('🎉 Sample data inserted successfully!');
// // // //     console.log('\n📋 Sample Login Credentials:');
// // // //     console.log('================================');
    
// // // //     sampleStudents.forEach((student, index) => {
// // // //       console.log(`${index + 1}. Student ID: ${student.studentId}`);
// // // //       console.log(`   Password: ${student.studentPassword}`);
// // // //       console.log(`   Name: ${student.studentName}`);
// // // //       console.log(`   College: ${student.collegeName}`);
// // // //       console.log('   -------------------------');
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('❌ Error seeding database:', error);
// // // //   } finally {
// // // //     // Close database connection
// // // //     await mongoose.connection.close();
// // // //     console.log('🔌 Database connection closed');
// // // //     process.exit(0);
// // // //   }
// // // // }

// // // // // Run the seed function
// // // // seedDatabase();

// // facultySeedData.js - Script to add sample faculty to MongoDB
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Faculty Schema (inline for this script)
// const facultySchema = new mongoose.Schema({
//   facultyId: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     index: true
//   },
//   facultyPassword: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   name: {
//     full: { type: String, required: true, trim: true },
//     first: { type: String, trim: true },
//     last: { type: String, trim: true }
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   designation: {
//     type: String,
//     required: true
//   },
//   department: {
//     type: String,
//     required: true
//   },
//   roles: {
//     type: [String],
//     default: []
//   },
//   expertise: {
//     type: [String],
//     default: []
//   },
//   status: {
//     type: String,
//     enum: ['active', 'inactive', 'suspended'],
//     default: 'active'
//   },
//   lastLogin: {
//     type: Date,
//     default: null
//   }
// }, {
//   timestamps: true
// });

// // Hash password before saving
// facultySchema.pre('save', async function(next) {
//   if (!this.isModified('facultyPassword')) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.facultyPassword = await bcrypt.hash(this.facultyPassword, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// const Faculty = mongoose.model('Faculty', facultySchema);

// // Sample faculty data
// const sampleFaculty = [
//   {
//     facultyId: 'FAC001',
//     facultyPassword: 'Password123',
//     name: { full: 'Dr. Arvind Sharma', first: 'Arvind', last: 'Sharma' },
//     email: 'arvind.sharma@university.edu',
//     designation: 'Professor',
//     department: 'Computer Science',
//     roles: ['HOD', 'Research Supervisor'],
//     expertise: ['Machine Learning', 'Distributed Systems']
//   },
//   {
//     facultyId: 'FAC002',
//     facultyPassword: 'SecurePass456',
//     name: { full: 'Prof. Neha Gupta', first: 'Neha', last: 'Gupta' },
//     email: 'neha.gupta@university.edu',
//     designation: 'Associate Professor',
//     department: 'Electronics',
//     roles: ['Faculty Advisor'],
//     expertise: ['VLSI Design', 'Embedded Systems']
//   },
//   {
//     facultyId: 'FAC003',
//     facultyPassword: 'MyPass789',
//     name: { full: 'Dr. Sameer Khan', first: 'Sameer', last: 'Khan' },
//     email: 'sameer.khan@university.edu',
//     designation: 'Assistant Professor',
//     department: 'Mechanical Engineering',
//     roles: ['Exam Coordinator'],
//     expertise: ['Robotics', 'Thermodynamics']
//   }
// ];

// // Function to seed the database
// async function seedDatabase() {
//   try {
//     // Connect to MongoDB
//     console.log('🔄 Connecting to MongoDB...');
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('✅ Connected to MongoDB Atlas');

//     // Clear existing faculty
//     console.log('🔄 Clearing existing faculty...');
//     await Faculty.deleteMany({});
//     console.log('✅ Existing faculty cleared');

//     // Insert sample faculty
//     console.log('🔄 Inserting sample faculty...');
//     for (const facultyData of sampleFaculty) {
//       const faculty = new Faculty(facultyData);
//       await faculty.save();
//       console.log(`✅ Added faculty: ${faculty.name.full} (${faculty.facultyId})`);
//     }

//     console.log('🎉 Sample faculty inserted successfully!');
//     console.log('\n📋 Sample Login Credentials:');
//     console.log('================================');
//     sampleFaculty.forEach((faculty, index) => {
//       console.log(`${index + 1}. Faculty ID: ${faculty.facultyId}`);
//       console.log(`   Password: ${faculty.facultyPassword}`);
//       console.log(`   Name: ${faculty.name.full}`);
//       console.log(`   Department: ${faculty.department}`);
//       console.log('   -------------------------');
//     });

//   } catch (error) {
//     console.error('❌ Error seeding database:', error);
//   } finally {
//     // Close connection
//     await mongoose.connection.close();
//     console.log('🔌 Database connection closed');
//     process.exit(0);
//   }
// }

// // Run the seed function
// seedDatabase();














































// // // seedData.js - Script to add sample students to MongoDB
// // import mongoose from 'mongoose';
// // import bcrypt from 'bcrypt';
// // import dotenv from 'dotenv';

// // // Load environment variables
// // dotenv.config();

// // // Student Schema (inline for this script)
// // const studentSchema = new mongoose.Schema({
// //   studentId: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     match: /^\d{12}$/,
// //     index: true
// //   },
// //   studentPassword: {
// //     type: String,
// //     required: true,
// //     minlength: 6
// //   },
// //   studentName: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   collegeName: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   deptName: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   deptId: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   email: {
// //     type: String,
// //     default: null,
// //     trim: true,
// //     lowercase: true
// //   },
// //   status: {
// //     type: String,
// //     enum: ['active', 'inactive', 'suspended'],
// //     default: 'active'
// //   },
// //   academicYear: {
// //     type: String,
// //     trim: true
// //   },
// //   semester: {
// //     type: String,
// //     trim: true
// //   },
// //   phoneNumber: {
// //     type: String,
// //     trim: true
// //   },
// //   lastLogin: {
// //     type: Date,
// //     default: null
// //   }
// // }, {
// //   timestamps: true
// // });

// // // Hash password before saving
// // studentSchema.pre('save', async function (next) {
// //   if (!this.isModified('studentPassword')) return next();
// //   try {
// //     const salt = await bcrypt.genSalt(10);
// //     this.studentPassword = await bcrypt.hash(this.studentPassword, salt);
// //     next();
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // const Student = mongoose.model('Student', studentSchema);

// // // Sample student data
// // const sampleStudents = [
// //   {
// //     studentId: '202400000001',
// //     studentPassword: 'Password123!',
// //     studentName: 'Aarav Mehta',
// //     collegeName: 'Vidyasetu College of Engineering',
// //     deptName: 'Computer Science',
// //     deptId: 'CSE01',
// //     email: 'aarav.mehta@example.com',
// //     status: 'active',
// //     academicYear: '2024-2025',
// //     semester: '5',
// //     phoneNumber: '9876543210',
// //     lastLogin: new Date('2025-09-01')
// //   },
// //   {
// //     studentId: '202400000002',
// //     studentPassword: 'SecurePass456',
// //     studentName: 'Priya Sharma',
// //     collegeName: 'Vidyasetu College of Engineering',
// //     deptName: 'Information Technology',
// //     deptId: 'IT01',
// //     email: 'priya.sharma@example.com',
// //     status: 'active',
// //     academicYear: '2023-2024',
// //     semester: '7',
// //     phoneNumber: '9876501234',
// //     lastLogin: new Date('2025-08-28')
// //   },
// //   {
// //     studentId: '202400000003',
// //     studentPassword: 'StrongPass789',
// //     studentName: 'Rohan Gupta',
// //     collegeName: 'Vidyasetu College of Business',
// //     deptName: 'Management',
// //     deptId: 'MGT01',
// //     email: 'rohan.gupta@example.com',
// //     status: 'inactive',
// //     academicYear: '2022-2023',
// //     semester: '3',
// //     phoneNumber: '9123456789',
// //     lastLogin: new Date('2025-07-15')
// //   },
// //   {
// //     studentId: '202400000004',
// //     studentPassword: 'MyPass111',
// //     studentName: 'Sneha Iyer',
// //     collegeName: 'Vidyasetu College of Arts',
// //     deptName: 'English Literature',
// //     deptId: 'ENG01',
// //     email: 'sneha.iyer@example.com',
// //     status: 'active',
// //     academicYear: '2024-2025',
// //     semester: '1',
// //     phoneNumber: '9988776655',
// //     lastLogin: new Date('2025-09-10')
// //   },
// //   {
// //     studentId: '202400000005',
// //     studentPassword: 'Pass@222',
// //     studentName: 'Kabir Verma',
// //     collegeName: 'Vidyasetu College of Science',
// //     deptName: 'Physics',
// //     deptId: 'PHY01',
// //     email: 'kabir.verma@example.com',
// //     status: 'suspended',
// //     academicYear: '2021-2022',
// //     semester: '6',
// //     phoneNumber: '9001122334',
// //     lastLogin: new Date('2025-06-22')
// //   },
// //   {
// //     studentId: '202400000006',
// //     studentPassword: 'Test@333',
// //     studentName: 'Ananya Roy',
// //     collegeName: 'Vidyasetu College of Engineering',
// //     deptName: 'Electronics',
// //     deptId: 'ECE01',
// //     email: 'ananya.roy@example.com',
// //     status: 'active',
// //     academicYear: '2023-2024',
// //     semester: '4',
// //     phoneNumber: '9554433221',
// //     lastLogin: new Date('2025-09-12')
// //   },
// //   {
// //     studentId: '202400000007',
// //     studentPassword: 'Welcome444',
// //     studentName: 'Devansh Patel',
// //     collegeName: 'Vidyasetu College of Engineering',
// //     deptName: 'Mechanical',
// //     deptId: 'MECH01',
// //     email: 'devansh.patel@example.com',
// //     status: 'active',
// //     academicYear: '2024-2025',
// //     semester: '2',
// //     phoneNumber: '9112233445',
// //     lastLogin: new Date('2025-09-05')
// //   }
// // ];

// // // Function to seed the database
// // async function seedDatabase() {
// //   try {
// //     // Connect to MongoDB
// //     console.log('🔄 Connecting to MongoDB...');
// //     await mongoose.connect(process.env.MONGODB_URI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true
// //     });
// //     console.log('✅ Connected to MongoDB Atlas');

// //     // Clear existing students (optional)
// //     console.log('🔄 Clearing existing students...');
// //     await Student.deleteMany({});
// //     console.log('✅ Existing students cleared');

// //     // Insert sample students
// //     console.log('🔄 Inserting sample students...');
// //     for (const studentData of sampleStudents) {
// //       const student = new Student(studentData);
// //       await student.save();
// //       console.log(`✅ Added student: ${student.studentName} (${student.studentId})`);
// //     }

// //     console.log('🎉 Sample data inserted successfully!');
// //     console.log('\n📋 Sample Login Credentials:');
// //     console.log('================================');

// //     sampleStudents.forEach((student, index) => {
// //       console.log(`${index + 1}. Student ID: ${student.studentId}`);
// //       console.log(`   Password: ${student.studentPassword}`);
// //       console.log(`   Name: ${student.studentName}`);
// //       console.log(`   College: ${student.collegeName}`);
// //       console.log('   -------------------------');
// //     });

// //   } catch (error) {
// //     console.error('❌ Error seeding database:', error);
// //   } finally {
// //     // Close database connection
// //     await mongoose.connection.close();
// //     console.log('🔌 Database connection closed');
// //     process.exit(0);
// //   }
// // }

// // // Run the seed function
// // seedDatabase();























// // adminSeedData.js - Script to add sample admins to MongoDB
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Admin Schema (inline for this script)
// const adminSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true, index: true },
//   email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//   passwordHash: { type: String, required: true, select: false },
//   role: {
//     type: String,
//     enum: ['superadmin', 'instituteAdmin', 'auditor'],
//     default: 'instituteAdmin',
//     required: true
//   },
//   instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },
//   instituteName: { type: String, trim: true },
//   designation: { type: String, trim: true },
//   employeeId: { type: String, unique: true, sparse: true, trim: true },
//   isActive: { type: Boolean, default: true },
//   lastLogin: { type: Date, default: null },
//   complianceAccess: {
//     nirf: { type: Boolean, default: true },
//     naac: { type: Boolean, default: true },
//     nba: { type: Boolean, default: true },
//     ugc: { type: Boolean, default: true },
//     aicte: { type: Boolean, default: false },
//     custom: [String]
//   },
//   reportGeneration: {
//     canGenerateReports: { type: Boolean, default: true },
//     reportTypes: {
//       type: [String],
//       default: ['nirf', 'naac', 'annual', 'academic']
//     },
//     lastReportGenerated: { type: Date, default: null },
//     reportsGeneratedCount: { type: Number, default: 0 }
//   },
//   phone: { type: String, trim: true },
//   metadata: {
//     joiningDate: Date,
//     qualification: String,
//     experience: Number,
//     specialization: [String]
//   }
// }, { timestamps: true });

// const Admin = mongoose.model('Admin', adminSchema);

// // Sample admin data
// const sampleAdmins = [
//   {
//     name: 'Global SuperAdmin',
//     email: 'superadmin@system.com',
//     password: 'SuperAdmin123!',
//     role: 'superadmin',
//     designation: 'System Owner',
//     isActive: true,
//     lastLogin: new Date(),
//     phone: '+919876543210',
//     metadata: {
//       joiningDate: new Date('2020-01-01'),
//       qualification: 'MBA',
//       experience: 15,
//       specialization: ['Governance', 'Compliance']
//     }
//   },
//   {
//     name: 'Dr. Priya Sharma',
//     email: 'priya.sharma@institute1.edu',
//     password: 'PriyaAdmin456',
//     role: 'instituteAdmin',
//     instituteId: new mongoose.Types.ObjectId(),
//     instituteName: 'Institute of Technology Delhi',
//     designation: 'Dean of Academics',
//     employeeId: 'EMP1001',
//     isActive: true,
//     lastLogin: new Date(),
//     complianceAccess: { nirf: true, naac: true, nba: false, ugc: true, aicte: false },
//     reportGeneration: { canGenerateReports: true, reportTypes: ['nirf', 'naac', 'annual'] },
//     phone: '9876501234',
//     metadata: {
//       joiningDate: new Date('2021-07-15'),
//       qualification: 'PhD',
//       experience: 12,
//       specialization: ['AI', 'Data Science']
//     }
//   },
//   {
//     name: 'Prof. Arjun Verma',
//     email: 'arjun.verma@institute2.edu',
//     password: 'ArjunAdmin789',
//     role: 'instituteAdmin',
//     instituteId: new mongoose.Types.ObjectId(),
//     instituteName: 'National College of Business',
//     designation: 'Head of Department',
//     employeeId: 'EMP2002',
//     isActive: true,
//     lastLogin: new Date(),
//     complianceAccess: { nirf: true, naac: false, nba: true, ugc: true, aicte: true },
//     reportGeneration: { canGenerateReports: true, reportTypes: ['nba', 'ugc', 'financial'] },
//     phone: '9123456789',
//     metadata: {
//       joiningDate: new Date('2019-03-10'),
//       qualification: 'M.Com',
//       experience: 10,
//       specialization: ['Finance', 'Audit']
//     }
//   },
//   {
//     name: 'Auditor Meena Rao',
//     email: 'meena.rao@audit.org',
//     password: 'AuditMeena001',
//     role: 'auditor',
//     designation: 'External Auditor',
//     isActive: true,
//     lastLogin: new Date(),
//     phone: '9988776655',
//     metadata: {
//       joiningDate: new Date('2022-09-05'),
//       qualification: 'CA',
//       experience: 8,
//       specialization: ['Auditing', 'NAAC Compliance']
//     }
//   }
// ];

// // Function to seed the database
// async function seedDatabase() {
//   try {
//     console.log('🔄 Connecting to MongoDB...');
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('✅ Connected to MongoDB Atlas');

//     console.log('🔄 Clearing existing admins...');
//     await Admin.deleteMany({});
//     console.log('✅ Existing admins cleared');

//     console.log('🔄 Inserting sample admins...');
//     for (const adminData of sampleAdmins) {
//       const { password, ...rest } = adminData;
//       const passwordHash = await bcrypt.hash(password, 10);
//       const admin = new Admin({ ...rest, passwordHash });
//       await admin.save();
//       console.log(`✅ Added admin: ${admin.name} (${admin.role})`);
//     }

//     console.log('🎉 Sample admins inserted successfully!');
//     console.log('\n📋 Sample Login Credentials:');
//     console.log('================================');
//     sampleAdmins.forEach((admin, index) => {
//       console.log(`${index + 1}. Email: ${admin.email}`);
//       console.log(`   Password: ${admin.password}`);
//       console.log(`   Role: ${admin.role}`);
//       console.log('   -------------------------');
//     });

//   } catch (error) {
//     console.error('❌ Error seeding database:', error);
//   } finally {
//     await mongoose.connection.close();
//     console.log('🔌 Database connection closed');
//     process.exit(0);
//   }
// }

// // Run the seed function
// seedDatabase();




















