const express = require("express");
const { uploadFile, getFile } = require("../controllers/fileController");
const upload = require("../multerConfig");

const router = express.Router();

// Route to upload file
router.post("/upload", upload.single("file"), uploadFile);

// Route to get file by ID
router.get("/:id", getFile);

module.exports = router;
