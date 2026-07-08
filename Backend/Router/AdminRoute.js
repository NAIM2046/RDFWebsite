const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAdmins, deleteAdmin } = require('../Controler/AdminController');
const { verifyToken } = require('../middleware/auth');

router.post("/reg", verifyToken, registerAdmin);
router.post("/login", loginAdmin);
router.get("/find", verifyToken, getAdmins);
router.delete("/:id", verifyToken, deleteAdmin);

module.exports = router;
