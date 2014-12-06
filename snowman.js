var SNOWMAN_SUMMON_FACTOR = 50000;
function Snowman(x, size) {
  this.x = x;
  this.size = size;
  this.lastSnowSummon = Date.now();
  this.draw = function() {
    if(newSnowman != this && Date.now() > this.lastSnowSummon + SNOWMAN_SUMMON_FACTOR / this.size) {
      this.lastSnowSummon = Date.now();
      spawnSnowflake(this.x, this.size + getSnowHeight());
    }
    context.fillStyle = "white";
    var baseRadius = this.size / 2;
    var secondRadius = this.size * 0.3;
    var thirdRadius = this.size * 0.2;

    context.beginPath();
    context.moveTo(this.x, getSnowHeight() - baseRadius);
    context.arc(this.x, getSnowHeight() - baseRadius, baseRadius, 0, Math.PI * 2);
    context.moveTo(this.x, getSnowHeight() - baseRadius - secondRadius * 2);
    context.arc(this.x, getSnowHeight() - baseRadius - secondRadius * 2, secondRadius, 0, Math.PI * 2);
    context.moveTo(this.x, getSnowHeight() - baseRadius - secondRadius * 2 - thirdRadius * 2);
    context.arc(this.x, getSnowHeight() - baseRadius - secondRadius * 2 - thirdRadius * 2, thirdRadius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  };
}
