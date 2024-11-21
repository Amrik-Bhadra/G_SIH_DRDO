const multer = require("multer");
const path = require("path");
const fs = require("fs");

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }
var uploadDir;

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.body.role == "Candidate"){
           uploadDir = path.join(__dirname,"../uploads/Candidate/Resume");
        }else if(req.body.role == "Expert"){
           uploadDir = path.join(__dirname,"../uploads/Expert/Resume");
        }
        cb(null, uploadDir); // Files are saved to the "uploads" folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    // Accept only specific file types (e.g., PDF, DOCX)
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF and DOCX files are allowed"));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter,
});

module.exports = upload;
