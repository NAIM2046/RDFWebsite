const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createVideo, getVideos, deleteVideo } = require('../Controler/VideoController');

router.post('/', verifyToken, createVideo);
router.get('/', getVideos);



router.delete('/:id', verifyToken, deleteVideo);

module.exports = router;
