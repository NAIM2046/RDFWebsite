const express = require('express');
const router = express.Router();
const { uploadReport, getReports, deleteReport } = require('../Controler/ReportController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post("/upload", verifyToken, upload.single("pdf"), uploadReport);
router.get("/reports", getReports);
router.delete("/report/:id", deleteReport);

module.exports = router;
