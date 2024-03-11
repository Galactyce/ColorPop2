function HotAirBoss() {
    powerupjs.SpriteGameObject.call(this, sprites.balloons['hotair_red'].closed, 1);
    this.open = false;
    this.origin = new powerupjs.Vector2(this.sprite.width / 2, 300);
    this.position = new powerupjs.Vector2(900, 0);

    this.currentColor = 'red'
    this.colors = new Array('red', 'blue', 'green');
    this.health = 85;
    this.dead = false;

    // ----------- INTERVALS ----------- //
    this.time = 0;
    this.switchTime = 0;
    this.switchDate = Date.now();
    this.dropTime = 0;
    this.dropDate = Date.now();
    this.openTime = 0;
    this.openDate = Date.now();
    this.openDuration = 6000;


    
}

HotAirBoss.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

HotAirBoss.prototype.update = function (delta) {
    if (this.dead) return;
    powerupjs.SpriteGameObject.prototype.update.call(this, delta);


    for (var i = 0; i < powerupjs.Game.gameWorld.barriers.length; i++) {
        if (powerupjs.Game.gameWorld.barriers[i].position.y > 950) {                 // Did any barriers fall off the screen
            powerupjs.Game.gameWorld.barriers[i] = null;
            powerupjs.Game.gameWorld.barriers.splice(i, 1);
        }
    }

    for (var i = 0; i < powerupjs.Game.gameWorld.intenseBarriers.length; i++) {
        if (powerupjs.Game.gameWorld.intenseBarriers[i].position.y > 1200) {                 // Did any intense barriers fall off the screen
            powerupjs.Game.gameWorld.intenseBarriers[i] = null;
            powerupjs.Game.gameWorld.intenseBarriers.splice(i, 1);
        }
    }


    if (this.open) this.sprite = sprites.balloons['hotair_' + this.currentColor].open;  // Switch sprites between open and not
    else this.sprite = sprites.balloons['hotair_' + this.currentColor].closed;


    if (Date.now() > this.switchTime + this.switchDate) {   // Switches colors of the boss
        this.switchTime = 6000 + (Math.random() * 3000);
        this.switchDate = Date.now();
        var rand = Math.floor(Math.random() * 3);
        this.currentColor = this.colors[rand];
    }

    if (!this.open) {
        powerupjs.Game.gameWorld.maxBarrierCount = 2;
        powerupjs.Game.gameWorld.maxIntenseBarrierCount = 1;        // If it's closed, launch more barriers
    }
    else {

        powerupjs.Game.gameWorld.maxBarrierCount = 2;
        powerupjs.Game.gameWorld.maxIntenseBarrierCount = 0;    // When open, stop launching intense barriers
    }

    if (Date.now() > this.dropTime + this.dropDate) {
        this.open = !this.open;
        this.dropTime = 6000 + (Math.random() * 2000);      // Switches from open to closed periodically
        this.dropDate = Date.now();
    }
    if (this.open) {
        powerupjs.Game.gameWorld.balloonMinVelocity = 30;
        var rand = Math.floor(Math.random() * 3)
        if (Math.round(this.position.x + (this.sprite.width / 2)) < powerupjs.Game.gameWorld.rowPositions[rand] + 3 &&
            Math.round(this.position.x + (this.sprite.width / 2)) > powerupjs.Game.gameWorld.rowPositions[rand] - 3) {  // If the boss is aligned with the row positions
            var color = powerupjs.Game.gameWorld.pickBalloonType();
            var balloon = new Balloon(powerupjs.Game.gameWorld.rowPositions[rand], rand, color, 1)
            balloon.position.y = 250;   // Spawn right below boss
            powerupjs.Game.gameWorld.balloons.push(
                balloon
            );
            powerupjs.Game.gameWorld.rows[rand] += 1;
        }
    }



    this.time += delta
    this.position.x = 750 + Math.sin(this.time) * 300;  // Move back and forth
    this.position.y = Math.cos(this.time * 3) * 10;  // Bounce up and down

    if (this.health <= 0) {     
        this.visible = false;
        this.dead = true;
        powerupjs.Game.gameWorld.updateGameplay();
    }
}