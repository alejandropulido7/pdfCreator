const multer  = require('multer');

const uploadFile = (filetype) => {

    const destination = `app/public/uploads/${filetype}`;

    const storage = multer.diskStorage({
        destination,
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });

    return multer({ 
        storage: storage,
        dest: destination,
        limits: {files: 1},
        fileFilter: (req, file, cb) => {
            let type = file.mimetype.endsWith('pdf') || file.mimetype.startsWith('image');
            type?cb(null, true):cb(new Error('file type not allow'))
        }
    });
}

module.exports = {uploadFile};