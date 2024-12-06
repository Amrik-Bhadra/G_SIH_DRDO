const express = require("express");
const { exec } = require("child_process");
const asyncHandler = require("express-async-handler");

const route = "C:\\Users\\varun\\Desktop\\SIH@2024\\G_SIH_DRDO\\flask";
const flaskOperations = asyncHandler(async (req, res) => {
  console.log(typeof req.body.finalSkillScore);
  console.log(`python ${route}\\candidateScore.py`);
  try {
    exec(`python ${route}/candidateScore.py`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({
          message: "Error running candidateScore.py",
          success: false,
          error: stderr || error.message,
        });
      }
      console.log("candidateScore.py output:", stdout);

      exec(
        `python ${route}\\expertSelectionAndScore.py`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({
              message: "Error running expertSelectionAndScore.py",
              success: false,
              error: stderr || error.message,
            });
          }
          console.log("expertSelectionAndScore.py output:", stdout);

          return res.status(200).json({
            message: "Both scripts executed successfully!",
            success: true,
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Unable to fetch the flask calculating routes",
      success: false,
      error: error.message,
    });
  }
});

// Route handler for expertSelectionAndScore.py
const expertSelectionRoute = asyncHandler(async (req, res) => {
  const { num_panels, experts_per_panel } = req.body;
  console.log(`Executing: python ${route}\\expertSelectionAndScore.py`);
  try {
    exec(
      `python ${route}\\expertSelectionAndScore.py --num_panels ${num_panels} --experts_per_panel ${experts_per_panel}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).json({
            message: "Error running expertSelectionAndScore.py",
            success: false,
            error: stderr || error.message,
          });
        }
        console.log("expertSelectionAndScore.py output:", stdout);
        return res.status(200).json({
          message: "expertSelectionAndScore.py executed successfully!",
          success: true,
          output: stdout,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Unexpected error occurred while running expertSelectionAndScore.py",
      success: false,
      error: error.message,
    });
  }
});

module.exports = { flaskOperations, expertSelectionRoute };
