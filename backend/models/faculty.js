// models/faculty.js
import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    faculty_id: {
      type: String,
      required: true,
      unique: true,
      index: true, // fast lookup
    },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
      full: { type: String, required: true }, // full name for search
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // fast login/notifications
      lowercase: true,
      trim: true,
    },
    facultyPassword: {
      type: String,
      required: true,
      minlength: 6, // basic security check
      select: false, // exclude by default from queries
    },
    phone: {
      code: { type: String, default: "+91" },
      number: { type: String, required: true },
    },
    designation: {
      type: String,
      enum: [
        "Lecturer",
        "Assistant Professor",
        "Associate Professor",
        "Professor",
        "HOD",
        "Dean",
      ],
      required: true,
      index: true,
    },
    department: {
      code: { type: String, required: true, index: true },
      name: { type: String, required: true },
    },
    roles: {
      type: [String],
      enum: ["faculty", "mentor", "hod", "admin", "verifier"],
      default: ["faculty"],
      index: true,
    },
    expertise: {
      type: [String],
      index: true,
    },
  },
  { timestamps: true }
);

/**
 * 📌 Index Optimizations
 */
// Full-text search on name + expertise
facultySchema.index({ "name.full": "text", expertise: "text" });

// Compound index for listing within department
facultySchema.index({ "department.code": 1, designation: 1 });

export default mongoose.model("Faculty", facultySchema);
