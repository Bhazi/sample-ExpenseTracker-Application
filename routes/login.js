const express = require("express");

const router = express.Router();
const controller = require("../controllers/login");

router.get("/", controller.getLogin);
router.post("/", controller.postData);

module.exports = router;
