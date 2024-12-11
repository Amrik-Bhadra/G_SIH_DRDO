const mongoose = require("mongoose");
const Candidate = require("../../model/candidate");
const Application = require("../../model/application");
const Jobs = require("../../model/jobRole");
const Panel = require("../../model/panel");
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
        console.log("CandID: ", id);
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
        // if (panels.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No panels found for the candidate",
        //     });
        // }
        const plainPanels = panels.map(panel => panel.toObject());
        const jobIDs = plainPanels.map(panel => panel.jobID);
        const selectedJobs = await Jobs.find({ _id: { $in: jobIDs } });
        const applications = await Application.find({
            "applicationStatus.candidateId": id,
          });
        const plainApplications = applications.map(application=>application.toObject());
        const appliedJobIDs = plainApplications.map(application=>application.jobId);
        const appliedJobs = await Jobs.find({ _id: { $in: appliedJobIDs } });
        
          
        // Send the response with candidate, jobIDs, and job details
        res.status(200).json({
            success: true,
            candidate,
            applications,
            selectedJobs,
            appliedJobs,
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