// src/controllers/settingsController.js
const prisma = require('../prisma');

// GET /settings
const getSettings = async (req, res) => {
  try {
    // Busca o primeiro registro de settings (sempre terá apenas um)
    let settings = await prisma.settings.findFirst();

    // Se não existir ainda, cria com os valores padrão
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          workTime: 25,
          shortBreakTime: 5,
          longBreakTime: 15,
        },
      });
    }

    return res.json(settings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar settings' });
  }
};

// PUT /settings
const updateSettings = async (req, res) => {
  try {
    const { workTime, shortBreakTime, longBreakTime } = req.body;

    // Validação básica
    if (workTime === undefined && shortBreakTime === undefined && longBreakTime === undefined) {
      return res.status(400).json({ error: 'Nenhum campo enviado para atualizar' });
    }

    // Busca ou cria o registro de settings
    let settings = await prisma.settings.findFirst();

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          workTime: workTime ?? 25,
          shortBreakTime: shortBreakTime ?? 5,
          longBreakTime: longBreakTime ?? 15,
        },
      });
    } else {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          ...(workTime !== undefined && { workTime }),
          ...(shortBreakTime !== undefined && { shortBreakTime }),
          ...(longBreakTime !== undefined && { longBreakTime }),
        },
      });
    }

    return res.json(settings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar settings' });
  }
};

module.exports = { getSettings, updateSettings };
