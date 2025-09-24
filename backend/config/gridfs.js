// config/gridfs.js
import mongoose from "mongoose";
import multer from "multer";

// GridFS bucket - will be initialized when MongoDB connects
let gfsBucket;

// Initialize GridFS bucket
const initializeGridFS = () => {
  if (mongoose.connection.readyState === 1) {
    gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "documents",
    });
    console.log("✅ GridFS bucket initialized successfully");
    return gfsBucket;
  }
  return null;
};

// Listen for MongoDB connection
mongoose.connection.once("open", () => {
  initializeGridFS();
});

// Get GridFS bucket instance
const getGridFSBucket = () => {
  if (!gfsBucket) {
    gfsBucket = initializeGridFS();
  }
  return gfsBucket;
};

// Memory storage for multer (we'll handle GridFS upload manually)
const storage = multer.memoryStorage();

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "image/jpeg",
    "image/jpg", 
    "image/png",
    "text/plain",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG, TXT files are allowed."));
  }
};

// Multer configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1, // Only 1 file at a time
  },
  fileFilter,
});

// Function to upload file to GridFS
const uploadToGridFS = (buffer, filename, contentType, metadata = {}) => {
  return new Promise((resolve, reject) => {
    const bucket = getGridFSBucket();
    
    if (!bucket) {
      return reject(new Error("GridFS bucket not initialized"));
    }

    const uploadStream = bucket.openUploadStream(filename, {
      contentType,
      metadata: {
        ...metadata,
        uploadDate: new Date(),
      },
    });

    // uploadStream.on('error', reject);
    // uploadStream.on('finish', (file) => {
    //   resolve({
    //     id: file._id,
    //     filename: file.filename,
    //     contentType: file.contentType || contentType,
    //     size: file.length,
    //     uploadDate: file.uploadDate,
    //     metadata: file.metadata,
    //   });
    // });

    // Fix: Use 'finish' event differently - file info is in uploadStream
    uploadStream.on('finish', () => {
      resolve({
        id: uploadStream.id, // Use uploadStream.id instead of file._id
        filename: uploadStream.filename,
        contentType: contentType,
        size: uploadStream.length,
        uploadDate: new Date(),
        metadata: metadata,
      });
    });

    // Write buffer to GridFS
    uploadStream.end(buffer);
  });
};

// Function to download file from GridFS
const downloadFromGridFS = (fileId) => {
  return new Promise((resolve, reject) => {
    const bucket = getGridFSBucket();
    
    if (!bucket) {
      return reject(new Error("GridFS bucket not initialized"));
    }

    // Check if file exists first
    bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray((err, files) => {
      if (err) return reject(err);
      if (!files || files.length === 0) {
        return reject(new Error("File not found"));
      }

      const file = files[0];
      const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
      
      resolve({
        stream: downloadStream,
        file: file,
      });
    });
  });
};

// Function to delete file from GridFS
const deleteFromGridFS = async (fileId) => {
  const bucket = getGridFSBucket();
  
  if (!bucket) {
    throw new Error("GridFS bucket not initialized");
  }

  try {
    await bucket.delete(new mongoose.Types.ObjectId(fileId));
    return true;
  } catch (error) {
    console.error("GridFS delete error:", error);
    throw error;
  }
};

// Function to check if file exists in GridFS
const fileExistsInGridFS = async (fileId) => {
  const bucket = getGridFSBucket();
  
  if (!bucket) {
    throw new Error("GridFS bucket not initialized");
  }

  try {
    const files = await bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
    return files && files.length > 0;
  } catch (error) {
    console.error("GridFS file check error:", error);
    return false;
  }
};

// Function to get file info from GridFS
const getFileInfo = async (fileId) => {
  const bucket = getGridFSBucket();
  
  if (!bucket) {
    throw new Error("GridFS bucket not initialized");
  }

  try {
    const files = await bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
    return files && files.length > 0 ? files[0] : null;
  } catch (error) {
    console.error("GridFS file info error:", error);
    throw error;
  }
};

// Utility function to get storage statistics
const getStorageStats = async () => {
  try {
    const bucket = getGridFSBucket();
    if (!bucket) {
      throw new Error("GridFS bucket not initialized");
    }

    const db = mongoose.connection.db;
    
    // Get files and chunks collection stats
    const filesStats = await db.collection("documents.files").stats().catch(() => ({ count: 0, size: 0 }));
    const chunksStats = await db.collection("documents.chunks").stats().catch(() => ({ count: 0, size: 0 }));
    
    return {
      totalFiles: filesStats.count || 0,
      totalChunks: chunksStats.count || 0,
      filesSize: filesStats.size || 0,
      chunksSize: chunksStats.size || 0,
      totalSize: (filesStats.size || 0) + (chunksStats.size || 0),
      avgFileSize: filesStats.count > 0 ? Math.round((filesStats.size || 0) / filesStats.count) : 0,
    };
  } catch (error) {
    console.error("Failed to get storage stats:", error);
    throw error;
  }
};

// Function to cleanup orphaned files
const cleanupOrphanedFiles = async () => {
  try {
    const bucket = getGridFSBucket();
    if (!bucket) {
      throw new Error("GridFS bucket not initialized");
    }

    // Import Document model
    const Document = mongoose.model("Document");
    
    // Get all fileIds from documents collection
    const documentFileIds = await Document.distinct("fileId");
    const documentFileIdStrings = documentFileIds.map(id => id.toString());
    
    // Get all files from GridFS
    const gridfsFiles = await bucket.find({}).toArray();
    
    // Find orphaned files
    const orphanedFiles = gridfsFiles.filter(file => 
      !documentFileIdStrings.includes(file._id.toString())
    );
    
    // Delete orphaned files
    let deletedCount = 0;
    for (const file of orphanedFiles) {
      try {
        await bucket.delete(file._id);
        console.log(`🗑️ Deleted orphaned file: ${file.filename}`);
        deletedCount++;
      } catch (error) {
        console.error(`❌ Failed to delete file ${file.filename}:`, error);
      }
    }
    
    console.log(`✅ Cleanup completed. Deleted ${deletedCount} orphaned files`);
    return deletedCount;
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
    throw error;
  }
};

export {
  upload,
  uploadToGridFS,
  downloadFromGridFS,
  deleteFromGridFS,
  fileExistsInGridFS,
  getFileInfo,
  getStorageStats,
  cleanupOrphanedFiles,
  getGridFSBucket,
};