const mongoose = require("mongoose");
const Candidate = require("../../model/candidate");
const Application = require("../../model/application");
const Jobs = require("../../model/jobRole");
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
        console.log(typeof id);
        const candId = "674aaf2e7976acc877362715";
        // Fetch applications for the candidate using find
        const applications = await Application.find({
            "applicationStatus.candidateId": "674aaf2e7976acc877362715", 
        });

        // Ensure the applications array is not empty
        if (applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applications found for the candidate",
            });
        }

        // Send the response
        res.status(200).json({
            success: true,
            candidate,
            applications,
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

module.exports = {dashboardDetails,jobData};