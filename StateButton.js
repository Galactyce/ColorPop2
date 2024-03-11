function StateButton(destination, start) {
    powerupjs.SpriteGameObject.call(this, sprites.extras["Easy_button"].normal);
    this.scale = 1
    this.destination = destination;
    this.start = start
    this.label = new powerupjs.Label('Courier New', '40px', 1);
    this.label._align = 'center'
    this.label.text = this.destination;
    this.label.convertToFormal();
    this.origin = this.center;

}

StateButton.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

StateButton.prototype.update = function (delta) {
    powerupjs.SpriteGameObject.prototype.update.call(this, delta);

    this.sprite = sprites.extras["simple_button"].normal;
    this.label.position = new powerupjs.Vector2(this.position.x + 110, this.position.y + 30);
    if (!Touch.isTouchDevice) {
        if (this.boundingBox.contains(Mouse.position) && Mouse.pressed) {
            powerupjs.Game.gameWorld.state = this.destination;
        }
    }
    else {
        if (Touch.containstouchPress(this.boundingBox)) {
            powerupjs.Game.gameWorld.state = this.destination;
        }
    }
}

StateButton.prototype.draw = function () {
    powerupjs.SpriteGameObject.prototype.draw.call(this);
    this.label.draw();
}