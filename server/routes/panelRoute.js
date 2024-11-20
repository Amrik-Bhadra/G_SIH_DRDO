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
  "/create",
  apiLimiter,
  //   multiRoleAccess(["Admin"]),
  authenticate,
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
router.post(
  "/update/:id",
  apiLimiter,
  authenticate,
  //   multiRoleAccess(["Admin"]),
  updatePanel
);

module.exports = router;
