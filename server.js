const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let timer = 0;
let interval = null;

// Servir la página web estática
app.use(express.static('public'));

// Manejo de conexiones WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Enviar el tiempo inicial al cliente
  ws.send(JSON.stringify({ type: 'update', timer }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'start') {
      if (!interval) {
        interval = setInterval(() => {
          timer++;
          broadcast({ type: 'update', timer });
        }, 1000);
      }
    } else if (data.type === 'stop') {
      clearInterval(interval);
      interval = null;
    } else if (data.type === 'reset') {
      timer = 0;
      broadcast({ type: 'update', timer });
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Función para enviar mensajes a todos los clientes conectados
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

