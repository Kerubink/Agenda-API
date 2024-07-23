const notificationModel = require('../models/notificationModel');

async function addNotification(req, res) {
  try {
    const id = await notificationModel.addNotification(req.body);
    if (!res.headersSent) {
      res.status(201).json({ id, message: 'Notificação adicionada com sucesso' });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
}

async function getAllNotifications(req, res) {
  try {
    const notifications = await notificationModel.getAllNotifications();
    if (!res.headersSent) {
      res.status(200).json(notifications);
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
}

async function updateNotification(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await notificationModel.updateNotification(id, req.body);
    if (!res.headersSent) {
      res.status(200).json({ message: 'Notificação atualizada com sucesso' });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
}

async function deleteNotification(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await notificationModel.deleteNotification(id);
    if (!res.headersSent) {
      res.status(200).json({ message: 'Notificação deletada com sucesso' });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = { addNotification, getAllNotifications, updateNotification, deleteNotification };
