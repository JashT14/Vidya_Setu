import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  // Basic Information
  name: { 
    type: String, 
    required: [true, 'Admin name is required'],
    trim: true,
    index: true // For efficient name-based queries
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  passwordHash: { 
    type: String, 
    required: [true, 'Password hash is required'],
    select: false // Exclude from queries by default for security
  },
  
  // Role and Permissions
  role: {
    type: String,
    enum: {
      values: ["superadmin", "instituteAdmin", "auditor"],
      message: '{VALUE} is not a valid role'
    },
    default: "instituteAdmin",
    required: true,
    index: true // For role-based queries
  },
  
  // Institutional Relationships - Critical for accreditation mapping
  instituteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Institute",
    required: function() {
      return this.role !== 'superadmin';
    },
    index: true // Critical for institute-based queries
  },
  instituteName: {
    type: String,
    // Denormalized field for efficient querying without population
    index: true
  },
  
  // Professional Information
  designation: { 
    type: String,
    trim: true,
    index: true // For designation-based reports
  },
  employeeId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values while maintaining uniqueness
    trim: true,
    index: true
  },
  
  // Status and Activity Tracking
  isActive: { 
    type: Boolean, 
    default: true,
    index: true // For filtering active/inactive users
  },
  lastLogin: { 
    type: Date,
    index: true // For activity reports
  },
  
  // Compliance and Audit Management - Core feature for Institute Admins
  complianceAccess: {
    nirf: { type: Boolean, default: true }, // NIRF ranking access
    naac: { type: Boolean, default: true }, // NAAC accreditation access
    nba: { type: Boolean, default: true },  // NBA accreditation access
    ugc: { type: Boolean, default: true },  // UGC compliance access
    aicte: { type: Boolean, default: false }, // AICTE (for technical institutions)
    custom: [String] // Custom compliance frameworks
  },
  
  reportGeneration: {
    canGenerateReports: { type: Boolean, default: true },
    reportTypes: {
      type: [String],
      enum: ["nirf", "naac", "nba", "ugc", "aicte", "annual", "financial", "academic"],
      default: ["nirf", "naac", "annual", "academic"]
    },
    lastReportGenerated: {
      type: Date,
      index: true
    },
    reportsGeneratedCount: { type: Number, default: 0 }
  },
  certifications: [{
    name: String,
    issuingBody: String,
    issueDate: Date,
    expiryDate: Date,
    certificateNumber: String
  }],
  
  // Audit Trail Fields
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  
  // Contact Information
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  
  // Additional metadata for reporting
  metadata: {
    joiningDate: Date,
    qualification: String,
    experience: Number, // in years
    specialization: [String]
  }
}, { 
  timestamps: true,
  // Enable versioning for audit trails
  versionKey: '__v'
});

// Compound Indexes for efficient querying
adminSchema.index({ instituteId: 1, role: 1 }); // Institute admins by role
adminSchema.index({ instituteId: 1, isActive: 1 }); // Active users by institute
adminSchema.index({ instituteName: 1, 'complianceAccess.nirf': 1 }); // NIRF authorized admins
adminSchema.index({ instituteName: 1, 'complianceAccess.naac': 1 }); // NAAC authorized admins
adminSchema.index({ role: 1, 'reportGeneration.canGenerateReports': 1 }); // Report generation access
adminSchema.index({ createdAt: 1, instituteId: 1 }); // Time-based institute queries
adminSchema.index({ 'reportGeneration.lastReportGenerated': 1, instituteId: 1 }); // Report activity tracking

// Virtual for compliance summary
adminSchema.virtual('complianceSummary').get(function() {
  const activeCompliance = [];
  if (this.complianceAccess.nirf) activeCompliance.push('NIRF');
  if (this.complianceAccess.naac) activeCompliance.push('NAAC');
  if (this.complianceAccess.nba) activeCompliance.push('NBA');
  if (this.complianceAccess.ugc) activeCompliance.push('UGC');
  if (this.complianceAccess.aicte) activeCompliance.push('AICTE');
  return activeCompliance.join(', ');
});

