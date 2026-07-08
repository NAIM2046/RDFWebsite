const express = require('express');
const router = express.Router();
const { initPayment, paymentSuccess, paymentFail, paymentCancel, paymentIpn } = require('../Controler/PaymentController');

router.post("/", initPayment);
router.post("/success/:tran_id", paymentSuccess);
router.post("/fail/:tran_id", paymentFail);
router.post("/cancel/:tran_id", paymentCancel);
router.post("/ipn", paymentIpn);

module.exports = router;
