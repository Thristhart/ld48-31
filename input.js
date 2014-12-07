var dragStartX = 0;
var dragStartY = 0;
var dragging = false;

var cursorX = 0;
var cursorY = 0;
document.body.addEventListener("mousedown", function(event) {
  if(event.clientY > getSnowHeight()) {
    dragStart(event.clientX, event.clientY);
  }
  else {
    var snowman = getIntersectingSnowman(event.clientX, event.clientY);
    if(snowman) {
      snowmanDragTarget = snowman;
      dragStart(event.clientX, event.clientY);
    }
    else {
      var building = getIntersectingBlock(event.clientX, event.clientY);
      if(building && building.type == "block") {
        buildingDragTarget = building;
        dragStart(event.clientX, event.clientY);
      }
      else if(building && building.type == "lab") {
        convertingSnow = true;
      }
    }
  }
  if(!dragging)
    onClick(event.clientX, event.clientY);
});

document.body.addEventListener("mousemove", function(event) {
  cursorX = event.clientX;
  cursorY = event.clientY;
  if(dragging) {
    drag(dragStartX, dragStartY, event.clientX, event.clientY);
  }
});

document.body.addEventListener("mouseup", function(event) {
  if(dragging) {
    dragging = false;
    dragEnd(dragStartX, dragStartY, event.clientX, event.clientY);
  }
  if(convertingSnow) {
    showResearch = !showResearch;
    convertingSnow = false;
  }
});

var firstClick = true;
var snowmanDragTarget = null;
var buildingDragTarget = null;
var newSnowman = null;
var newBlock = null;
function onClick(x, y) {
  if(showResearch) {
    if(x > canvas.width / 4 && x < canvas.width * 3/4 && y > canvas.height / 4 && y < canvas.height / 2) {
      onResearchClick();
    }
  }
  if(state.researchIndex > 1) { //doubleclick
    spawnSnowflake(x, y);
  }
  spawnSnowflake(x, y);
  if(firstClick) {
    firstClick = false;
    messageFadeSpeed = 0.01;
    setTimeout(function() { 
      setMessage("keep clicking");
      setTimeout(function() {
        setMessage("cover the world in snow");
      }, 5000);
    }, 5000);
  }
}
var dragHeight = 0;
var snowDrag = false;
var storingSnow = false;
function dragStart(curX, curY) {
  if(snowmanDragTarget) {
    newBlock = new Block(curX, 0);
    drawObjects.push(newBlock);
  }
  else if(buildingDragTarget) {
    
  }
  else {
    snowDrag = true;
  }
  dragStartX = curX;
  dragStartY = curY;
  dragging = true;
}
function drag(startX, startY, curX, curY) {
  if(snowDrag && !newSnowman) {
    if(curY > canvas.height - state.snowLevel) {
      newSnowman = new Snowman(curX, 0);
      drawObjects.push(newSnowman);
    }
  }
  if(storingSnow) {
    dragHeight = curX - startX;
  }
  else if(newSnowman) {
    dragHeight = startY - curY;
    if(dragHeight < 0)
      dragHeight = 0;
    if(dragHeight > state.snowLevel)
      dragHeight = state.snowLevel;
    newSnowman.x = curX;
    newSnowman.size = dragHeight;
  }
  else if(newBlock) {
    dragHeight = curY - startY;
    if(dragHeight < 0)
      dragHeight = 0;
    if(dragHeight > snowmanDragTarget.size)
      dragHeight = snowmanDragTarget.size;
    newBlock.size = dragHeight / 2;
  }
  else if(buildingDragTarget) {
    var dx = buildingDragTarget.x - curX;
    var dy = getSnowHeight() - curY;
    var dist = dx * dx + dy * dy;
    var angle = Math.atan2(dy, dx) + Math.PI;
    if(dist > buildingDragTarget.size * buildingDragTarget.size) { // far enough out
      if(angle > Math.PI && angle < Math.PI + Math.PI / 4)
        buildingDragTarget.type = "armory";
      else if(angle > Math.PI + Math.PI / 4 && angle < Math.PI * 2 - Math.PI / 4)
        buildingDragTarget.type = "lab";
      else if(angle > Math.PI * 2 - Math.PI / 4 && angle < Math.PI * 2)
        buildingDragTarget.type = "stormcaller";
      else {
        buildingDragTarget.type = "block";
      }
      if(buildingDragTarget.type != "block") {
        setCursorHeader(buildingDragTarget.type);
        setCursorSubtitle(buildingDragTarget.getSubtitle());
      }
      else {
        setCursorHeader(null);
      }
    }
    else {
      buildingDragTarget.type = "block";
      setCursorHeader(null);
    }
  }
}
function dragEnd(startX, startY, curX, curY) {
  if(dragHeight === 0) { // cancel
    if(newSnowman) {
      newSnowman.flaggedForRemoval = true;
      newSnowman = null;
    }
    if(newBlock) {
      newBlock.flaggedForRemoval = true;
      newBlock = null;
    }
  }
  else {
    if(newSnowman) {
      state.snowLevel = state.snowLevel - dragHeight;
      if(firstSnowman) {
        setMessage("larger snowmen summon more snow", 20);
        firstSnowman = false;
      }
      newSnowman = null;
    }
    if(newBlock) {
      snowmanDragTarget.flaggedForRemoval = true;
      newBlock.size = snowmanDragTarget.size / 2;
      if(firstBlock) {
        setMessage("drag blocks in different directions to make buildings", 30);
        firstBlock = false;
      }
      newBlock = null;
      snowmanDragTarget = null;
    }
    if(storingSnow) {

    }
  }
  if(buildingDragTarget) {
    buildingDragTarget = null;
  }
  dragHeight = 0;
  dragging = false;
  setCursorHeader(null);
}
