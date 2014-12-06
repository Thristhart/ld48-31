var dragStartX = 0;
var dragStartY = 0;
var dragging = false;

document.body.addEventListener("mousedown", function(event) {
  if(event.clientY > getSnowHeight()) {
    dragStart(event.clientX, event.clientY);
  }
  onClick(event.clientX, event.clientY);
});

document.body.addEventListener("mousemove", function(event) {
  if(dragging) {
    drag(dragStartX, dragStartY, event.clientX, event.clientY);
  }
});

document.body.addEventListener("mouseup", function(event) {
  if(dragging) {
    dragging = false;
    dragEnd(dragStartX, dragStartY, event.clientX, event.clientY);
  }
});

var firstClick = true;
function onClick(x, y) {
  spawnSnowflake(x, y);
  if(firstClick) {
    firstClick = false;
    messageFadeSpeed = 0.01;
  }
}
var dragHeight = 0;
function dragStart(curX, curY) {
  newSnowman = new Snowman(curX, 0);
  drawObjects.push(newSnowman);
  dragStartX = curX;
  dragStartY = curY;
  dragging = true;
}
function drag(startX, startY, curX, curY) {
  dragHeight = startY - curY;
  if(dragHeight < 0)
    dragHeight = 0;
  if(dragHeight > state.snowLevel)
    dragHeight = state.snowLevel;
  newSnowman.x = curX;
  newSnowman.size = dragHeight;
}
function dragEnd(startX, startY, curX, curY) {
  if(dragHeight === 0) { // cancel
    newSnowman.flaggedForRemoval = true;
  }
  else {
    state.snowLevel = state.snowLevel - dragHeight;
    if(firstSnowman) {
      setMessage("larger snowmen summon more snow", 20);
      firstSnowman = false;
    }
  }
  dragHeight = 0;
  newSnowman = null;
}
