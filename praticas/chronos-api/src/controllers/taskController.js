// src/controllers/taskController.js
const prisma = require('../prisma');

// POST /tasks
const createTask = async (req, res) => {
  try {
    const { id, name, duration, type, startDate } = req.body;

    // Validação dos campos obrigatórios
    if (!name || !duration || !type || !startDate) {
      return res.status(400).json({ error: 'Campos obrigatórios: name, duration, type, startDate' });
    }

    const validTypes = ['workTime', 'shortBreakTime', 'longBreakTime'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: `Tipo inválido. Use: ${validTypes.join(', ')}` });
    }

    const task = await prisma.task.create({
      data: {
        id: id || undefined, // usa o id enviado ou gera automaticamente
        name,
        duration: Number(duration),
        type,
        startDate: new Date(startDate),
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar task' });
  }
};

// PATCH /tasks/:taskId/complete
const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { completeDate } = req.body;

    if (!completeDate) {
      return res.status(400).json({ error: 'Campo obrigatório: completeDate' });
    }

    // Verifica se a task existe
    const taskExists = await prisma.task.findUnique({ where: { id: taskId } });
    if (!taskExists) {
      return res.status(404).json({ error: 'Task não encontrada' });
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { completeDate: new Date(completeDate) },
    });

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao concluir task' });
  }
};

// PATCH /tasks/:taskId/interrupt
const interruptTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { interruptDate } = req.body;

    if (!interruptDate) {
      return res.status(400).json({ error: 'Campo obrigatório: interruptDate' });
    }

    // Verifica se a task existe
    const taskExists = await prisma.task.findUnique({ where: { id: taskId } });
    if (!taskExists) {
      return res.status(404).json({ error: 'Task não encontrada' });
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { interruptDate: new Date(interruptDate) },
    });

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao interromper task' });
  }
};

// GET /tasks
const listTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { startDate: 'desc' },
    });

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar tasks' });
  }
};

// DELETE /tasks
const clearTasks = async (req, res) => {
  try {
    await prisma.task.deleteMany();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao limpar histórico' });
  }
};

module.exports = { createTask, completeTask, interruptTask, listTasks, clearTasks };
