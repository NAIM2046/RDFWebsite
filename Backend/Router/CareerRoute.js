const express = require('express');
const router = express.Router();
const { createCareer, getCareers, deleteCareer, updateCareer } = require('../Controler/CareerController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post("/", verifyToken, upload.single("file"), createCareer);
router.get("/", getCareers);
router.put("/:id", verifyToken, upload.single("file"), updateCareer);
router.delete("/:id", verifyToken, deleteCareer);

module.exports = router;
