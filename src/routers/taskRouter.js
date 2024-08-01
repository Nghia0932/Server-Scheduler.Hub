const Router = require('express');
const {addNewTask, getAllTask} = require('../controllers/taskController');
const taskRouter = Router();

taskRouter.post('/addNewTask', addNewTask);
taskRouter.post('/getAllTask', getAllTask);
module.exports = taskRouter;
