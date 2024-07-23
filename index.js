const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/routes/task.routes');
const commitmentRoutes = require('./src/routes/commitment.routes');
const notificationRoutes = require('./src/routes/notification.routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/tasks', taskRoutes);
app.use('/commitments', commitmentRoutes);
app.use('/notifications', notificationRoutes);


// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
