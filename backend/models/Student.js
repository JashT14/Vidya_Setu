// // models/Student.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const studentSchema = new mongoose.Schema({
//   studentId: {
//     type: String,
//     required: true,
//     unique: true,
//     match: /^\d{12}$/,
//     index: true
//   },
//   studentPassword: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   studentName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   collegeName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   deptName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   deptId: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     default: null,
//     trim: true,
//     lowercase: true,
//     validate: {
//       validator: function(v) {
//         return v === null || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
//       },
//       message: 'Please enter a valid email'
//     }
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
// studentSchema.pre('save', async function(next) {
//   if (!this.isModified('studentPassword')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.studentPassword = await bcrypt.hash(this.studentPassword, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to check password
// studentSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.studentPassword);
// };

// // Remove password from JSON output
// studentSchema.methods.toJSON = function() {
//   const student = this.toObject();
//   delete student.studentPassword;
//   return student;
// };

// export default mongoose.model('Student', studentSchema);

//UPDATED STUDENT SCHEMA FOR INDEXABLE SEARCH RESULTS BY FACULTY
// models/Student.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{12}$/,
    index: true // Already indexed for unique lookups
  },
  studentPassword: {
    type: String,
    required: true,
    minlength: 6
  },
  studentName: {
    type: String,
    required: true,
    trim: true,
    // Add text index for fuzzy search capabilities
    index: 'text'
  },
  collegeName: {
    type: String,
    required: true,
    trim: true,
    // Index for filtering by college
    index: true
  },
  deptName: {
    type: String,
    required: true,
    trim: true,
    // Index for filtering by department
    index: true
  },
  deptId: {
    type: String,
    required: true,
    trim: true,
    // Index for department-based queries
    index: true
  },
  email: {
    type: String,
    default: null,
    trim: true,
    lowercase: true,
    // Add sparse index for email searches (sparse because it can be null)
    sparse: true,
    index: true,
    validate: {
      validator: function(v) {
        return v === null || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
    // Index for filtering by status
    index: true
  },
  lastLogin: {
    type: Date,
    default: null,
    // Index for sorting by last login date
    index: true
  },
  // Additional searchable fields that might be useful for faculty
  academicYear: {
    type: String,
    trim: true,
    index: true // For filtering by academic year
  },
  semester: {
    type: String,
    trim: true,
    index: true // For filtering by current semester
  },
  phoneNumber: {
    type: String,
    trim: true,
    sparse: true,
    index: true // For contact information searches
  },
  // Compound fields for better search performance
  fullSearchText: {
    type: String,
    // This will be populated automatically for full-text search
    select: false // Don't return this in queries by default
  }
}, {
  timestamps: true
});

// Compound indexes for common faculty search patterns
studentSchema.index({ deptId: 1, status: 1 }); // Search active students by department
studentSchema.index({ collegeName: 1, deptName: 1 }); // Search by college and department
studentSchema.index({ status: 1, lastLogin: -1 }); // Search active students by recent activity
studentSchema.index({ deptName: 1, academicYear: 1, semester: 1 }); // Academic filtering

// Text index for full-text search across multiple fields
studentSchema.index({
  studentName: 'text',
  studentId: 'text',
  email: 'text',
  phoneNumber: 'text'
}, {
  weights: {
    studentName: 10,    // Highest priority for name searches
    studentId: 5,       // Medium priority for ID searches
    email: 3,           // Lower priority for email
    phoneNumber: 1      // Lowest priority for phone
  },
  name: 'student_search_index'
});

// Pre-save middleware to populate search text
studentSchema.pre('save', async function(next) {
  // Hash password if modified
  if (this.isModified('studentPassword')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.studentPassword = await bcrypt.hash(this.studentPassword, salt);
    } catch (error) {
      return next(error);
    }
  }
  
  // Update full search text for better search performance
  const searchFields = [
    this.studentName,
    this.studentId,
    this.email,
    this.phoneNumber,
    this.deptName,
    this.collegeName
  ].filter(Boolean); // Remove null/undefined values
  
  this.fullSearchText = searchFields.join(' ').toLowerCase();
  
  next();
});

