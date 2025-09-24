// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import GridFS utilities
import { getStorageStats, cleanupOrphanedFiles } from './config/gridfs.js';

console.log('🚀 Starting Vidya Setu Server...');
console.log('📁 Current working directory:', process.cwd());
console.log('🔧 Node version:', process.version);

// Load environment variables
console.log('🔄 Loading environment variables...');
dotenv.config();
console.log('✅ Environment variables loaded');

// Check if critical env variables are present
console.log('🔍 Checking environment variables:');
console.log('   - MONGODB_URI:', process.env.MONGODB_URI ? '✅ Present' : '❌ Missing');
console.log('   - JWT_SECRET:', process.env.JWT_SECRET ? '✅ Present' : '❌ Missing');
console.log('   - PORT:', process.env.PORT || '5000 (default)');
console.log('   - NODE_ENV:', process.env.NODE_ENV || 'development (default)');
console.log('   - ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS || 'http://localhost:3000 (default)');

const app = express();
console.log('✅ Express app created');

// Middleware Setup
console.log('🔄 Setting up middleware...');

// CORS Middleware
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
};
console.log('🌐 CORS origins allowed:', corsOptions.origin);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`📥 [${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
  
  // // Log request body for POST/PUT requests (exclude sensitive data)
  // if ((req.method === 'POST' || req.method === 'PUT') && req.path !== '/api/auth/student-login') {
  //   console.log('📦 Request Body:', req.body);
  // } else if (req.path === '/api/auth/student-login') {
  //   console.log('📦 Login Request Body:', { 
  //     studentId: req.body?.studentId, 
  //     password: req.body?.password ? '[HIDDEN]' : 'Not provided' 
  //   });
  // }

if ((req.method === 'POST' || req.method === 'PUT') && !req.path.includes('login')) {
  console.log('📦 Request Body:', req.body);
} else if (
  req.path === '/api/auth/student-login' ||
  req.path === '/api/auth/faculty-login' ||
  req.path === '/api/auth/admin-login'
) {
  console.log('📦 Login Request Body:', {
    id: req.body?.studentId || req.body?.facultyId || req.body?.adminId,
    password: req.body?.password ? '[HIDDEN]' : 'Not provided'
  });
} else {
  console.log('Error at THIS POINT - CODE5572');
}

  
  next();
});

app.use(express.json());
console.log('✅ JSON parser middleware added');

app.use(express.urlencoded({ extended: true }));
console.log('✅ URL-encoded parser middleware added');

console.log('✅ All middleware setup complete');


// MongoDB Connection
console.log('🔄 Connecting to MongoDB...');
console.log('🔗 MongoDB URI:', process.env.MONGODB_URI?.replace(/\/\/.*@/, '//[CREDENTIALS_HIDDEN]@') || 'Not provided');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas successfully');
  console.log('📊 Database name:', mongoose.connection.name);
  console.log('🏠 Database host:', mongoose.connection.host);
  // Initialize GridFS after MongoDB connection
  console.log('🔄 Initializing GridFS...');
  try {
    // GridFS will be initialized automatically through the connection event
    console.log('✅ GridFS initialization setup complete');
  } catch (error) {
    console.error('❌ GridFS initialization error:', error);
  }
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  console.error('🔍 Full error details:', error);
  process.exit(1);
});

// MongoDB connection event listeners
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
});

// Error handling middleware for file uploads
app.use((error, req, res, next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size allowed is 10MB.'
    });
  }
  
  if (error.message && error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  if (error.type === 'entity.too.large') {
    return res.status(400).json({
      success: false,
      message: 'Request entity too large'
    });
  }
  
  next(error);
});

// Routes Setup
console.log('🔄 Setting up routes...');



// Import and use auth routes
try {
  const authRoutes = await import('./routes/auth.js');
  app.use('/api/auth', authRoutes.default);
  console.log('✅ Auth routes loaded and mounted at /api/auth');
} catch (error) {
  console.error('❌ Error loading auth routes:', error.message);
  console.error('🔍 Auth routes error details:', error);
}

try {
  const documentRoutes = await import('./routes/documents.js');
  app.use('/api/documents', documentRoutes.default);
  console.log('✅ Document routes loaded and mounted at /api/documents');
} catch (error) {
  console.error('❌ Error loading document routes:', error.message);
  console.error('🔍 Document routes error details:', error);
}

// Health check route
// Health check route
app.get('/api/health', async (req, res) => {
  console.log('🏥 Health check requested');
  
  let gridfsStatus = 'unknown';
  let storageStats = null;
  
  try {
    storageStats = await getStorageStats();
    gridfsStatus = 'healthy';
  } catch (error) {
    gridfsStatus = 'error';
    console.error('GridFS health check failed:', error);
  }
  
  const healthData = {
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    mongoStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    gridfsStatus,
    storage: storageStats
  };
  
  console.log('📊 Health check response:', {
    ...healthData,
    memory: 'Memory usage logged separately'
  });
  console.log('💾 Memory usage:', healthData.memory);
  
  res.json(healthData);
});

console.log('✅ Health check route added at /api/health');

// Test route for debugging
app.get('/api/test', (req, res) => {
  console.log('🧪 Test route accessed');
  res.json({
    success: true,
    message: 'Test route working',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

console.log('✅ Test route added at /api/test');

// Admin endpoint for storage cleanup (protect this route!)
app.post('/api/admin/cleanup', async (req, res) => {
  try {
    console.log('🧹 Manual cleanup requested');
    const deletedCount = await cleanupOrphanedFiles();
    
    res.json({
      success: true,
      message: `Cleanup completed. Deleted ${deletedCount} orphaned files.`,
      deletedCount,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      success: false,
      message: 'Cleanup failed',
      error: error.message,
    });
  }
});

// Admin endpoint for storage statistics
app.get('/api/admin/storage-stats', async (req, res) => {
  try {
    console.log('📊 Storage stats requested');
    const stats = await getStorageStats();
    
    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Storage stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get storage statistics',
      error: error.message,
    });
  }
});

// // List all registered routes
// console.log('📋 Registered routes:');
// app._router.stack.forEach((middleware) => {
//   if (middleware.route) {
//     console.log(`   ${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
//   } else if (middleware.name === 'router') {
//     middleware.handle.stack.forEach((handler) => {
//       if (handler.route) {
//         console.log(`   ${Object.keys(handler.route.methods).join(', ').toUpperCase()} ${middleware.regexp.source.replace('\\', '').replace('(?:', '').replace('$', '')}${handler.route.path}`);
//       }
//     });
//   }
// });

// Catch-all for unknown routes
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
  console.log(`🔍 Available routes: GET /api/health, GET /api/test, POST /api/auth/student-login`);
  
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedPath: req.path,
    method: req.method,
    availableRoutes: [
      'GET /api/health',
      'GET /api/test', 
      'POST /api/auth/student-login',
      'POST /api/auth/faculty-login',
      'GET /api/auth/student-profile',
      'GET /api/auth/faculty-profile',
      'PUT /api/auth/update-details',
      'GET /api/auth/verify-token',
      'POST /api/documents/upload',
      'GET /api/documents/my',
      'GET /api/documents/all',
      'GET /api/documents/:documentId/download',
      'GET /api/documents/stats/overview'
    ]
  });
});

