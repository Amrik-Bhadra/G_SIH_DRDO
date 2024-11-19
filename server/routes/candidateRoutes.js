const express = require("express");
const router = express.Router();

const {
  allCandidates,
  findCandidate,
  updateCandidate,
} = require("../controllers/candidateController/c_crud");

const {
  addCandidate,
  loginCandidate,
  signoutCandidate,
} = require("../controllers/candidateController/login");

const authenticate = require("../middleware/authenticate");
const apiLimiter = require("../middleware/apiLimiter");
const multiRoleAccess = require("../middleware/roleBasedAccess");

router.get("/all", apiLimiter, authenticate, allCandidates);
router.get("/get/:id", apiLimiter, authenticate, findCandidate);
router.post(
  "/update/:id",
  apiLimiter,
  authenticate,
  multiRoleAccess(["Candidate", "Admin"]),
  updateCandidate
);

router.post("/signup", apiLimiter, addCandidate);
router.post("/signin", apiLimiter, loginCandidate);
router.post("/signout", apiLimiter, signoutCandidate);

router.get("/all", apiLimiter, authenticate, allCandidates);

module.exports = router;
