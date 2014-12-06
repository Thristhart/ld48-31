var canvas;
var context;
function setupDisplay() {
  canvas = document.createElement("canvas");
  canvas.id = "display";
  context = canvas.getContext("2d");

  document.body.appendChild(canvas);

  console.log("Setup display");
}

var drawObjects = [];

function draw() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; // clear, and fit to screen

  drawSnowLine();
  if(message) {
    drawMessage();
    messageOpacity -= messageFadeSpeed;
    if(messageOpacity < 0) {
      message = null;
      messageOpacity = 1;
    }
  }

  for(var i = 0; i < drawObjects.length; i++) {
    drawObjects[i].draw();
    if(drawObjects[i].flaggedForRemoval) {
      drawObjects.splice(i, 1);
      i--;
    }
  }
}

function getSnowHeight() {
  return canvas.height - state.snowLevel + dragHeight;
}
function drawSnowLine() {
  context.fillStyle = "white";
  context.fillRect(0, getSnowHeight(), canvas.width, state.snowLevel);

  context.beginPath();
  context.moveTo(state.lump3, getSnowHeight());
  context.arc(state.lump3, getSnowHeight(), 2, 0, Math.PI * 2);
  context.moveTo(state.lump2, getSnowHeight());
  context.arc(state.lump2, getSnowHeight(), 3, 0, Math.PI * 2);
  context.moveTo(state.lump1, getSnowHeight());
  context.arc(state.lump1, getSnowHeight(), 4, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}

var messageOpacity = 1;
var message = "click";
var messageFadeSpeed = 0;
function drawMessage() {
  context.fillStyle = "rgba(255, 255, 255, " + messageOpacity + ")";
  context.font = "20pt Arial";
  context.fillText(message, canvas.width / 2 - context.measureText(message).width / 2, canvas.height / 2);
}

function setMessage(text, fadeTime) {
  if(!fadeTime) fadeTime = 10;
  message = text;
  messageFadeSpeed = 60/(fadeTime * 1000);
  messageOpacity = 1;
}
