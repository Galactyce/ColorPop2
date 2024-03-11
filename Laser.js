function Laser() {
    this.origin = new powerupjs.Vector2(4, 1);
    this.position = new powerupjs.Vector2(0, 0);
    this.velocity = new powerupjs.Vector2(0, 0);
    this.type = 'laser';
    this.active = true;
    this.scale = 7;
    this.hitCount = 0;
    this.rotation = 0;
    this.maxHitCount = 2;
    this.reset();
    this.currentColor = powerupjs.Game.gameWorld.cannon.currentColor;
  }
  
  Laser.prototype.reset = function () {
    this.position = powerupjs.Game.gameWorld.cannon.ballPosition().subtractBy(this.origin);
    this.rotation = powerupjs.Game.gameWorld.cannon.rotation;
    this.velocity = Mouse.position.subtract(this.position).multiplyBy(6.5);
    
  
  };
  
  Laser.prototype.draw = function () {
    if (this.active)
      Canvas.drawImage(
        sprites.balls[this.currentColor].laser,
        this.position,
        this.rotation,
        this.origin,
        this.scale
      );
  };
  
  Laser.prototype.update = function (delta) {
    if (this.active === false) return;
   
    this.position.addTo(this.velocity.multiply(delta));
  };
  
  Laser.prototype.handleInput = function () { };
  