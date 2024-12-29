const mongoose = require("mongoose");
const Candidate = require("../../model/candidate");
const Application = require("../../model/application");
const Jobs = require("../../model/jobRole");
const Panel = require("../../model/panel")
const asyncHandler = require("express-async-handler");

//http://localhost:8000/api/candidate/dashboard
const dashboardDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;

        // Validate if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid candidate ID format",
            });
        }

        // Fetch the candidate details
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        // Fetch all panels where this candidate exists
        const panels = await Panel.find(
            { "candidates.candidateID": id },  // Find panels where this candidate exists
            { jobID: 1, _id: 0 }  // Only return the jobID field (exclude _id)
        );

        // Check if the panels array is empty
        if (panels.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No panels found for the candidate",
            });
        }

        // Extract jobIDs from panels
        const jobIDs = panels.map(panel => panel.jobID);

        // Fetch job details for all jobIDs
        const jobs = await Jobs.find({ _id: { $in: jobIDs } });

        // Send the response with candidate, jobIDs, and job details
        res.status(200).json({
            success: true,
            candidate,
            jobIDs,  
            jobs,    
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});




//http://localhost:8000/api/candidate/getJobs
const jobData = asyncHandler(async (req, res) => {
    try {
        const jobs = await Jobs.find();
        res.status(200).json({
            success: true,
            jobs: jobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
})

module.exports = { dashboardDetails, jobData };