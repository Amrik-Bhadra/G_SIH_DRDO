const express = require("express");
const apiLimiter = require("../middleware/apiLimiter");
const authenticate = require("../middleware/authenticate");
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

module.exports = router;
