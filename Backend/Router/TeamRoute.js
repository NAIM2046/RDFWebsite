const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createTeam, getTeams, getTeamById, updateTeam, deleteTeam } = require('../Controler/TeamController');

router.post('/', verifyToken, createTeam);
router.get('/', getTeams);
router.get('/:id', getTeamById);


router.patch('/:id', verifyToken, updateTeam);
router.delete('/:id', verifyToken, deleteTeam);

module.exports = router;
