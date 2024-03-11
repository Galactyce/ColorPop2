function Barrier(Xposition) {
  powerupjs.SpriteGameObject.call(this, sprites.barriers['barrier'].normal, 1);
  this.position = new powerupjs.Vector2(Xposition, -110);
  this.origin = new powerupjs.Vector2(0, 110);
  this.health = 8;
  this.speed = undefined
  this.setSpeed()
}

Barrier.prototype = Object.create(powerupjs.SpriteGameObject.prototype);


Barrier.prototype.update = function(delta)  {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  this.position.y += this.speed;
 

}






Barrier.prototype.setSpeed = function() {
  this.speed = Math.random() * 2 + powerupjs.Game.gameWorld.minBarrierSpeed
}


function BarrierIntense(Xposition) {
  powerupjs.SpriteGameObject.call(this, sprites.barriers['intense_barrier'].normal, 1);

  this.position = new powerupjs.Vector2(Xposition, -300);
  this.origin = new powerupjs.Vector2(0, 150);
  this.health = 15;
  this.speed = 2;
}

BarrierIntense.prototype = Object.create(powerupjs.SpriteGameObject.prototype);


BarrierIntense.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  this.position.y += this.speed;
};

BarrierIntense.prototype.setSpeed = function () {
  this.speed = Math.random() * 3 + powerupjs.Game.gameWorld.minIntenseBarrierSpeed;
};

