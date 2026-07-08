const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createNews, getNewss, getNewsById, updateNews, deleteNews } = require('../Controler/NewsController');

router.post('/', verifyToken, createNews);
router.get('/', getNewss);
router.get('/:id', getNewsById);


router.patch('/:id', verifyToken, updateNews);
router.delete('/:id', verifyToken, deleteNews);

module.exports = router;
