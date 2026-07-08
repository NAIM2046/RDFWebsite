const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createProgram, getPrograms, getProgramById, updateProgram, deleteProgram } = require('../Controler/ProgramController');

router.post('/', verifyToken, createProgram);
router.get('/', getPrograms);
router.get('/:id', getProgramById);

router.put('/:id', verifyToken, updateProgram);

router.delete('/:id', verifyToken, deleteProgram);

module.exports = router;
