const express = require("express");
const {
  uniqueJobDomain,
} = require("../controllers/expertController/expert_Crud");
const router = express.Router();

router.get("/uniqueDomain", uniqueJobDomain);

module.exports = router;
