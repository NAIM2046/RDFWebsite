const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createPhoto, getPhotos, deletePhoto } = require('../Controler/PhotoController');

router.post('/', verifyToken, createPhoto);
router.get('/', getPhotos);



router.delete('/:id', verifyToken, deletePhoto);

module.exports = router;
