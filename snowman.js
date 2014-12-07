var SNOWMAN_SUMMON_FACTOR = 50000;
function Snowman(x, size) {
  this.x = x;
  this.size = size;
  this.lastSnowSummon = Date.now();
  this.leftArm = false;
  this.leftArmAngle = Math.PI;
  this.rightArm = false;
  this.rightArmAngle = Math.PI * 2;
  this.leftArmDanceDir = 1;
  this.rightArmDanceDir = -1;
  this.wanderDir = Math.random() > 0.5 ? 1 : -1;
  this.draw = function() {
    if(this.flaggedForRemoval)
      return;
    var snowInterval = SNOWMAN_SUMMON_FACTOR / this.size;
    if(state.researchIndex > 0 && (this.leftArm || this.rightArm)) {
      snowInterval /= 2;
    }
    if(newSnowman != this && Date.now() > this.lastSnowSummon + snowInterval) {
      this.lastSnowSummon = Date.now();
      spawnSnowflake(this.x, this.size + getSnowHeight());
    }
    context.fillStyle = "white";
    var mySize = this.size;
    if(snowmanDragTarget == this)
      mySize -= dragHeight;
    var baseRadius = mySize / 2;
    var secondRadius = mySize * 0.3;
    var thirdRadius = mySize * 0.2;

    if(baseRadius < 1)
      return;

    context.beginPath();
    context.moveTo(this.x, getSnowHeight() - baseRadius);
    context.arc(this.x, getSnowHeight() - baseRadius, baseRadius, 0, Math.PI * 2);
    context.moveTo(this.x, getSnowHeight() - baseRadius - secondRadius * 2);
    context.arc(this.x, getSnowHeight() - baseRadius - secondRadius * 2, secondRadius, 0, Math.PI * 2);
    context.moveTo(this.x, getSnowHeight() - baseRadius - secondRadius * 2 - thirdRadius * 2);
    context.arc(this.x, getSnowHeight() - baseRadius - secondRadius * 2 - thirdRadius * 2, thirdRadius, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    if(newSnowman != this && !this.leftArm || !this.rightArm) {
      if(sticks.length > 0) {
        var myStick = sticks.shift();
        myStick.flaggedForRemoval = true;
        if(!this.leftArm && !this.rightArm) {
          if(Math.random() > 0.5) this.rightArm = true; else this.leftArm = true;
        }
        else if(this.leftArm)
          this.rightArm = true;
        else
          this.leftArm = true;
      }
    }
    if(state.researchIndex > 0) { // snowman dance researched
      this.leftArmAngle += 0.01 * this.leftArmDanceDir;
      if(this.leftArmAngle > Math.PI + Math.PI / 8)
        this.leftArmDanceDir *= -1;
      if(this.leftArmAngle < Math.PI - Math.PI / 8)
        this.leftArmDanceDir *= -1;
      this.rightArmAngle += 0.01 * this.rightArmDanceDir;
      if(this.rightArmAngle > Math.PI * 2 + Math.PI / 8)
        this.rightArmDanceDir *= -1;
      if(this.rightArmAngle < Math.PI * 2 - Math.PI / 8)
        this.rightArmDanceDir *= -1;

    }

    if(state.researchIndex > 4) { // mobility
      if(state.researchIndex > 6) {
        this.wanderDir = 4;
        if(this.x > canvas.width)
          this.flaggedForRemoval = true;
      }
      else {
        if(this.x < 0 || this.x > canvas.width)
          this.wanderDir *= -1;
      }
      this.x += this.wanderDir * 0.5;
    }

    if(this.leftArm) {
      context.strokeStyle = "brown";
      context.beginPath();
      context.moveTo(this.x - secondRadius, getSnowHeight() - baseRadius - secondRadius * 2);
      context.lineTo(this.x - secondRadius + Math.cos(this.leftArmAngle) * this.size / 2, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.leftArmAngle) * this.size / 2);
      context.moveTo(this.x - secondRadius + Math.cos(this.leftArmAngle) * this.size * 2/5, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.leftArmAngle) * this.size * 2/5);
      context.lineTo(this.x - secondRadius + Math.cos(this.leftArmAngle + 0.1) * this.size / 2, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.leftArmAngle + 0.1) * this.size / 2);
      context.moveTo(this.x - secondRadius + Math.cos(this.leftArmAngle) * this.size * 2/5, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.leftArmAngle) * this.size * 2/5);
      context.lineTo(this.x - secondRadius + Math.cos(this.leftArmAngle - 0.1) * this.size / 2, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.leftArmAngle - 0.1) * this.size / 2);
      context.closePath();
      context.stroke();
      if(state.researchIndex > 5) { // icicles
        context.fillStyle = "rgb(101, 134, 153)";
        context.beginPath();
        context.moveTo(this.x - secondRadius + Math.cos(this.leftArmAngle - 0.1) * this.size / 2, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.leftArmAngle - 0.1) * this.size / 2); 
        context.lineTo(this.x - secondRadius + Math.cos(this.leftArmAngle - 0.1) * this.size / 2 + Math.cos(this.leftArmAngle + Math.PI / 2) * this.size / 2, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.leftArmAngle - 0.1) * this.size / 2 + Math.sin(this.leftArmAngle + Math.PI / 2) * this.size);
        context.lineTo(this.x - secondRadius + Math.cos(this.leftArmAngle - 0.1) * this.size * 2/5, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.leftArmAngle - 0.1) * this.size * 2/5);
        context.closePath();
        context.fill();
      }
    }
    if(this.rightArm) {
      context.strokeStyle = "brown";
      context.beginPath();
      context.moveTo(this.x + secondRadius, getSnowHeight() - baseRadius - secondRadius * 2);
      context.lineTo(this.x + secondRadius + Math.cos(this.rightArmAngle) * this.size / 2, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.rightArmAngle) * this.size / 2);
      context.moveTo(this.x + secondRadius + Math.cos(this.rightArmAngle) * this.size * 2/5, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.rightArmAngle) * this.size * 2/5);
      context.lineTo(this.x + secondRadius + Math.cos(this.rightArmAngle + 0.1) * this.size / 2, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.rightArmAngle + 0.1) * this.size / 2);
      context.moveTo(this.x + secondRadius + Math.cos(this.rightArmAngle) * this.size * 2/5, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.rightArmAngle) * this.size * 2/5);
      context.lineTo(this.x + secondRadius + Math.cos(this.rightArmAngle - 0.1) * this.size / 2, getSnowHeight() - baseRadius - secondRadius * 2 + Math.sin(this.rightArmAngle - 0.1) * this.size / 2);
      context.closePath();
      context.stroke();
    }
  };
}

function getIntersectingSnowman(x, y) {
  for(var i = 0; i < drawObjects.length; i++) {
    var obj = drawObjects[i];
    if(obj instanceof Snowman && !obj.flaggedForRemoval) {
      if(x > obj.x - obj.size / 2 && y > getSnowHeight() - obj.size * 2 &&
         x < obj.x + obj.size / 2 && y < getSnowHeight())
        return obj;
    }
  }
  return null;
}
