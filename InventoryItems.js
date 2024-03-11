function InventoryItem(type, weaponClass) {
    powerupjs.SpriteGameObject.call(this);
    this.type = type;
    this.weaponClass = weaponClass;
    this.sprite = sprites.extras[this.type + "_upgrade_icon"].normal;
}

InventoryItem.prototype = Object.create(powerupjs.SpriteGameObject.prototype);


InventoryItem.prototype.handleInput = function (delta) {
    powerupjs.SpriteGameObject.prototype.handleInput.call(this, delta);
    if ((Touch.isTouchDevice && Touch.containsTouchPress(this.boundingBox)) ||
        (!Touch.isTouchDevice && this.boundingBox.contains(Mouse.position) && Mouse.pressed)) {

        if (this.weaponClass == 'lobber') {
            powerupjs.Game.gameWorld.currentLobberCharm = this.type;
        }
        else if (this.weaponClass == 'boomerang') {
            powerupjs.Game.gameWorld.currentBoomerangCharm = this.type;
        }
    }
}