const express = require("express");

const path = require("path");
const router = express.Router();
const mainController = require("../controllers/expenseTracker");

router.get("/form", mainController.getForm);

router.post("/form", mainController.postForm);

router.get("/getDetails", mainController.getDetails);

// router.put("/edit/:id", mainController.editElement);

router.delete("/delete/:id", mainController.deleteElement);

module.exports = router;