console.log('✅ 404 handler added');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Server Error occurred:');
  console.error('🔍 Error message:', err.message);
  console.error('📍 Error stack:', err.stack);
  console.error('🌐 Request details:', {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers
  });
  
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

console.log('✅ Error handling middleware added');

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('\n🎉 ================================');
  console.log('🚀 Vidya Setu Server Started!');
  console.log('🎉 ================================');
  console.log(`📡 Server running on port: ${PORT}`);
  console.log(`🌍 Server URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test Route: http://localhost:${PORT}/api/test`);
  console.log(`🔐 Auth Login: http://localhost:${PORT}/api/auth/student-login`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Process ID: ${process.pid}`);
  console.log('🎉 ================================\n');
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ HTTP server closed');
    mongoose.connection.close(() => {
      console.log('✅ MongoDB connection closed');
      console.log('👋 Server shutdown complete');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('\n📴 SIGINT received (Ctrl+C), shutting down gracefully...');
  server.close(() => {
    console.log('✅ HTTP server closed');
    mongoose.connection.close(() => {
      console.log('✅ MongoDB connection closed');
      console.log('👋 Server shutdown complete');
      process.exit(0);
    });
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  console.error('🔍 Stack trace:', error.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Promise Rejection at:', promise);
  console.error('🔍 Reason:', reason);
  process.exit(1);
});

export default app;