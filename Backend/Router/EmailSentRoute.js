const express = require('express');
const { sentEmail } = require('../Controler/EmailControler');
const router = express.Router();

router.post("/sentEmail" , sentEmail) ;

module.exports = router ;