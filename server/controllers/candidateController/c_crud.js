const mongoose = require("mongoose");
const Candidate = require("../../model/candidate");
const asyncHandler = require("express-async-handler");

// PRIVATE ROUTE
// http://localhost:8000/api/candidate/all
const allCandidates = asyncHandler(async (req, res) => {
  try {
    const candidates = await Candidate.find(
      {},
      {
        password: 0,
        candidateProfile: {
          additionalInputs: {
            // Remove publications or specific fields if needed
            publications: 0,
          },
        },
      }
    );
    if (!candidates.length) {
      return res.status(404).json({
        message: "No candidates data is available",
        success: false,
      });
    }
    res.status(200).json(candidates);
  } catch (error) {
    console.log("Error fetching all candidates :-: ", error);
    res.status(500).json({ message: "Error fetching all candidates" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/candidate/update/:id
const updateCandidate = asyncHandler(async (req, res) => {
  const candidateId = req.params.id;
  const candidateData = req.body;
  try {
    // Prevent password updates directly here
    if (candidateData.password) {
      delete candidateData.password;
    }

    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $set: candidateData },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Candidate updated successfully",
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.log(`Error updating candidate with ID ${candidateId} :-: \n\n`, error);
    res.status(500).json({ message: "Error updating candidate" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/candidate/find/:id
const findCandidate = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid or missing Candidate ID",
        success: false,
      });
    }
    const candidate = await Candidate.findById(id, {
      password: 0,
      candidateProfile: {
        additionalInputs: {
          // Remove publications or specific fields if needed
          publications: 0,
        },
      },
    });

    if (!candidate) {
      return res.status(404).json({
        message: `Unable to fetch the candidate with ID: ${id}`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Candidate fetched successfully",
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.log(`Error fetching candidate with ID ${id} :-:\n\n`, error);
    res.status(500).json({ message: "Error fetching candidate" });
  }
});

module.exports = {
  allCandidates,
  findCandidate,
  updateCandidate,
};
