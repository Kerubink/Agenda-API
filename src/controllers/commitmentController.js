const appointmentModel = require('../models/commitmentModel');

// Adiciona um novo compromisso
async function addAppointment(req, res) {
  try {
    const id = await appointmentModel.addAppointment(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtém todos os compromissos
async function getAllAppointments(req, res) {
  try {
    const appointments = await appointmentModel.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atualiza um compromisso existente
async function updateAppointment(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await appointmentModel.updateAppointment(id, req.body);
    res.status(200).json({ message: 'Compromisso atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Exclui um compromisso existente
async function deleteAppointment(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await appointmentModel.deleteAppointment(id);
    res.status(200).json({ message: 'Compromisso deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addAppointment, getAllAppointments, updateAppointment, deleteAppointment };
