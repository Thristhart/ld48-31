function setupEngine() {
  setupDisplay();

  loadState();
  //resetState(); // for debug purposes
  tick();
}

var firstSnowman = true;
var firstBlock = true;

var frameTime = Date.now();
var lastSave = Date.now();
function tick() {
  frameTime = Date.now();
  if(frameTime - lastSave > 5000) {
    saveState();
    lastSave = Date.now();
  }
  draw();

  if(firstSnowman && state.snowLevel > 10) {
    setMessage("drag fallen snow");
    messageFadeSpeed = 0;
  }
  if(firstBlock) {
    for(var i = 0; i < drawObjects.length; i++) {
      if(drawObjects[i] instanceof Snowman && drawObjects[i].size > 30) {
        setMessage("drag snowmen down");
        messageFadeSpeed = 0;
      }
    }
  }

  if(convertingSnow && state.researchIndex > 3 && state.snowLevel > 0) {
    state.snowLevel -= 5;
    state.discoveries++;
  }
  if(state.researchIndex > 6) {
    if(state.snowLevel < canvas.height * 1.25)
      state.snowLevel++;
    if(state.snowLevel > canvas.height) {
      setMessage("congratulations, snow now blankets the earth");
      messageFadeSpeed = 0;
      showResearch = false;
    }
  }
  window.requestAnimationFrame(tick);
}

var convertingSnow = false;

function spawnSnowflake(x, y) {
  var flake = new Snowflake(x, y);
  drawObjects.push(flake);
}
window.addEventListener("load", setupEngine);


