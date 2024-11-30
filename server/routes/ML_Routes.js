const express = require("express");
const { flaskFlag } = require("../config/flaskConnect");
const {
  insertManyExperts,
  insertManyCandidates,
} = require("../controllers/ML_Controller/manyExperts");
const router = express.Router();

(async () => {
  try {
    const result = await flaskFlag();
    console.log("Result from Flask API:", result);
  } catch (error) {
    console.error("Error during test:");
  }
})();

// for mass Inserting of the experts
router.post("/e_bulk", insertManyExperts);
router.post("/c_bulk", insertManyCandidates);

module.exports = router;
