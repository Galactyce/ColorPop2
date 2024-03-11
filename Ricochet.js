function Richochet() {
    this.origin = new powerupjs.Vector2(10, 10);
    this.position = new powerupjs.Vector2(0, 0);
    this.velocity = new powerupjs.Vector2(0, 0);
    this.type = 'richochet';
    this.bounces = 0;
    this.maxBounces = 2;
    this.bounceForce = -300;
    this.active = true;
    this.initialXVelo = 0;
    this.reset();
    this.currentColor = powerupjs.Game.gameWorld.cannon.currentColor;
  }
  
  Richochet.prototype.reset = function () {
  
    this.position = powerupjs.Game.gameWorld.cannon.ballPosition().subtractBy(this.origin);
  
    this.velocity = Mouse.position.subtract(this.position).multiplyBy(1.5);
  
  
  };
  
  Richochet.prototype.draw = function () {
    if (this.active)
      Canvas.drawImage(
        sprites.balls[this.currentColor].lobber,
        this.position,
        0,
        this.origin
      );
  };
  
  Richochet.prototype.update = function (delta) {
    if (this.active === false) return;
    this.velocity.x *= 0.99;
    this.velocity.y += 6;
    this.position.addTo(this.velocity.multiply(delta));


  };
  
  Richochet.prototype.Bounce = function () {
    this.velocity.y = this.bounceForce;
    this.velocity.x *= -1;
    this.bounces++;
  }

  Richochet.prototype.handleInput = function () { };
  