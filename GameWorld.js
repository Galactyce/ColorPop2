function GameWorld() {
    powerupjs.GameObjectList.call(this);
    // Game Objects
    this.add(new Cannon());
    this.background = new powerupjs.SpriteGameObject(sprites.extras['background'].shop);
    this.background.scale = 1;
    this.platform = new powerupjs.SpriteGameObject(sprites.extras['platform'].normal)
    this.platform.position = new powerupjs.Vector2(0, 680);

    this.boss = new HotAirBoss();


    // Menu Settings

    this.difficulty = 'easy';
    this.playButton = new PlayButton(new powerupjs.Vector2(500, 400));
    this.playButtonText = new powerupjs.Label('Courier New', '65px', 1);
    this.playButtonText.position = new powerupjs.Vector2(685, 460);
    this.playButtonText._align = 'center'
    this.difficulties = ['Easy', 'Normal', 'Hard', 'Apex'];
    this.selectedDifficultyIndex = 0;

    this.shopButton = new StateButton('shop', 'menu');
    this.shopButton.position = new powerupjs.Vector2(50, 100);

    this.menuButton = new StateButton('menu', 'shop');
    this.menuButton.position = new powerupjs.Vector2(50, 600);

    this.inventoryButton = new StateButton('inventory', 'menu');
    this.inventoryButton.position = new powerupjs.Vector2(1100, 100);



    // Win Stuff

    this.winBackground = new powerupjs.SpriteGameObject(sprites.extras['background'].win, 1);
    this.winBackground.origin = new powerupjs.Vector2(this.winBackground.width / 2, this.winBackground.height / 2);
    this.winBackground.position = new powerupjs.Vector2((powerupjs.Game.size.x / 4) - 80, (powerupjs.Game.size.y / 4) - 50);

    this.reward = 3;

    this.rewardText = new powerupjs.Label('Courier New', '65px', 1);
    this.rewardText.position = new powerupjs.Vector2(400, 300);
    this.rewardText.color = 'white'

    this.coinIcon = new powerupjs.SpriteGameObject(sprites.extras['coin'].normal, 1.3);
    this.coinIcon.position = new powerupjs.Vector2(380, 225);

    this.popText = new powerupjs.Label('Courier New', '50px', 1);
    this.popText.position = new powerupjs.Vector2(340, 500);
    this.popText.color = 'white'

    // Game Object Lists
    this.projectiles = [];
    this.balloons = [];
    this.barriers = [];
    this.intenseBarriers = [];
    this.boomerangs = [];

    this.scoreBox = new powerupjs.SpriteGameObject(sprites.extras['text_box'].normal);
    this.scoreBox.position = new powerupjs.Vector2(70, 40);

    this.scoreText = new powerupjs.Label("Courier New", "25px");
    this.scoreText._align = 'center'

    this.scoreText.color = "white"

    this.livesBox = new powerupjs.SpriteGameObject(sprites.extras['text_box'].normal);
    this.livesBox.position = new powerupjs.Vector2(70, 100);
    this.livesText = new powerupjs.Label("Courier New", "25px");

    this.livesText.color = "white"


    // Parameters 
    this.balloonMinVelocity = 10;
    this.moving = true;
    this.barrierSpawning = true;
    this.normalBalloons = ['red', 'green', 'blue'];
    this.rowPositions = new Array(700, 900, 1100);
    this.barrierRowPositions = new Array(510, 765, 965);
    this.balloonsPerRow = 1;
    this.rows = new Array(0, 0, 0) // # of balloons per row
    this.maxBarrierCount = 0;
    this.maxIntenseBarrierCount = 0;
    this.bossMode = false;
    this.minBarrierSpeed = 2;
    this.maxIntenseBarrierCount = 1;

    // Gameplay Variables
    this.lives = 3;
    this.score = 0;
    this.bombRange = 50;
    this.bombDamage = 5;
    this.barrierRespawnTime = 10000;
    this.barrierBreakDate = 0;
    this.state = 'menu'
    this.paused = false;
    this.pops = 0;

    // Weapon Tiers


    // Balloon Chances
    this.rainbowSpawnChance = 0.03; // Out of 1
    this.metalSpawnChance = 0;
    this.bombSpawnChance = 0;

    // Shop Items

    this.coinsText = new powerupjs.Label('Courier New', '65px', 1);
    this.coinsText.position = new powerupjs.Vector2(140, 20);
    this.coinsText._align = 'right';
    this.coinsText.color = 'white';
    this.shopItems = []
    this.boughtItems = [];
    this.lobberUpgrades = new Array('semi', 'chargedshot', 'doubleshot');
    this.boomerangUpgrades = ['redhot', 'phase', 'extraloopy'];
    this.laserUpgrades = [];
    this.coins = 0;

    // Charms
    this.currentLobberCharm = 'none';     // 'none', 'semi', 'nukes', 'redhot'
    this.currentBoomerangCharm = 'none';   // 'none', 'phase', 'extraloopy'
    this.addShopItems();

    sounds.popEffect.volume = 0.7;
    this.loadSave();


}

