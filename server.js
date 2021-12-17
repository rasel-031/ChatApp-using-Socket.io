const express = require("express");
const app = express();
const socket = require("socket.io");

var server = app.listen(3001, () => {
  console.log("Server is running on port: 3001.");
  console.log("Please, go to this link: " + "http://localhost:3001/app");
});

//start scoket io
const io = socket(server);

io.on("connection", (socket) => {
  console.log("Connection established on ID: " + socket.id);
  //for chat event
  socket.on("chat", (data) => {
    //for msg to client
    io.emit("msg", data);
  });
});
//end socket io

app.use(express.static("Public"));

app.use("/app", (req, res) => {
  res.sendFile(__dirname + "/Public/chatapp.html");
});

app.use((req, res) => {
  res.status(404);
  res.send("Opps..404 Page Not Found.");
});
