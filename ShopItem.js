function ShopItem(type, weaponClass, position) {
    powerupjs.SpriteGameObject.call(this, sprites.extras[type + "_upgrade_icon"].normal, 1);
    this.type = type;
    this.position = position;
    this.class = weaponClass;
    this.bought = false;
}

ShopItem.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

ShopItem.prototype.handleInput = function (delta) {
    powerupjs.SpriteGameObject.prototype.handleInput.call(this, delta);
    if (this.bought) {
        this.visible = false
        return;
    }
    if (this.boundingBox.contains(Mouse.position) && Mouse.pressed && !this.bought) {
        if (powerupjs.Game.gameWorld.coins >= upgradeCosts[this.type]) {
            powerupjs.Game.gameWorld.coins -= upgradeCosts[this.type]
            this.bought = true;
            powerupjs.Game.gameWorld.boughtItems.push(new InventoryItem(this.type, this.class));
            if (this.class == 'lobber') {
                powerupjs.Game.gameWorld.currentLobberCharm = this.type;
            }
            else if (this.class == 'boomerang') {
                powerupjs.Game.gameWorld.currentBoomerangCharm = this.type;
            }
            powerupjs.Game.gameWorld.resetInventory();
        }
    }
}