const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createActivity, getActivitys, deleteActivity } = require('../Controler/ActivityController');

router.post('/', verifyToken, createActivity);
router.get('/', getActivitys);



router.delete('/:id', verifyToken, deleteActivity);

module.exports = router;
