function Cannon() {
  powerupjs.SpriteGameObject.call(this, sprites.cannon_parts['red'].normal, 1, 0, 1, 1)
  this.currentColor = "red";
  this.position = new powerupjs.Vector2(220, 550);
  this.origin = new powerupjs.Vector2(0, 20);
  this.velocity = new powerupjs.Vector2(0, 0);
  this.barrelRotation = 0;
  this.projectileType1 = 'lobber';
  this.projectileType2 = 'boomerang';
  this.projectileType3 = 'laser';

  this.currentProjectileType = this.projectileType1;
  this.fireDate = 0;
  this.attackSpeed = 1000;


  this.barrel = new powerupjs.SpriteGameObject(sprites.cannon_parts['barrel'].normal, 0);
  this.barrel.scale = 1;
  this.barrel.origin = new powerupjs.Vector2(0, 20);
  this.barrel.position = new powerupjs.Vector2(this.position.x + 110, this.position.y + 30);
}

Cannon.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Cannon.prototype.draw = function () {
  if (powerupjs.Game.gameWorld.state != 'playing') return;

  this.sprite = sprites.cannon_parts[this.currentColor].normal
  this.barrel.rotation = this.barrelRotation;
  this.barrel.draw();
  powerupjs.SpriteGameObject.prototype.draw.call(this);

};

Cannon.prototype.ballPosition = function () {
  var opp = Math.sin(this.barrelRotation) * this.barrel.width;
  var adj = Math.cos(this.barrelRotation) * this.barrel.width;
  return new powerupjs.Vector2(this.barrel.position.x + adj, this.barrel.position.y + opp);
};

Cannon.prototype.shoot = function () {

  if ((Date.now() > this.fireDate + this.attackSpeed && !this.disabled) ||
    (powerupjs.Game.gameWorld.currentLobberCharm == 'semi' && this.currentProjectileType == 'lobber'
      && Date.now() > this.fireDate + (this.attackSpeed / 0.5) && !this.disabled)) {
    this.fireDate = Date.now();
    if (Touch.isTouchDevice) {
      this.velocity = Touch.getPosition(0).subtract(this.position).multiplyBy(1.1);
    }
    else {
      this.velocity = Mouse.position.subtract(this.position).multiplyBy(1.2);
    } sounds.cannonShot.play();

    if (this.currentProjectileType == 'lobber') {
      powerupjs.Game.gameWorld.projectiles.push(new Ball());
      if (powerupjs.Game.gameWorld.currentLobberCharm == 'doubleshot') {
        this.velocity = Mouse.position.subtract(this.position).multiplyBy(1.2);
        powerupjs.Game.gameWorld.projectiles.push(new Ball());
      }
    }
    else if (this.currentProjectileType == 'boomerang')
      powerupjs.Game.gameWorld.projectiles.push(new Boomerang());
    else if (this.currentProjectileType == 'richochet')
      powerupjs.Game.gameWorld.projectiles.push(new Richochet());
    else if (this.currentProjectileType == 'laser')
      powerupjs.Game.gameWorld.projectiles.push(new Laser());
  }
  // if (powerupjs.Game.gameWorld.currentLobberCharm == 'semi' && this.ammoCount > 0) {
  //   this.ammoCount--;
  //   if (this.ammoCount <= 0) {
  //     this.reloadDate = Date.now();
  //     this.disabled = true;
  //   }
  // }
};

Cannon.prototype.handleInput = function (delta) {
  if (powerupjs.Game.gameWorld.state != 'playing') return;
  if (powerupjs.Game.gameWorld.paused) return;

  powerupjs.SpriteGameObject.prototype.handleInput.call(this, delta);
  if (Keyboard.keyDown === 49) {
    this.currentProjectileType = this.projectileType1;
  }
  if (Keyboard.keyDown === 50) {
    this.currentProjectileType = this.projectileType2;
  }
  // if (Keyboard.keyDown === 51) {
  //   this.currentProjectileType = this.projectileType3;
  // }

  if (this.currentProjectileType == 'lobber') {
    this.attackSpeed = 150;
    if (powerupjs.Game.gameWorld.lobberTier >= 1) {
      this.attackSpeed = 150;
    }
  }
  else if (this.currentProjectileType == 'boomerang') {
    this.attackSpeed = 800;
  }
  else if (this.currentProjectileType == 'richochet') {
    this.attackSpeed = 1000;
  }
  else if (this.currentProjectileType == 'laser') {
    this.attackSpeed = 1000;
  }

  if (Keyboard.keyDown === 66) this.currentColor = "blue";
  if (Keyboard.keyDown === 71) this.currentColor = "green";
  if (Keyboard.keyDown === 82) this.currentColor = "red";

  var opp = Mouse.position.y - this.position.y;
  var adj = Mouse.position.x - this.position.x;
  this.barrelRotation = Math.atan2(opp, adj);


  // this.rotation = Math.atan2(opp, adj);

  if ((Mouse.pressed || (powerupjs.Game.gameWorld.currentLobberCharm == 'semi' && Mouse.down)) ||
    (Touch.isTouchDevice && Touch.touchPresses.length > 0 || (powerupjs.Game.gameWorld.currentLobberCharm == 'semi' && Touch.touches > 0))) {
    this.shoot();
  }

};

Cannon.prototype.update = function (delta) {
  if (powerupjs.Game.gameWorld.paused) return;
  this.barrel.update(delta);
  if (powerupjs.Game.gameWorld.currentLobberCharm == 'semi' && this.currentProjectileType == 'lobber') {
    if (Date.now() > this.reloadDate + this.semiReloadTime && this.disabled) {
      this.disabled = false;
      this.ammoCount = this.maxAmmoCount;
    }
  }
};
