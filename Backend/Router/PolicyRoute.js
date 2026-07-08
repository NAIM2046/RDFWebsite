const express = require('express');
const router = express.Router();
const { uploadPolicy, getPolicies, deletePolicy } = require('../Controler/PolicyController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post("/policy-upload", verifyToken, upload.single("pdf"), uploadPolicy);
router.get("/policies", getPolicies);
router.delete("/policies/:id", verifyToken, deletePolicy);

module.exports = router;
