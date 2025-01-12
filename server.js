const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let connections = [];

// Manejo de conexiones WebSocket
wss.on("connection", (ws) => {
  connections.push(ws);
  console.log("Client connected. Total clients:", connections.length);

  // Escuchar mensajes del cliente
  ws.on("message", (message) => {
    console.log("Message received:", message);

    // Reenviar el mensaje a todos los clientes excepto al emisor
    connections.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Eliminar la conexión cerrada
  ws.on("close", () => {
    connections = connections.filter((client) => client !== ws);
    console.log("Client disconnected. Total clients:", connections.length);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
