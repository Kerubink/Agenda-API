const express = require('express');
const router = express.Router();
const { addAppointment, getAllAppointments, updateAppointment, deleteAppointment } = require('../models/commitmentModel');

// Adicionar novo compromisso
router.post('/add', async (req, res) => {
  try {
    const newAppointment = req.body;
    const appointmentId = await addAppointment(newAppointment);
    res.status(201).json({ message: 'Appointment added successfully', appointmentId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter todos os compromissos
router.get('/all', async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um compromisso existente
router.put('/update/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedAppointment = req.body;
    await updateAppointment(id, updatedAppointment);
    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir um compromisso existente
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteAppointment(id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
