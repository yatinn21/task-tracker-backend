const Task = require('../models/taskModels');

const getAllTasks = (req, res) => {
  try {
    Task.getAllTasks((tasks) => {
      res.json(tasks);
    });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTaskById = (req, res) => {
  console.log('params',req.params);
  const taskNumber = req.params.id;
  console.log('taskNumber',taskNumber);
  try {
    Task.getTaskById(taskNumber, (task) => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    });
  } catch (err) {
    console.error('Error fetching task by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTask = (req, res) => {
  const taskData = req.body;
  console.log(taskData);

  Task.getTaskByNumber(taskData.taskNumber, (existingTask) => {
    if (existingTask) {
      console.error('Error creating task: TaskNumber already exists');
      res.status(200).json({ error: 'TaskNumber already exists. Please use a different TaskNumber.' });
    } else {
      try {
        Task.createTask(taskData, (taskId) => {
          res.status(201).json({ id: taskId, message: 'Task created successfully' });
        });
      } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
};


const updateTask = (req, res) => {
  const taskData = req.body;
  const taskId = req.params.id;
  console.log('taskData line 61',{...taskData,completed:1});
  console.log('taskId line 62',taskId);
  try {
    Task.updateTask(taskId, {...taskData,completed:1}, () => {
      res.json({ message: 'Task updated successfully' });
    });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const entryForSameTask = (req,res) => {
  const taskNumber = req.body;
  console.log(taskNumber);
  try {
    Task.createTask(taskNumber, (taskId) => {
      res.status(201).json({ id: taskId, message: 'Task created successfully' });
    });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  entryForSameTask,
};
