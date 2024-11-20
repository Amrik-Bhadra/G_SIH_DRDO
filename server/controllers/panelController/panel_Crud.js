const asyncHandler = require("express-async-handler");
const panel = require("../../model/panel");

// PRIVATE ROUTE
// http://localhost:8000/api/panel/create
const createPanel = asyncHandler(async (req, res) => {
  const {
    name,
    deptName,
    noOfExperts,
    noOfCandidates,
    description,
    interviewDate,
    startTime,
    endTime,
  } = req.body;

  try {
    const newPanel = await panel.create({
      name,
      deptName,
      description,
      noOfExperts,
      noOfCandidates,
      candidateId: [],
      expertIds: [],
      status: "Pending",
      interviewDateAndTime: {
        date: interviewDate,
        startTime,
        endTime,
      },
      location: {
        state: "NA",
        address: "NA",
        pincode: "123456",
      },
    });

    res.status(201).json({
      message: "Panel created successfully",
      success: true,
      data: newPanel,
    });
  } catch (error) {
    console.log("Error Creating The Panel", error);
    res.status(500).json({ message: "Error creating the panel" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/panel/update/:id
const updatePanel = asyncHandler(async (req, res) => {
  const panelId = req.params.id;
  const panelData = req.body;

  try {
    const updatedPanel = await panel.findByIdAndUpdate(
      panelId,
      { $set: panelData },
      { new: true }
    );
    if (!updatedPanel) {
      return res.status(404).json({
        message: "Panel not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Panel updated successfully",
      success: true,
      data: updatedPanel,
    });
  } catch (error) {
    console.log("Error Updating The Panel", error);
    res.status(500).json({ message: "Error updating the panel" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/panel/del/:id
const deletePanel = asyncHandler(async (req, res) => {
  const panelId = req.params.id;
  try {
    const deletedPanel = await panel.findByIdAndDelete(panelId);
    if (!deletedPanel) {
      return res.status(404).json({
        message: "Panel not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Panel deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error Deleting The Panel", error);
    res.status(500).json({ message: "Error deleting the panel" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/panel/get/:id
const getPanel = asyncHandler(async (req, res) => {
  const panelId = req.params.id;
  try {
    const foundPanel = await panel.findById(panelId);
    if (!foundPanel) {
      return res.status(404).json({
        message: "Panel not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Panel retrieved successfully",
      success: true,
      data: foundPanel,
    });
  } catch (error) {
    console.log("Error Getting The Panel", error);
    res.status(500).json({ message: "Error fetching the panel" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/panel/all
const getAllPanel = asyncHandler(async (req, res) => {
  try {
    const allPanels = await panel.find();
    if (!allPanels.length) {
      return res.status(404).json({
        message: "No Panel data is available",
        success: false,
      });
    }
    res.status(200).json(allPanels);
  } catch (error) {
    console.log("Error Fetching All Panels", error);
    res.status(500).json({ message: "Error fetching all panels" });
  }
});

module.exports = {
  createPanel,
  updatePanel,
  getPanel,
  deletePanel,
  getAllPanel,
};
