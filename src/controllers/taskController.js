const taskModel = require('../models/taskModel');

async function addTask(req, res) {
  try {
    const id = await taskModel.addTask(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getAllTasks(req, res) {
  try {
    const tasks = await taskModel.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function updateTask(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await taskModel.updateTask(id, req.body);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function deleteTask(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await taskModel.deleteTask(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addTask, getAllTasks, updateTask, deleteTask };
