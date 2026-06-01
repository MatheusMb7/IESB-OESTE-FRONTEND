// src/routes/index.js
const { Router } = require('express');

const { healthCheck } = require('../controllers/healthController');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { createTask, completeTask, interruptTask, listTasks, clearTasks } = require('../controllers/taskController');

const router = Router();

// Health
router.get('/health', healthCheck);

// Settings
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Tasks
router.post('/tasks', createTask);
router.get('/tasks', listTasks);
router.delete('/tasks', clearTasks);
router.patch('/tasks/:taskId/complete', completeTask);
router.patch('/tasks/:taskId/interrupt', interruptTask);

module.exports = router;
