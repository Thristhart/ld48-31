function Snowstorm() {
  this.spawnTime = Date.now();
  this.duration = 3000;
  this.draw = function() {
    spawnSnowflake(Math.random() * canvas.width, Math.random() * canvas.height);
    if(Date.now() - this.spawnTime > this.duration)
      this.flaggedForRemoval = true;
  };
}
