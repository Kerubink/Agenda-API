const express = require('express');
const router = express.Router();
const { addNotification, getAllNotifications, updateNotification, deleteNotification } = require('../controllers/notificationController');

// Adicionar nova notificação
router.post('/add', async (req, res) => {
  try {
    const newNotification = req.body;
    const notificationId = await addNotification(req, res);
    if (!res.headersSent) {
      res.status(201).json({ message: 'Notification added successfully', notificationId });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

// Obter todas as notificações
router.get('/all', async (req, res) => {
  try {
    const notifications = await getAllNotifications(req, res);
    if (!res.headersSent) {
      res.status(200).json(notifications);
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

// Atualizar uma notificação existente
router.put('/update/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedNotification = req.body;
    await updateNotification(req, res);
    if (!res.headersSent) {
      res.status(200).json({ message: 'Notification updated successfully' });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

// Excluir uma notificação existente
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteNotification(req, res);
    if (!res.headersSent) {
      res.status(200).json({ message: 'Notification deleted successfully' });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
