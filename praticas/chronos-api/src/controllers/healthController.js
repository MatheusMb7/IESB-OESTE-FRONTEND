// src/controllers/healthController.js

const healthCheck = (req, res) => {
  return res.json({ ok: true });
};

module.exports = { healthCheck };
