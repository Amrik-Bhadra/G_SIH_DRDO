const express = require("express");
const router = express.Router();
const {
  allExperts,
  findExpert,
  updateExperts,
  delExpert,
  findExpertByEmail,
} = require("../controllers/expertController/expert_Crud");
const authenticate = require("../middleware/authenticate");
const {
  createExpert,
  loginExpert,
  signoutExpert,
} = require("../controllers/expertController/logSign");
const apiLimiter = require("../middleware/apiLimiter");
const multiRoleAccess = require("../middleware/roleBasedAccess");

//  protected..Routes>
router.get("/all", apiLimiter, authenticate, allExperts);
router.get("/get/:id", apiLimiter, authenticate, findExpert);
router.get("/get/email/:id", apiLimiter, findExpertByEmail);
router.post(
  "/update/:id",
  apiLimiter,
  authenticate,
  multiRoleAccess(["Expert", "Admin"]),
  updateExperts
);
router.delete(
  "/del/:id",
  apiLimiter,
  authenticate,
  multiRoleAccess(["Expert", "Admin"]),
  delExpert
);

// login and signup routes public..Routes>
router.post("/signup", apiLimiter, createExpert);
router.post("/signin", apiLimiter, loginExpert);
router.post("/signout", apiLimiter, signoutExpert);

module.exports = router;
