const express = require('express');
const router = express.Router();
const { addTask, getAllTasks, updateTask, deleteTask } = require('../models/taskModel');

// Adicionar nova tarefa
router.post('/add', async (req, res) => {
  try {
    const newTask = req.body;
    const taskId = await addTask(newTask);
    res.status(201).json({ message: 'Task added successfully', taskId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedTask = req.body;
    await updateTask(id, updatedTask);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteTask(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