GameWorld.prototype = Object.create(powerupjs.GameObjectList.prototype);

GameWorld.prototype.loadSave = function () {
    console.log(localStorage.coins)
    if (localStorage.coins) {
        this.coins = parseInt(localStorage.coins);
    }
  

    if (localStorage.boughtItems) {
        itemsFromStorage = localStorage.boughtItems.split(".");     // Splits the local storage string into an array of all the items
        for (var k = 0; k < this.shopItems.length; k++) {

        for (var i = 0; i < itemsFromStorage.length - 1; i++) {
             
                if (this.shopItems[k].type == itemsFromStorage[i] && this.shopItems[k].bought == false) {       // Checks if the shop item is in the local storage
                    this.boughtItems.push(new InventoryItem(this.shopItems[k].type, this.shopItems[k].class));     // If yes, and it and mark the item as bought in the shop 
                    this.shopItems[k].bought = true;
                    continue;
                }
            }
        }
    }
    this.resetInventory()
}

GameWorld.prototype.save = function () {
    localStorage.coins = this.coins;
    console.log(localStorage.coins)

    for (var i = 0; i < this.boughtItems.length; i++) {
        localStorage.boughtItems += this.boughtItems[i].type + ".";     // Convert all bought items into a long string for the local storage
    }


}

// ------------------------------------- Win Mechanics -------------------------------------------------------------- // 

GameWorld.prototype.applyWin = function () {
    this.projectiles = [];
    this.balloons = [];
    this.barriers = [];
    this.intenseBarriers = [];
    this.rewardText.text = "+" + this.reward.toString();
    this.popText.text = "You popped " + this.pops.toString() + " balloons"
    this.coins += this.reward;
    this.save();
}


GameWorld.prototype.resetInventory = function () {

    for (var i = 0; i < this.boughtItems.length; i++) {
        if (this.boughtItems[i].weaponClass == 'lobber')
            this.boughtItems[i].position = new powerupjs.Vector2(100 + (120 * i), 100);
    }
    for (var k = 0; k < this.boughtItems.length; k++) {
        if (this.boughtItems[k].weaponClass == 'boomerang')
            this.boughtItems[k].position = new powerupjs.Vector2(100 + (120 * k), 300);
    }
    this.save();
}

// -------------------------------- Balloon Type Picker --------------------------------------------------------------- //

GameWorld.prototype.addShopItems = function () {
    for (var i = 0; i < this.lobberUpgrades.length; i++) {
        this.shopItems.push(new ShopItem(this.lobberUpgrades[i], 'lobber', new powerupjs.Vector2(170 + (120 * i), 240)));
    }

    for (var i = 0; i < this.boomerangUpgrades.length; i++) {
        this.shopItems.push(new ShopItem(this.boomerangUpgrades[i], 'boomerang', new powerupjs.Vector2(850 + (130 * i), 240)));
    }
    this.loadSave();

    this.resetInventory();

}

GameWorld.prototype.pickBalloonType = function () {
    if (Math.random() < this.rainbowSpawnChance) {
        return "rainbow";
    }
    else if (Math.random() < this.metalSpawnChance) {
        return 'metal';
    }
    else if (Math.random() < this.bombSpawnChance) {
        return 'bomb';
    }
    else {
        var num = Math.ceil(Math.random() * 3);
        if (num == 1) {
            return "red";
        }
        else if (num == 2) {
            return "green";
        }
        else {
            return "blue";
        }
    }
}