// Instance method to check compliance access
adminSchema.methods.hasComplianceAccess = function(complianceType) {
  return this.complianceAccess[complianceType?.toLowerCase()] === true;
};

// Instance method to check report generation capability
adminSchema.methods.canGenerateReport = function(reportType) {
  return this.reportGeneration.canGenerateReports && 
         this.reportGeneration.reportTypes.includes(reportType?.toLowerCase());
};

// Static method for compliance report generation
adminSchema.statics.findComplianceAdmins = function(instituteId, complianceType) {
  const filter = {
    instituteId,
    isActive: true,
    role: 'instituteAdmin'
  };
  
  if (complianceType) {
    filter[`complianceAccess.${complianceType.toLowerCase()}`] = true;
  }
  
  return this.find(filter).select('name email instituteName complianceAccess reportGeneration designation');
};

// Static method for audit-ready admin summary
adminSchema.statics.getAuditReadySummary = function(instituteId) {
  return this.aggregate([
    {
      $match: { 
        instituteId: new mongoose.Types.ObjectId(instituteId),
        isActive: true 
      }
    },
    {
      $project: {
        name: 1,
        email: 1,
        role: 1,
        instituteName: 1,
        designation: 1,
        complianceAccess: 1,
        reportGeneration: 1,
        lastLogin: 1,
        createdAt: 1,
        complianceCount: {
          $add: [
            { $cond: ['$complianceAccess.nirf', 1, 0] },
            { $cond: ['$complianceAccess.naac', 1, 0] },
            { $cond: ['$complianceAccess.nba', 1, 0] },
            { $cond: ['$complianceAccess.ugc', 1, 0] },
            { $cond: ['$complianceAccess.aicte', 1, 0] }
          ]
        }
      }
    },
    {
      $sort: { complianceCount: -1, name: 1 }
    }
  ]);
};

// Static method for generating compliance summary reports
adminSchema.statics.getComplianceSummaryByInstitute = function() {
  return this.aggregate([
    {
      $match: { isActive: true, role: 'instituteAdmin' }
    },
    {
      $group: {
        _id: '$instituteName',
        totalAdmins: { $sum: 1 },
        nirfAuthorized: {
          $sum: { $cond: ['$complianceAccess.nirf', 1, 0] }
        },
        naacAuthorized: {
          $sum: { $cond: ['$complianceAccess.naac', 1, 0] }
        },
        nbaAuthorized: {
          $sum: { $cond: ['$complianceAccess.nba', 1, 0] }
        },
        ugcAuthorized: {
          $sum: { $cond: ['$complianceAccess.ugc', 1, 0] }
        },
        aicteAuthorized: {
          $sum: { $cond: ['$complianceAccess.aicte', 1, 0] }
        },
        reportGenerators: {
          $sum: { $cond: ['$reportGeneration.canGenerateReports', 1, 0] }
        },
        totalReportsGenerated: {
          $sum: '$reportGeneration.reportsGeneratedCount'
        },
        lastReportActivity: {
          $max: '$reportGeneration.lastReportGenerated'
        },
        admins: {
          $push: {
            name: '$name',
            email: '$email',
            designation: '$designation',
            complianceAccess: '$complianceAccess',
            canGenerateReports: '$reportGeneration.canGenerateReports',
            lastLogin: '$lastLogin'
          }
        }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ]);
};

// Pre-save middleware to maintain denormalized fields and track report generation
adminSchema.pre('save', async function(next) {
  if (this.isModified('instituteId') && this.instituteId) {
    try {
      const institute = await mongoose.model('Institute').findById(this.instituteId).select('name');
      if (institute) {
        this.instituteName = institute.name;
      }
    } catch (error) {
      console.error('Error fetching institute name:', error);
    }
  }
  
  // Auto-enable report generation for institute admins
  if (this.role === 'instituteAdmin' && !this.reportGeneration.canGenerateReports) {
    this.reportGeneration.canGenerateReports = true;
  }
  
  next();
});

export default mongoose.model("Admin", adminSchema);