// Static method for faculty search functionality
studentSchema.statics.searchForFaculty = async function(searchQuery, filters = {}) {
  const {
    deptId,
    collegeName,
    deptName,
    status = 'active',
    academicYear,
    semester,
    limit = 50,
    skip = 0,
    sortBy = 'studentName',
    sortOrder = 1
  } = filters;

  let query = {};
  
  // Add filters
  if (deptId) query.deptId = deptId;
  if (collegeName) query.collegeName = new RegExp(collegeName, 'i');
  if (deptName) query.deptName = new RegExp(deptName, 'i');
  if (status) query.status = status;
  if (academicYear) query.academicYear = academicYear;
  if (semester) query.semester = semester;

  // Add search functionality
  if (searchQuery && searchQuery.trim()) {
    // Use MongoDB text search for better performance
    query.$text = { $search: searchQuery };
  }

  const sortOptions = {};
  sortOptions[sortBy] = sortOrder;
  
  // Add text score for relevance sorting when using text search
  if (query.$text) {
    sortOptions.score = { $meta: 'textScore' };
  }

  return await this.find(query)
    .select('-studentPassword -fullSearchText') // Exclude sensitive fields
    .sort(sortOptions)
    .limit(limit)
    .skip(skip)
    .lean(); // Return plain objects for better performance
};

// Static method for advanced faculty analytics
studentSchema.statics.getFacultyAnalytics = async function(filters = {}) {
  const { deptId, collegeName, deptName } = filters;
  
  let matchStage = {};
  if (deptId) matchStage.deptId = deptId;
  if (collegeName) matchStage.collegeName = collegeName;
  if (deptName) matchStage.deptName = deptName;

  return await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        lastLoginAvg: { $avg: '$lastLogin' }
      }
    }
  ]);
};

// Method to check password
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.studentPassword);
};

// Remove password from JSON output
studentSchema.methods.toJSON = function() {
  const student = this.toObject();
  delete student.studentPassword;
  delete student.fullSearchText; // Also remove search text from JSON
  return student;
};

/* 
 * REDIS INTEGRATION COMMENTS:
 * 
 * If Redis is added to your application, consider these optimizations:
 * 
 * 1. CACHING SEARCH RESULTS:
 *    - Cache frequently searched queries with Redis
 *    - Key pattern: "student_search:{hash_of_query_and_filters}"
 *    - TTL: 5-15 minutes depending on data freshness requirements
 * 
 * 2. CACHING DEPARTMENT LISTS:
 *    - Cache department-wise student lists: "dept_students:{deptId}"
 *    - Update cache when students are added/removed from departments
 * 
 * 3. REAL-TIME SEARCH SUGGESTIONS:
 *    - Cache student names in Redis Sets for autocomplete: "student_names"
 *    - Use Redis SCAN for typeahead functionality
 * 
 * 4. SESSION-BASED RECENT SEARCHES:
 *    - Store faculty's recent searches: "faculty_recent:{facultyId}"
 *    - Implement search history and quick filters
 * 
 * 5. ANALYTICS CACHING:
 *    - Cache department analytics: "dept_analytics:{deptId}:{date}"
 *    - Refresh daily or when significant changes occur
 * 
 * Example Redis integration methods to add:
 * 
 * studentSchema.statics.searchWithCache = async function(searchQuery, filters, cacheKey) {
 *   const cached = await redis.get(cacheKey);
 *   if (cached) return JSON.parse(cached);
 *   
 *   const results = await this.searchForFaculty(searchQuery, filters);
 *   await redis.setex(cacheKey, 300, JSON.stringify(results)); // 5 min TTL
 *   return results;
 * };
 * 
 * studentSchema.post('save', async function() {
 *   // Invalidate relevant caches when student data changes
 *   await redis.del(`dept_students:${this.deptId}`);
 *   await redis.del('student_names');
 * });
 */

export default mongoose.model('Student', studentSchema);