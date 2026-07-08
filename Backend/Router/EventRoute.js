const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../Controler/EventController');

router.post('/', verifyToken, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', verifyToken, updateEvent);

router.delete('/:id', verifyToken, deleteEvent);

module.exports = router;
