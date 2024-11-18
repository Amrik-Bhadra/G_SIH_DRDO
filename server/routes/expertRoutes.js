const express = require("express");
const router = express.Router();
const {
  allExperts,
  findExpert,
  createExpert,
  updateExperts,
  loginExpert,
  signoutExpert,
} = require("../controllers/expertController/crud");
const authenticate = require("../middleware/authenticate");

//  protected..Routes>
router.get("/all", authenticate, allExperts);
router.get("/get/:id", authenticate, findExpert);
router.post("/update/:id", authenticate, updateExperts);

// login and signup routes
router.post("/signin", createExpert);
router.post("/signup", loginExpert);
router.post("/signout", signoutExpert);

module.exports = router;
