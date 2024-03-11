function Balloon(xPosition, index, color, health) {
  powerupjs.SpriteGameObject.call(this, sprites.balloons[color].normal, 1);
  this.position = new powerupjs.Vector2(xPosition, -100);
  this.noColor = false;   // Can be popped by any color ball
  this.currentColor = color;
  this.health = health;
  this.velocity = new powerupjs.Vector2(0, 0);
  this.origin = new powerupjs.Vector2(60, 60);
  this.index = index;
  this.setState();  // Set different functions based on the type of balloon
  this.calculateRandomVelocity();
  this.moveToTop();
}

Balloon.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Balloon.prototype.setState = function () {
  if (this.currentColor == 'rainbow') {
    this.noColor = true;
  }
  else if (this.currentColor == 'metal') {
    this.noColor = true;
    this.health = 10;
  }
  else if (this.currentColor == 'bomb') {
    this.noColor = true;
  }
}

Balloon.prototype.moveToTop = function () {
  this.position.y = -Math.random() * 100 - 100;
};





Balloon.prototype.calculateRandomVelocity = function () {
  this.velocity.y = Math.random() * 20 + powerupjs.Game.gameWorld.balloonMinVelocity;
};

Balloon.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  if (powerupjs.Game.gameWorld.moving === true) {
    this.position.addTo(this.velocity.multiply(delta));

  }

  if (this.currentColor == 'metal') {
    if (this.health <= 3) {
      this.sprite = sprites.balloons['metal_damaged'].normal

    }
    if (this.health <= 6 && this.health > 3) {
      this.sprite = sprites.balloons['metal_cracked'].normal

    }
    if (this.health > 6) {
      this.sprite = sprites.balloons[this.currentColor].normal

    }
  }
  else {
    this.sprite = sprites.balloons[this.currentColor].normal

  }
  this.rect = new powerupjs.Rectangle(
    this.position.x - this.origin.x,
    this.position.y - this.origin.y,
    sprites.balloons[this.currentColor].normal.width,
    sprites.balloons[this.currentColor].normal.height
  )



};



