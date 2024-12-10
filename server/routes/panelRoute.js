const express = require("express");
const apiLimiter = require("../middleware/apiLimiter");
const authenticate = require("../middleware/authenticate");
const {
  fetchPanelsUsingJobId,
} = require("../controllers/jobController/jobsOther");
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
router.get("/get/:id", apiLimiter, getPanel);
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

// fetching the panels using the jobId
router.get("/job/:jobID", fetchPanelsUsingJobId);

module.exports = router;
