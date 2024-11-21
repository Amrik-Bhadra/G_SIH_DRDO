const question = require("../../model/qna");
const asyncHandler = require("express-async-handler");

// PRIVATE ROUTE
// http://localhost:8000/api/qna/create
const createQuestion = asyncHandler(async (req, res) => {
  try {
    const { head, options } = req.body;
    if (!head || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input. "head" and "options" are required.',
      });
    }

    for (const option of options) {
      if (
        !option.score ||
        !option.category ||
        typeof option.category.problemSolving !== "Number" ||
        typeof option.category.collaboration !== "Number" ||
        typeof option.category.decisionMaking !== "Number" ||
        typeof option.category.creativity !== "Number" ||
        typeof option.category.analyticalDepth !== "Number"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid options output.",
        });
      }
    }

    const question = new question({
      head,
      options,
    });
  } catch (error) {
    console.log("Error creating the Question", error);
    res.status(500).json({ message: "Error creating the Question" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/qna
const getAllQuestion = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    console.log("Error fetching all the Question", error);
    res.status(500).json({ message: "Error fetching all the Question" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/qna/:id
const getQuestion = asyncHandler(async (req, res) => {
  const id = req.body.id;
  try {
  } catch (error) {
    console.log("Error creating the Question", error);
    res
      .status(500)
      .json({ message: `Error fetching the Question with id : ${id}` });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/qna/del/:id
const delQuestion = asyncHandler(async (req, res) => {
  const id = req.body.id;
  try {
  } catch (error) {
    console.log("Error deleting the Question", error);
    res
      .status(500)
      .json({ message: `Error deleting the Question with id : ${id}` });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/qna/upd/:id
const updQuestion = asyncHandler(async (req, res) => {
  const id = req.body.id;
  try {
  } catch (error) {
    console.log("Error updating the Question", error);
    res
      .status(500)
      .json({ message: `Error updating the Question with id : ${id}` });
  }
});

module.exports = {
  createQuestion,
  getAllQuestion,
  getQuestion,
  delQuestion,
  updQuestion,
};
