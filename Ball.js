function Ball() {
  this.currentColor = powerupjs.Game.gameWorld.find(ID.cannon).currentColor;

  powerupjs.SpriteGameObject.call(this, sprites.balls[this.currentColor].lobber, 1, 0, 0);
  this.origin = new powerupjs.Vector2(10, 10);
  this.position = new powerupjs.Vector2(0, 0);
  this.velocity = new powerupjs.Vector2(0, 0);
  this.type = 'lobber';
  this.active = true;
  this.scale = 1;

  this.reset();
}

Ball.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Ball.prototype.reset = function () {
  this.position = powerupjs.Game.gameWorld.find(ID.cannon).ballPosition().subtractBy(this.origin);
  console.log(powerupjs.Game.gameWorld.currentLobberCharm);
  this.velocity = Mouse.position.subtract(this.position);
  if (powerupjs.Game.gameWorld.currentLobberCharm == 'doubleshot') {
    this.velocity = Mouse.position
      .subtract(this.position)
      .multiplyBy(Math.random() * 0.3 + 0.8);
  }


};


Ball.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  if (this.active === false) return;
  this.velocity.x *= 0.99;
  this.velocity.y += 6;
  this.position.addTo(this.velocity.multiply(delta));
};

