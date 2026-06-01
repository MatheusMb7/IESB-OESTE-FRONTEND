// src/server.js
const express = require('express');
const routes = require('./routes');

const app = express();

// Middleware para ler JSON no body das requisições
app.use(express.json());

// Rotas
app.use(routes);

// Inicia o servidor
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`✅ Servidor Chronos rodando em http://localhost:${PORT}`);
});
