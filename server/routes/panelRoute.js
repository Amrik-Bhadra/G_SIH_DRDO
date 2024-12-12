const express = require("express");
const apiLimiter = require("../middleware/apiLimiter");
const authenticate = require("../middleware/authenticate");
const {getExperts} = require("../controllers/panelController/getExperts")
const {createExpert} = require("../controllers/panelController/getExperts");
const interviewScores = require("../controllers/panelController/candidateEvalute");

const {
  getAllPanel,
  getPanel,
  updatePanel,
  deletePanel,
  createPanel,
} = require("../controllers/panelController/panel_Crud");
const router = express.Router();

//  protected..Routes>
router.post(
  "/add",
  apiLimiter,
  //   multiRoleAccess(["Admin"]),
  // authenticate,
  createPanel
);
router.get("/all", apiLimiter, authenticate, getAllPanel);
router.get("/get/:id", apiLimiter, authenticate, getPanel);
router.delete(
  "/del/:id",
  apiLimiter,
  //   multiRoleAccess(["Admin"]),
  authenticate,
  deletePanel
);
router.put(
  "/update",
  apiLimiter,
  // authenticate,
  //   multiRoleAccess(["Admin"]),
  updatePanel
);

  router.get("/getExperts",getExperts);
router.post("/createExpert", createExpert);
router.post("/interviewScores",interviewScores);

module.exports = router;
