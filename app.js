const express = require("express");
const app = express();

const path = require("path");

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const animals = require("./data/animals.json");
const { randomInt } = require("crypto");

app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const connectedUsers = [];

io.on("connection", (socket) => {
  const animal = randomInt(animals.length);
  const username = animals[animal];

  connectedUsers.push(username);

  io.sockets.emit("user connect", username);

  socket.on("disconnect", () => {
    io.sockets.emit("user disconnect", username);
  });

  socket.on("send msg", (msg) => {
    io.sockets.emit("send msg", { username, msg });
  });
});

server.listen(80, () => {
  console.log("Server Started");
});
