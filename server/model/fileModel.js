const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,  // Required validation for filename
    },
    fileType: {
        type: String,
        required: true,  // Required validation for file type
    },
    data: {
        type: Buffer,
        required: true,  // Store file data in binary format
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
