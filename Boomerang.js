function Boomerang() {
  this.currentColor = powerupjs.Game.gameWorld.find(ID.cannon).currentColor;

  powerupjs.SpriteGameObject.call(this, sprites.balls[this.currentColor].boomerang, 1, 0, 0);
  this.origin = new powerupjs.Vector2(20, 20);
  this.position = new powerupjs.Vector2(0, 0);
  this.velocity = new powerupjs.Vector2(0, 0);
  this.type = 'boomerang';
  this.active = true;
  this.scale = 1;
  this.initialXVelo = 0;
  this.reset();
}

Boomerang.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Boomerang.prototype.reset = function () {
  this.position = powerupjs.Game.gameWorld.find(ID.cannon).ballPosition().subtractBy(this.origin);
  this.velocity = Mouse.position.subtract(this.position);
  this.initialXVelo = this.velocity.x;
};


Boomerang.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  if (this.active === false) return;
  this.velocity.x -= (delta * this.initialXVelo * 0.9);

  if (this.velocity.x < 0 && this.position.x < 500 && powerupjs.Game.gameWorld.currentBoomerangCharm == 'extraloopy') {
    this.initialXVelo = Math.abs(this.initialXVelo) * -1;
  }

  this.rotation += delta * 20;
  if (this.velocity.x > 0) {
    this.velocity.y -= 6;
  }
  else {
    this.velocity.y += 6;
  }
  this.position.addTo(this.velocity.multiply(delta));
};

