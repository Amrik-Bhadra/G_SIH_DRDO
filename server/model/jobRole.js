const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  domainDepartment: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  keyResponsibilities: {
    type: [String], // Optional: Array of responsibilities
  },
  boardOfSubjectDocument: {
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
  },
  minimumQualifications: {
    type: [String], // Array of qualifications
  },
  yearsOfExperience:{
    type: Number,
    required: true
  },
  preferredSkills: {
    type: [String], // Array of skills
  },
});

module.exports = mongoose.model("Job",JobSchema);