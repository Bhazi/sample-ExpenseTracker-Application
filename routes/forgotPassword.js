const express = require("express");
const router = express.Router();

const forgotPasswordController = require("../controllers/forgotPassword");

router.get(
  "/password/forgotPassword",
  forgotPasswordController.getForgotPassword
);

router.post(
    "/password/forgotPassword",
    forgotPasswordController.postForgotPassword
  );

module.exports = router;
