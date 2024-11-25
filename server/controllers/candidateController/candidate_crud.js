const mongoose = require("mongoose");
const Candidate = require("../../model/candidate");
const asyncHandler = require("express-async-handler");


//http://localhost:8000/api/candidate/completeDetails
const completeDetails = asyncHandler(async (req, res) => {
  const email = req.query.email; // Get email from query parameter
  const userData = req.body;     // Get updated data from the request body
  resume = {
    filename: req.file.filename,
    fileType: req.file.mimetype,
  }

  // 1. Find the candidate by email
  const candidate = await Candidate.findOne({ "personalDetails.contact.email": email });

  if (!candidate) {
    return res.status(404).json({ error: "Candidate not found" });
  }

  // 2. Update the candidate's data (excluding email and password)
  candidate.personalDetails.name = userData.name || candidate.personalDetails.name;
  candidate.personalDetails.gender = userData.gender || candidate.personalDetails.gender;
  candidate.personalDetails.age = userData.age || candidate.personalDetails.age;
  candidate.personalDetails.contact.phoneNo = userData.phoneNo || candidate.personalDetails.contact.phoneNo;
  candidate.personalDetails.contact.recoveryEmail = userData.recoveryEmail || candidate.personalDetails.contact.recoveryEmail;
  candidate.personalDetails.idProof = userData.idProof || candidate.personalDetails.idProof;
  candidate.personalDetails.permanentAddress = userData.permanentAddress || candidate.personalDetails.permanentAddress;
  candidate.skills = userData.skills || candidate.skills;
  candidate.areaOfExpertise = userData.areaOfExpertise || candidate.areaOfExpertise;
  candidate.resume = userData.resume || candidate.resume;
  candidate.yearsOfExperience = userData.yearsOfExperience || candidate.yearsOfExperience;
  candidate.qualifications = userData.qualifications || candidate.qualifications;
  candidate.projects = userData.projects || candidate.projects;
  candidate.researchPapers = userData.researchPapers || candidate.researchPapers;
  candidate.skillRelevancyScore = userData.skillRelevancyScore || candidate.skillRelevancyScore;
  candidate.approachRelevancyScore = userData.approachRelevancyScore || candidate.approachRelevancyScore;
  candidate.finalScore = userData.finalScore || candidate.finalScore;

  try {
    // 3. Save the updated candidate data to the database
    await candidate.save();

    // 4. Send a success response with the updated candidate data
    return res.status(200).json({
      message: "Candidate details updated successfully",
      updatedCandidate: candidate, // Return updated candidate object
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while updating candidate details" });
  }
});

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

  console.log("Candidate ID to update:", candidateId);
  console.log("Data received for update:", candidateData);

  // Validate the candidateId
  if (!mongoose.Types.ObjectId.isValid(candidateId)) {
    return res.status(400).json({
      message: "Invalid candidate ID",
      success: false,
    });
  }

  try {
    // Prevent password updates directly here
    if (candidateData.password) {
      delete candidateData.password;
    }

    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $set: candidateData },
      { new: true } // Return updated document
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
        success: false,
      });
    }

    console.log("Updated candidate data:", candidate);

    res.status(200).json({
      message: "Candidate updated successfully",
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.error(`Error updating candidate with ID ${candidateId}:`, error);
    res.status(500).json({ message: "Error updating candidate", success: false });
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
      personalDetails: { password: 0 },
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
  completeDetails,
};