GameWorld.prototype.update = function (delta) {

    if (Keyboard.keyPressed == 65) {
        if (confirm("Reset progress?")) { 
        localStorage.clear();
        window.location.reload();
        }

    }
    if (this.state == 'playing') {

        if (!this.paused) {
            powerupjs.GameObjectList.prototype.update.call(this, delta);

            this.background.scale = 1;

            this.background.sprite = sprites.extras['background'].normal
            // ------------------ Update all game objects --------------------------------------------------------------- //

            for (var i = 0; i < this.projectiles.length; i++) {   // Update all projectiles
                this.projectiles[i].update(delta);
            }
            for (var i = 0; i < this.boomerangs.length; i++) {   // Update all boomerangs
                this.boomerangs[i].update(delta);
            }
            for (var i = 0; i < this.barriers.length; i++) {  // Update all barriers
                this.barriers[i].update(delta);
            }
            for (var i = 0; i < this.intenseBarriers.length; i++) {  // Update all intense barriers
                this.intenseBarriers[i].update(delta);
            }


            // -------------------------------------Charm Mechanics--------------------------------------------------------------------------------//



            // -------------------------------------Balloon Mechanics----------------------------------------------------------------------------- //

            for (var i = 0; i < this.balloons.length; i++) {   // Update all balloons
                this.balloons[i].update(delta);
                if (this.balloons[i].position.y > 900) {       // Did any balloons fall off the screen?
                    this.lives--;
                    this.rows[this.balloons[i].index] -= 1;
                    this.balloons[i] = null;
                    this.balloons.splice(i, 1);
                    break;
                }

                if (this.balloons[i].health <= 0) {
                    this.applyBalloonEffects(i);
                    this.rows[this.balloons[i].index] -= 1;         // Are balloons out of health?
                    this.balloons[i] = null;
                    this.balloons.splice(i, 1);
                    sounds.popEffect.play();
                    this.pops++;
                    this.save();
                    this.updateGameplay();
                    break;
                }
            }
            for (var i = 0; i < this.rows.length; i++) {
                if (this.rows[i] < this.balloonsPerRow) {           // Makes sure all rows are filled
                    var color = this.pickBalloonType();
                    this.balloons.push(
                        new Balloon(this.rowPositions[i], i, color, 1)
                    );
                    this.rows[i] += 1;
                }
            }

            for (var i = 0; i < this.projectiles.length; i++) {       // Check if ball fell off screen
                if (this.projectiles[i].position.y > 800) {
                    this.removeBall(i);
                    break;
                }

                // Check for balloon collisions
                for (var k = 0; k < this.balloons.length; k++) {
                    distanceX = this.balloons[k].position.x - this.projectiles[i].position.x;
                    distanceY = this.balloons[k].position.y - this.projectiles[i].position.y;

                    if (
                        Math.abs(distanceX) < 55 &&
                        Math.abs(distanceY) < 85            // Colliding with ball
                    ) {
                        if (
                            this.projectiles[i].currentColor === this.balloons[k].currentColor ||
                            this.balloons[k].noColor == true
                        ) {
                            if (this.balloons[k].currentColor == 'metal') {
                                sounds.clang.play();
                            }
                            if (this.balloons[k].currentColor == 'metal' && this.currentLobberCharm == 'redhot' && this.projectiles[i].type == 'lobber') {
                                this.balloons[k].health--;   // Do more damage to metal
                            }
                            if (this.projectiles[i].type == 'laser') {
                                if (this.projectiles[i].hitCount < this.projectiles[i].maxHitCount) {
                                    this.projectiles[i].hitCount++;
                                    break
                                };
                            }
                            if (this.projectiles[i].type == 'richochet') {
                                if (this.projectiles[i].bounces >= this.projectiles[i].maxBounces) {
                                    this.removeBall(i);
                                }
                                else {
                                    this.projectiles[i].Bounce();
                                    if (this.projectiles[i].bounces >= this.projectiles[i].maxBounces) {
                                        this.removeBall(i);
                                    }
                                    break;
                                }
                            }
                            this.balloons[k].health--;
                            this.removeBall(i);
                            break


                        }
                        this.removeBall(i);
                        break
                    }

                }

                if (this.projectiles[i] != undefined) {
                    if (this.projectiles[i].position.x > this.boss.position.x + (this.boss.width / 4) &&
                        this.projectiles[i].position.x < this.boss.position.x + this.boss.width &&
                        this.projectiles[i].position.y < 200 && this.boss.dead == false && this.bossMode == true) {
                        console.log('jasdf')
                        if (this.projectiles[i].currentColor === this.boss.currentColor) {
                            this.boss.health--;
                            console.log(this.boss.health);
                        }
                        this.removeBall(i);
                        break;
                    }

                }
            }

            // --------------------------------- Barrier Mechanics ------------------------------------------------------------------------ //

            if (this.barriers.length < this.maxBarrierCount && this.barrierSpawning) {
                var rand = Math.floor(Math.random() * 3);
                this.barriers.push(new Barrier(this.barrierRowPositions[rand])); // Adds a barrier at a set X position
            }

            if (this.intenseBarriers.length < this.maxIntenseBarrierCount) {
                var rand = Math.floor(Math.random() * 3);
                this.intenseBarriers.push(new BarrierIntense(this.barrierRowPositions[rand])); // Adds an intense barrier at a set X position
            }

            for (var i = 0; i < this.projectiles.length; i++) {
                if (this.projectiles[i].position.y > 650 && this.projectiles[i].position.x < 440) {
                    this.removeBall(i);
                    break
                }
            }

            for (var i = 0; i < this.barriers.length; i++) {
                if (this.barriers[i].position.y > 950) {                 // Did any barriers fall off the screen
                    this.barriers[i] = null;
                    this.barriers.splice(i, 1);
                }
            }

            for (var i = 0; i < this.intenseBarriers.length; i++) {
                if (this.intenseBarriers[i].position.y > 1200) {                 // Did any intense barriers fall off the screen
                    this.intenseBarriers[i] = null;
                    this.intenseBarriers.splice(i, 1);
                }
            }

            for (var i = 0; i < this.projectiles.length; i++) {
                for (var k = 0; k < this.barriers.length; k++) {
                    if (
                        this.projectiles[i].position.x >= this.barriers[k].position.x - 20 &&
                        this.projectiles[i].position.x <= this.barriers[k].position.x + 60 &&
                        this.projectiles[i].position.y <= this.barriers[k].position.y + 100 &&
                        this.projectiles[i].position.y >= this.barriers[k].position.y - 100
                    ) {
                        if (this.projectiles[i].type == 'boomerang' &&
                            this.currentBoomerangCharm == 'phase' &&
                            this.projectiles[i].velocity.x < 0)
                            break

                        this.removeBall(i);
                        sounds.bump.play();
                        break;

                    }
                }
            }
            for (var i = 0; i < this.projectiles.length; i++) {

                // Check for intense barrier collisions
                for (var k = 0; k < this.intenseBarriers.length; k++) {
                    if (
                        this.projectiles[i].position.x > this.intenseBarriers[k].position.x - 20 &&
                        this.projectiles[i].position.x < this.intenseBarriers[k].position.x + 90 &&
                        this.projectiles[i].position.y < this.intenseBarriers[k].position.y + 160 &&
                        this.projectiles[i].position.y > this.intenseBarriers[k].position.y - 180
                    ) {
                        this.removeBall(i);
                        sounds.bump.play();
                        break;
                    }
                }
            }

            // Barrier respawning

            if (this.barrierSpawning == false && Date.now() > this.barrierBreakDate + this.barrierRespawnTime) {
                this.barrierSpawning = true;
            }

            // ----------------------------------------------- BOSS CODE ----------------------------------------------------------- //

            if (this.bossMode) {
                this.boss.update(delta);
            }

        }
        // ------------------------------------------------ WIN CODE ------------------------------------------------------------ //

        if (this.win) {
            this.paused = true;
            if (Keyboard.keyPressed == 32) {
                this.state = 'menu';
            }
        }

    }

    // ----------------------------------------------MENU CODE------------------------------------------------------------ //


    else if (this.state == 'menu') {
        this.background.scale = 1;

        this.background.sprite = sprites.extras['background'].normal

        if (Keyboard.keyPressed == 37) {        // Left key
            this.selectedDifficultyIndex--;
            if (this.selectedDifficultyIndex < 0) this.selectedDifficultyIndex = this.difficulties.length - 1;
            this.playButton.mode = this.difficulties[this.selectedDifficultyIndex];
        }
        if (Keyboard.keyPressed == 39) {        // Right key
            this.selectedDifficultyIndex++;
            if (this.selectedDifficultyIndex > this.difficulties.length - 1) this.selectedDifficultyIndex = 0;
            this.playButton.mode = this.difficulties[this.selectedDifficultyIndex];
        }
        if (Keyboard.keyPressed == 32) {    // Space
            this.state = 'playing';
        }
        this.playButton.update(delta);
        this.playButtonText.update(delta);
        this.shopButton.update(delta);
        this.inventoryButton.update(delta);

        if (Keyboard.keyPressed == 27) {        // Esc key
            this.state = 'shop';
        }

        if (Keyboard.keyPressed == 73) {        // I key
            this.state = 'inventory';
        }
    }

    // -------------------------------------------------SHOP CODE--------------------------------------------------------- //

    else if (this.state == 'shop') {
        this.background.scale = 0.9;

        this.background.sprite = sprites.extras['background'].shop;
        this.menuButton.update(delta);

        for (var i = 0; i < this.shopItems.length; i++) {
            this.shopItems[i].update(delta);
        }

        if (Keyboard.keyPressed == 27) {
            this.state = 'menu';
        }
    }
    else if (this.state == 'inventory') {
        if (Keyboard.keyPressed == 27) {
            this.state = 'menu';
        }
        this.menuButton.update(delta);

    }
}






