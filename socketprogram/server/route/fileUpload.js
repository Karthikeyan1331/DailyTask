const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../', 'public/sendingFiles'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname.replace(path.extname(file.originalname), '') + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Multer upload configuration
const upload = multer({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB file size limit
    },
});

module.exports = upload;
