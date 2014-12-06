function Snowflake(x, y) {
  this.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.10;
  this.y = 0;
  this.radius = 5;
  this.frameCount = Math.random() * 100;
  this.sway = Math.random() * 3;
  this.angle = Math.random() * Math.PI / 2 - Math.PI / 4;
  this.draw = function() {
    context.fillStyle = "white";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    this.y += state.flakeFallSpeed;
    this.x += Math.sin(this.frameCount) * this.sway + Math.cos(this.angle);
    
    this.frameCount += 0.01;

    if(this.y > canvas.height - state.snowLevel) {
      state.snowLevel += state.flakePayload;
      this.flaggedForRemoval = true;
      state.lump3 = state.lump2;
      state.lump2 = state.lump1;
      state.lump1 = this.x;
    }
  };
}
