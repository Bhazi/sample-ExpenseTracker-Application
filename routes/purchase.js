const express = require("express");

const purchaseController = require("../controllers/purchase");

const authenticationMiddleware = require("../middleware/auth");

const router = express.Router();

router.get(
  "/premiummembership",
  authenticationMiddleware.getVerifyingIdFromToken,
  purchaseController.purchasepremium
);

router.post(
  "/updatetransactionstatus",
  authenticationMiddleware.getVerifyingIdFromToken,
  purchaseController.updateTransactionStatus
);

module.exports = router;
