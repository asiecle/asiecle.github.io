// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let currentTime = 0; // Tiempo en centésimas de segundo
let interval = null;

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.action === "start") {
      if (!interval) {
        interval = setInterval(() => {
          currentTime++;
          broadcastTime();
        }, 10); // Actualiza cada 10 ms (centesimas)
      }
    } else if (data.action === "pause") {
      clearInterval(interval);
      interval = null;
    } else if (data.action === "reset") {
      clearInterval(interval);
      interval = null;
      currentTime = 0;
      broadcastTime();
    } else if (data.action === "toggleVisibility") {
      const textoMessage = JSON.stringify({ type: "checkboxState", checked: data.visible});
      wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
      client.send(textoMessage);
    }
    });
    }
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

function broadcastTime() {
  const timeMessage = JSON.stringify({ type: "time", time: currentTime });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(timeMessage);
    }
  });
}

app.use(express.static("public")); // Sirve archivos estáticos de la carpeta "public"

// Inicia el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
