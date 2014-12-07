function Block(x, size) {
  this.x = x;
  this.size = size;
  this.type = "block";
  this.lastTrigger = Date.now();
  this.draw = function() {
    //context.fillStyle = "rgba(169, 224, 255, 0.6)";
    context.fillStyle = "white";
    var difference;
    if(this.type == "block") {
      context.moveTo(this.x, getSnowHeight() - this.size);
      context.fillRect(this.x - this.size / 2, getSnowHeight() - this.size, this.size, this.size);
    }
    if(this.type == "armory") {
      context.fillRect(this.x - this.size / 2, getSnowHeight() - this.size / 2, this.size, this.size / 2);
      context.fillRect(this.x - this.size / 2, getSnowHeight() - (this.size - this.size / 8), this.size / 4, this.size / 2 - this.size/8 + 1);
      context.fillRect(this.x + this.size / 2 - this.size / 4, getSnowHeight() - (this.size - this.size / 8), this.size / 4, this.size / 2 - this.size/8 + 1);

      difference = Date.now() - this.lastTrigger;
      if(buildingDragTarget != this && difference/1000 > 3000 / this.size) {
        console.log("stick");
        var stick = new Stick(Math.random() * this.size * 2 - this.size + this.x);
        drawObjects.push(stick);
        sticks.push(stick);
        this.lastTrigger = Date.now();
      }
    }
    else if(this.type == "lab") {
      context.fillRect(this.x - this.size / 2, getSnowHeight() - this.size / 2, this.size, this.size / 2);
      context.beginPath();
      context.moveTo(this.x - this.size / 2, getSnowHeight() - this.size / 2 + 1);
      context.lineTo(this.x, getSnowHeight() - this.size);
      context.lineTo(this.x + this.size / 2, getSnowHeight() - this.size / 2 + 1);
      context.closePath();
      context.fill();
      var interval = Math.round(this.size / 60);
      if(interval > 0) {
        difference = Date.now() - this.lastTrigger;
        if(difference > 1000) {
          state.discoveries += interval;
          this.lastTrigger = Date.now();
        }
      }
    }
    else if(this.type == "stormcaller") {
      context.fillStyle = "white";
      context.fillRect(this.x - this.size / 2, getSnowHeight() - this.size / 2, this.size, this.size / 2);
      context.fillRect(this.x - this.size / 20, getSnowHeight() - this.size, this.size / 10, this.size / 2);
      context.fillRect(this.x - this.size / 4, getSnowHeight() - this.size * 3/4, this.size / 2, this.size / 10);
      context.fillRect(this.x - this.size / 10, getSnowHeight() - this.size * 9/10, this.size / 5, this.size / 10);
      
      difference = Date.now() - this.lastTrigger;
      if(buildingDragTarget != this) {
        context.beginPath();
        context.moveTo(this.x, getSnowHeight() - this.size);
        context.arc(this.x, getSnowHeight() - this.size, this.size / 2 * (difference/2000)/(2000/this.size/2), 0, Math.PI * 2);
        context.closePath();
        context.fill();
        var secondsRemaining = (2000 / this.size) - difference / 1000;
        if(secondsRemaining < 3) {
          context.fillRect(this.x - this.size / 4 * secondsRemaining / 3, 0, this.size / 2 * secondsRemaining / 3, getSnowHeight() - this.size);
        }
        if(difference/1000 > 2000 / this.size) {
          this.lastTrigger = Date.now();
          drawObjects.push(new Snowstorm());
        }
      }
    }
  };
  this.getSubtitle = function() {
    var interval = Math.round(this.size / 60);
    if(this.type == "armory") {
      return "produces 1 stick every " + Math.round(3000 / this.size) + " seconds";
    }
    if(this.type == "lab") {
      return "makes " + interval + " " + (interval != 1 ? "discoveries":"discovery") + " per second";
    }
    if(this.type == "stormcaller") {
      return "summons a snowstorm every " + Math.round(2000 / this.size) + " seconds";
    }
  };
}
function getIntersectingBlock(x, y) {
  for(var i = drawObjects.length - 1; i >= 0; i--) {
    var obj = drawObjects[i];
    if(obj instanceof Block) {
      if(x > obj.x - obj.size / 2 && y > getSnowHeight() - obj.size &&
         x < obj.x + obj.size / 2 && y < getSnowHeight())
        return obj;
    }
  }
  return null;
}
