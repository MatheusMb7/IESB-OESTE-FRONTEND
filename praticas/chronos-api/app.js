const express = require('express');

const app = express();

app.use(express.json());

let settings = {
  workTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15
};

let tasks = [];

// Health
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Buscar settings
app.get('/settings', (req, res) => {
  res.json(settings);
});

// Atualizar settings
app.put('/settings', (req, res) => {
  settings = req.body;

  res.json(settings);
});

// Criar task
app.post('/tasks', (req, res) => {
  const task = req.body;

  tasks.push(task);

  res.status(201).json(task);
});

// Listar tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Completar task
app.patch('/tasks/:id/complete', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      error: 'Task não encontrada'
    });
  }

  task.completeDate = req.body.completeDate;

  res.json(task);
});

// Interromper task
app.patch('/tasks/:id/interrupt', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      error: 'Task não encontrada'
    });
  }

  task.interruptDate = req.body.interruptDate;

  res.json(task);
});

// Limpar histórico
app.delete('/tasks', (req, res) => {
  tasks = [];

  res.status(204).send();
});

// Rodar servidor
app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});