const mongoose = require("mongoose");
const Expert = require("../../model/expert");
const Application = require("../../model/application");
const Jobs = require("../../model/jobRole");
const Panel = require("../../model/panel")
const asyncHandler = require("express-async-handler");


const dashboardDetailsForExpert = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;

        // Validate if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expert ID format",
            });
        }

        // Fetch all panels where this expert exists
        const panels = await Panel.find(
            { "panelInfo.panelExperts.expertID": id }, // Find panels where this expert exists
            { candidates: 1, finalSkillScore: 1, finalApproachScore: 1, finalScore: 1, _id: 0 } // Return required fields
        );

        // Check if panels array is empty
        if (panels.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No panels found for the expert",
            });
        }

        // Extract relevant information for the expert
        const candidateDetails = panels.flatMap(panel => panel.candidates); // Gather all candidates from panels
        const scores = panels.map(panel => ({
            finalSkillScore: panel.finalSkillScore,
            finalApproachScore: panel.finalApproachScore,
            finalScore: panel.finalScore,
        }));

        // Send the response with panels, candidate details, and scores
        res.status(200).json({
            success: true,
            panels,
            candidateDetails,
            scores,
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


module.exports = dashboardDetailsForExpert;