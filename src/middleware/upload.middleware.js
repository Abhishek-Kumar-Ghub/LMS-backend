import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Only video files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

const videoUpload = upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'videoFile', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]);

export { upload, videoUpload };
export default upload;