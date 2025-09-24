// models/Document.js
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      ref: "Student",
      index: true,
    },

    // GridFS reference
    fileId: {
      type: mongoose.Schema.Types.ObjectId, // GridFS file _id
      required: true,
      index: true,
    },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number },

    // Metadata
    category: {
      type: String,
      enum: [
    "Academic Records", "Certificates", "Work Experience", "Competitions", "Skill Development", "Projects", "Other"],
      required: true,
      index: true,
    },
    institution: { type: String, required: true, trim: true, index: true },
    description: { type: String, trim: true },
    dateCompleted: { type: Date, required: true },
    education: { type: String, trim: true },
    credentialLink: { type: String, default: null },

    // Workflow status
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      index: true,
    },
    reviewedBy: {
      type: String,
      ref: "Faculty",
      default: null,
      index: true,
    },
    reviewDate: { type: Date, default: null },
    rejectionReason: { type: String, default: null },
  },
  { timestamps: true }
);

// Ensure Certificates always have a credentialLink
documentSchema.pre("save", function (next) {
  if (this.category === "Certificates" && !this.credentialLink) {
    return next(new Error("credentialLink is required for Certificates category"));
  }
  next();
});

// Index optimization
documentSchema.index({ studentId: 1, status: 1 });
documentSchema.index({ category: 1, status: 1 });
documentSchema.index({ reviewedBy: 1 });

export default mongoose.model("Document", documentSchema);
