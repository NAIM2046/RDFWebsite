const SSLCommerzPayment = require('sslcommerz-lts');
require('dotenv').config();

const initPayment = async (req, res) => {
  const { amount, name, email, donationType } = req.body;
  const tran_id = "txn_" + new Date().getTime();

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${process.env.SERVER_URL}/api/payment/success/${tran_id}`,
    fail_url: `${process.env.SERVER_URL}/api/payment/fail/${tran_id}`,
    cancel_url: `${process.env.SERVER_URL}/api/payment/cancel/${tran_id}`,
    ipn_url: `${process.env.SERVER_URL}/api/payment/ipn`,
    shipping_method: "No",
    product_name: "Donation",
    product_category: "Charity",
    product_profile: "general",
    cus_name: name,
    cus_email: email,
    cus_add1: "Dhaka",
    cus_phone: "01700000000",
  };

  const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false);
  sslcz.init(data).then(apiResponse => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.json({ GatewayPageURL });
  }).catch(error => {
    console.error("SSLCommerz Error:", error);
    res.status(500).json({ error: "Payment initiation failed." });
  });
};

const paymentSuccess = (req, res) => {
  const { tran_id } = req.params;
  console.log(`Payment successful for Transaction ID: ${tran_id}`);
  res.redirect(`${process.env.FRONTEND_URL}/payment-success?tran_id=${tran_id}`);
};

const paymentFail = (req, res) => {
  res.json({ message: "Payment Failed", transactionId: req.params.tran_id });
};

const paymentCancel = (req, res) => {
  res.json({ message: "Payment Cancelled", transactionId: req.params.tran_id });
};

const paymentIpn = (req, res) => {
  console.log("IPN Received:", req.body);
  res.json({ message: "IPN received successfully" });
};

module.exports = { initPayment, paymentSuccess, paymentFail, paymentCancel, paymentIpn };
