const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Optimized storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'test-recordings',
    resource_type: 'video',
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    // Optimization settings
    transformation: [
      {
        video_codec: 'h264',
        audio_codec: 'aac',
        quality: 'auto:good', // Auto-optimize quality vs file size
        format: 'mp4' // More compatible format
      }
    ],
    // Upload settings for better performance
    chunk_size: 6000000, // 6MB chunks for large files
    timeout: 300000, // 5 minute timeout
  }),
});

// Enhanced upload configuration
const upload = multer({ 
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept video files only
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'), false);
    }
  }
});
module.exports=upload