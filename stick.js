var STICK_LENGTH = 15;
function Stick(x) {
  this.x = x;
  this.angle = Math.random() * Math.PI / 8 - Math.PI / 4;
  this.draw = function() {
    context.strokeStyle = "brown";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.x - Math.cos(this.angle) * STICK_LENGTH, getSnowHeight() - Math.sin(this.angle) * STICK_LENGTH);
    context.lineTo(this.x + Math.cos(this.angle) * STICK_LENGTH, getSnowHeight() + Math.sin(this.angle) * STICK_LENGTH);
    context.closePath();
    context.stroke();
  };
}

var sticks = [];
