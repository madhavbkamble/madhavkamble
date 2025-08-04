const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/videos"); // Folder for storing videos
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname)); // Add extension
    }
});

// File filter for videos
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["video/mp4", "video/mkv", "video/avi", "video/mov"];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid video format. Only mp4, mkv, avi, mov allowed."), false);
    }
};

// Multer configuration
const videoUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // 100 MB max
});

module.exports = videoUpload;
