const db = require('../db');

const createTasksTable = () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        taskNumber VARCHAR(255),
        estimateHours VARCHAR(50),
        estimateNotes TEXT,
        actualHours FLOAT,
        notes TEXT,
        completed BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    db.query(query, (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.error('Error creating tasks table:', err);
    throw err;
  }
};

createTasksTable();

const getAllTasks = (callback) => {
  try {
    const query = 'SELECT * FROM tasks ORDER BY id DESC';
    // const query = 'SELECT COUNT(*), taskNumber, group_concat(estimateHours) as estimateHours, group_concat(estimateNotes) as estimateNotes, group_concat(completed) as completed FROM tasks GROUP BY taskNumber; ';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  } catch (err) {
    console.error('Error getting all tasks:', err);
    throw err;
  }
};

const getTaskById = (taskDetails, callback) => {
  const { taskNumber, estimateHours, estimateNotes } = taskDetails;
  console.log(taskNumber, estimateHours, estimateNotes);
  try {
    const query = `SELECT * FROM tasks WHERE taskNumber = '${taskNumber}' AND estimateHours = ${estimateHours} AND estimateNotes = '${estimateNotes}'`;
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results[0]);
    });
  } catch (err) {
    console.error('Error getting task by ID:', err);
    throw err;
  }
};

const createTask = (taskData, callback) => {
  try {
    const query = 'INSERT INTO tasks SET ?';
    db.query(query, taskData, (err, results) => {
      if (err) throw err;
      callback(results.insertId);
    });
  } catch (err) {
    console.error('Error creating task:', err);
    throw err;
  }
};

const updateTask = (taskId, estimateHours, estimateNotes, taskData, callback) => {
  console.log('taskId, taskData', taskId, taskData);
  try {
    // const query = 'UPDATE tasks SET ? WHERE id = ?';
    const query = 'UPDATE tasks SET ? WHERE taskNumber = ? AND estimateHours = ? AND estimateNotes = ?';
    db.query(query, [taskData, taskId, estimateHours, estimateNotes], (err) => {
      if (err) throw err;
      callback();
    });
  } catch (err) {
    console.error('Error updating task:', err);
    throw err;
  }
};

const getTaskByNumber = (taskNumber, callback) => {
  try {
    const query = 'SELECT * FROM tasks WHERE taskNumber = ?';
    db.query(query, [taskNumber], (err, results) => {
      if (err) throw err;
      callback(results[0]);
    });
  } catch (err) {
    console.error('Error getting task by TaskNumber:', err);
    throw err;
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  getTaskByNumber
};
