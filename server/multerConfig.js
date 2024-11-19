const multer = require("multer");

// Store files in memory (Buffer)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
