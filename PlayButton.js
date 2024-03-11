function PlayButton(position) {
    powerupjs.SpriteGameObject.call(this, sprites.extras["Easy_button"].normal, 1);
    this.mode = 'Easy';
    this.position = position;
}

PlayButton.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

PlayButton.prototype.update = function (delta) {
    powerupjs.SpriteGameObject.prototype.update.call(this, delta);
    this.sprite = sprites.extras[this.mode + "_button"].normal;

    if (!Touch.isTouchDevice) {
        if (this.boundingBox.contains(Mouse.position) && Mouse.pressed) {
            powerupjs.Game.gameWorld.state = 'playing';
            powerupjs.Game.gameWorld.difficulty = this.mode;
        }
    }
    else {
        if (Touch.containsTouchPress(this.boundingBox)) {
            powerupjs.Game.gameWorld.state = 'playing';
            powerupjs.Game.gameWorld.difficulty = this.mode;
        }
    }
}

PlayButton.prototype.draw = function () {
    if (powerupjs.Game.gameWorld.state != 'menu') return;
    powerupjs.SpriteGameObject.prototype.draw.call(this);
}