GameWorld.prototype.applyBalloonEffects = function (k) {
    if (this.balloons[k].currentColor == "rainbow") {
        this.lives++;
        this.score += 100;
    }
    else if (this.balloons[k].currentColor == 'metal') {
        this.score += 150;
    }
    else if (this.balloons[k].currentColor == 'bomb') {
        for (var i = 0; i < this.balloons.length; i++) {
            if (this.balloons[i] == undefined) continue;
            if (this.balloons[k].position.y - this.balloons[i].position.y < this.bombRange ||
                this.balloons[i].position.y - this.balloons[i].position.y < this.bombRange) {   // Within bomb range of the bomb

                if (this.currentLobberCharm != 'nukes')
                    this.balloons[i].health -= this.bombDamage;
                else
                    this.balloons[i].health -= (this.bombDamage * 2);   // Nukes do 2x damage

                if (this.balloons[i].health <= 0) {
                    this.balloons[i].visible = false;
                }
            }
        }

        // Bombs breaking barriers
        if (this.currentLobberCharm == 'nukes' && this.barrierSpawning == true) {
            this.barriers = [];
            this.barrierSpawning = false;
            this.barrierBreakDate = Date.now();
        }
    }
    else {
        this.score += 10;
    }
}

GameWorld.prototype.removeBall = function (i) {
    this.projectiles[i] = null;
    this.projectiles.splice(i, 1);
}



