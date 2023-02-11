const express = require("express");

const router = express.Router();
const premiumController = require("../controllers/premium");

router.get("/premium/leaderboard", premiumController.getLeaderboard);

module.exports = router;
