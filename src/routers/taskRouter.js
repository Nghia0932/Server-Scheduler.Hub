const Router = require('express');
const {addNewTask} = require('../controllers/taskController');
const taskRouter = Router();

taskRouter.post('/addNewTask', addNewTask);

module.exports = taskRouter;
