const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require('../Controler/ProjectController');

router.post('/', verifyToken, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', verifyToken, updateProject);

router.delete('/:id', verifyToken, deleteProject);

module.exports = router;
