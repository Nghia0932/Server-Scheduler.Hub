const {default: mongoose} = require('mongoose');

const TaskSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  colorCard: {
    type: String,
  },
  dateStart: {
    type: String,
  },
  dateEnd: {
    type: String,
  },
  timeStart: {
    type: String,
  },
  timeEnd: {
    type: String,
  },

  listTodo: {
    type: [String],
  },
});

const TaskkModel = mongoose.model('tasks', TaskSchema);
module.exports = TaskkModel;