GameWorld.prototype.resetInputs = function () {

}

GameWorld.prototype.handleInput = function (delta) {
    powerupjs.GameObjectList.prototype.handleInput.call(this, delta);
    if (this.state == 'shop') {
        for (var i = 0; i < this.shopItems.length; i++) {
            this.shopItems[i].handleInput(delta);
        }
    }
    else if (this.state == 'inventory') {

        for (var i = 0; i < this.boughtItems.length; i++) {
            this.boughtItems[i].handleInput(delta);
        }
    }
}

GameWorld.prototype.draw = function () {
    if (this.state != 'inventory')
        this.background.draw();


    // ------------------ Draw all game objects --------------------------------------------------------------- //

    if (this.state == 'playing') {

        this.platform.draw();

        for (var i = 0; i < this.barriers.length; i++) {    // Draw all barriers
            this.barriers[i].draw();
        }
        for (var i = 0; i < this.intenseBarriers.length; i++) {     // Draw all intense barriers
            this.intenseBarriers[i].draw();
        }
        for (var i = 0; i < this.projectiles.length; i++) {   // Draw all projectiles
            this.projectiles[i].draw();
        }
        for (var i = 0; i < this.boomerangs.length; i++) {   // Draw all projectiles
            this.boomerangs[i].draw();
        }
        for (var i = 0; i < this.balloons.length; i++) {   // Draw all balloons
            this.balloons[i].draw();
        }
        powerupjs.GameObjectList.prototype.draw.call(this);

        if (this.bossMode) {
            this.boss.draw();
        }


        this.scoreBox.draw();
        this.scoreText.draw();
        this.scoreText.position = new powerupjs.Vector2(180, 50);
        this.scoreText.text = 'Score: ' + this.score;

        this.livesBox.draw();
        this.livesText.draw();
        this.livesText.position = new powerupjs.Vector2(120, 110);
        this.livesText.text = 'Lives: ' + this.lives;

        if (this.win) {
            this.winBackground.draw();
            this.rewardText.draw();
            this.coinIcon.position = new powerupjs.Vector2(380, 225);

            this.coinIcon.draw();
            this.popText.draw();
        }


    }
    else if (this.state == 'menu') {
        this.playButton.draw();

        this.playButtonText.text = this.difficulties[this.selectedDifficultyIndex];
        this.playButtonText.draw();
        this.shopButton.draw();
        this.inventoryButton.draw();

    }
    else if (this.state == 'shop') {
        for (var i = 0; i < this.shopItems.length; i++) {
            this.shopItems[i].draw();
        }
        this.menuButton.draw();

        this.coinsText.text = this.coins.toString();
        this.coinsText.draw();
        this.coinIcon.position = new powerupjs.Vector2(120, 10);
        this.coinIcon.draw();
    }


    // ---------------------------------------------- INVENTORY RENDERING ------------------------------------------------------- //

    else if (this.state == 'inventory') {

        for (var i = 0; i < this.boughtItems.length; i++) {
            console.log(this.boughtItems[i])
            this.boughtItems[i].draw();
        }
        this.menuButton.draw();

    }


}

