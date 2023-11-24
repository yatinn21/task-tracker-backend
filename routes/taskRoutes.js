const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/getAllTasks', taskController.getAllTasks);
router.post('/getTaskById/:id', taskController.getTaskById);
router.post('/createTask', taskController.createTask);
router.post('/entryForSameTask', taskController.entryForSameTask);
router.post('/updateTask/:id', taskController.updateTask);

module.exports = router;
