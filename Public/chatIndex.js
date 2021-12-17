var socket = io();
socket.on("connect", () => {
  console.log("Connection Established.");
});

var uname = document.getElementById("name");
var message = document.getElementById("message");
var output = document.getElementById("output");

const handleMessage = () => {
  if (uname.value === "" || message.value === "") {
    alert("Please, text must be filled out");
  } else {
    socket.emit("chat", { name: uname.value, message: message.value });
    uname.value = "";
    message.value = "";
  }
};

socket.on("msg", (data) => {
  var div = document.createElement("DIV");
  div.className = "msg-div";
  var para = document.createElement("SPAN");
  para.innerHTML = `<b>${data.name}: </b>${data.message}`;
  para.className = "msg-para";
  div.appendChild(para);
  output.appendChild(div);
});
