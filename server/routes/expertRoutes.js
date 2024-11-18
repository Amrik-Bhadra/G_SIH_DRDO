const express = require("express");
const router = express.Router();
const {
  allExperts,
  findExpert,
  updateExperts,
} = require("../controllers/expertController/crud");
const authenticate = require("../middleware/authenticate");
const {
  createExpert,
  loginExpert,
  signoutExpert,
} = require("../controllers/expertController/logSign");

//  protected..Routes>
router.get("/all", authenticate, allExperts);
router.get("/get/:id", authenticate, findExpert);
router.post("/update/:id", authenticate, updateExperts);

// login and signup routes public..Routes>
router.post("/signin", createExpert);
router.post("/signup", loginExpert);
router.post("/signout", signoutExpert);

module.exports = router;
