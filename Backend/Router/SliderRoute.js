const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createSlider, getSliders, updateSlider, deleteSlider } = require('../Controler/SliderController');

router.post('/', verifyToken, createSlider);
router.get('/', getSliders);

router.put('/:id', verifyToken, updateSlider);

router.delete('/:id', verifyToken, deleteSlider);

module.exports = router;
