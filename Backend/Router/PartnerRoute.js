const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createPartner, getPartners, updatePartner, deletePartner } = require('../Controler/PartnerController');

router.post('/', verifyToken, createPartner);
router.get('/', getPartners);
router.put('/:id', verifyToken, updatePartner);

router.delete('/:id', verifyToken, deletePartner);

module.exports = router;
