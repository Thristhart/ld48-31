var canvas;
var context;
function setupDisplay() {
  canvas = document.createElement("canvas");
  canvas.id = "display";
  context = canvas.getContext("2d");

  document.body.appendChild(canvas);
  window.addEventListener("resize", onResize);
  onResize();

  console.log("Setup display");
}

var drawObjects = [];

function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

var lastFrameTime = Date.now();
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawSnowLine();
  
  for(var i = 0; i < drawObjects.length; i++) {
    if(drawObjects[i].flaggedForRemoval) {
      drawObjects.splice(i, 1);
      i--;
    }
    else
      drawObjects[i].draw();
  }
  if(message) {
    drawMessage();
    messageOpacity -= messageFadeSpeed;
    if(messageOpacity < 0) {
      message = null;
      messageOpacity = 1;
    }
  }
  if(cursorHeader)
    drawCursorMessage();
  if(showResearch) {
    drawResearch();
  }
  context.fillText(Math.round(1000/(Date.now() - lastFrameTime)), 20, 20);
  lastFrameTime = Date.now();
}

function getSnowHeight() {
  var h = canvas.height - state.snowLevel;
  if(newSnowman)
    h += dragHeight;
  if(h > canvas.height)
    return canvas.height;

  return h;
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

var showResearch = false;
var research = [
  ["The Art of Dance",
  "Snowmen with arms dance, summoning 2x more snow"],
  ["Doubleclick",
  "Summon two snowflakes with each click"],
  ["Heavy Snow",
  "Snowflakes carry twice as much snow"],
  ["Research coolant",
  "Hold down on a lab to convert snow to discoveries"],
  ["Mobilization",
  "Snowmen gain mobility and begin to wander"],
  ["Icicles",
  "Snowmen gather weapons to prepare for the coming war"],
  ["Invasion",
  "Snowmen move to conquer the warmbloods"]
];
function drawResearch() {
  context.font = "20px Arial";
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.lineWidth = 4;
  var nextResearch = research[state.researchIndex];
  if(!nextResearch)
    return;
  var name = nextResearch[0];
  context.strokeText(name, canvas.width / 2 - context.measureText(name).width/2, canvas.height / 4);
  context.fillText(name, canvas.width / 2 - context.measureText(name).width/2, canvas.height / 4);
  context.font = "12px Arial";
  var desc = nextResearch[1];
  context.strokeText(desc, canvas.width / 2 - context.measureText(desc).width/2, canvas.height / 4 + 20);
  context.fillText(desc, canvas.width / 2 - context.measureText(desc).width/2, canvas.height / 4 + 20);
  var cost = Math.pow(state.researchIndex + 1, 4);
  var costText = "Click here to spend " + cost + " discoveries to research";
  context.strokeText(costText, canvas.width / 2 - context.measureText(costText).width / 2, canvas.height / 4 + 40);
  context.fillText(costText, canvas.width / 2 - context.measureText(costText).width / 2, canvas.height / 4 + 40);
  var discoveries = "Discoveries: " + state.discoveries;
  context.strokeText(discoveries, canvas.width / 2 - context.measureText(discoveries).width / 2, canvas.height / 4 + 55);
  context.fillText(discoveries, canvas.width / 2 - context.measureText(discoveries).width / 2, canvas.height / 4 + 55);
}

function onResearchClick() {
  var cost = Math.pow(state.researchIndex + 1, 4);
  if(state.discoveries >= cost) {
    state.discoveries -= cost;
    state.researchIndex++;
  }
  else {
    setMessage("not enough discoveries");
  }
}

var messageOpacity = 1;
var message = "click";
var messageFadeSpeed = 0;
function drawMessage() {
  context.fillStyle = "rgba(255, 255, 255, " + messageOpacity + ")";
  context.strokeStyle = "rgba(0, 0, 0, " + messageOpacity + ")";
  context.font = "20pt Arial";
  context.lineWidth = 4;
  context.strokeText(message, canvas.width / 2 - context.measureText(message).width / 2, canvas.height / 2);
  context.fillText(message, canvas.width / 2 - context.measureText(message).width / 2, canvas.height / 2);
}
function drawCursorMessage() {
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.lineWidth = 4;
  context.font = "20pt Arial";
  var headerWidth = context.measureText(cursorHeader).width;
  if(headerWidth + cursorX < canvas.width) {
    context.strokeText(cursorHeader, cursorX, cursorY);
    context.fillText(cursorHeader, cursorX, cursorY);
  }
  else {
    context.strokeText(cursorHeader, cursorX - headerWidth, cursorY);
    context.fillText(cursorHeader, cursorX - headerWidth, cursorY);
  }
  context.font = "16pt Arial";
  var subWidth = context.measureText(cursorSubtitle).width;
  if(cursorX + subWidth < canvas.width) {
    context.strokeText(cursorSubtitle, cursorX, cursorY + 30);
    context.fillText(cursorSubtitle, cursorX, cursorY + 30);
  }
  else {
    context.strokeText(cursorSubtitle, cursorX - subWidth, cursorY + 30);
    context.fillText(cursorSubtitle, cursorX - subWidth, cursorY + 30);
  }
}

function setMessage(text, fadeTime) {
  if(!fadeTime) fadeTime = 10;
  message = text;
  messageFadeSpeed = 60/(fadeTime * 1000);
  messageOpacity = 1;
}
var cursorHeader;
var cursorSubtitle;
function setCursorHeader(text) {
  cursorHeader = text;
}
function setCursorSubtitle(text) {
  cursorSubtitle = text;
}
