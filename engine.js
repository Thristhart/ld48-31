function setupEngine() {
  loadState();
  setupDisplay();

  tick();
}

var firstSnowman = true;

var frameTime = Date.now();
function tick() {
  frameTime = Date.now();
  draw();

  if(firstSnowman && state.snowLevel > 10) {
    setMessage("drag fallen snow");
    messageFadeSpeed = 0;
  }
  window.requestAnimationFrame(tick);
}

function spawnSnowflake(x, y) {
  var flake = new Snowflake(x, y);
  drawObjects.push(flake);
}
window.addEventListener("load", setupEngine);


