



var powerupjs = (function (powerupjs) {

  function Game() {
    this.size = { x: 1340, y: 825 };
    this.spriteStillLoading = 0;
    this.totalTime = 0;
    this.started = false;
    // localStorage.clear()
  }

  Game.prototype.start = function () {
    powerupjs.Canvas.initialize();
    powerupjs.Game.loadAssets();
    powerupjs.Game.assetLoadingLoop();
  }

  Game.prototype.assetLoadingLoop = function () {
    if (powerupjs.Game.spritesStillLoading > 0) {
      setTimeout(powerupjs.Game.assetLoadingLoop, 1000 / 60);
    }
    else {
      console.log("Sprites loaded.");

      powerupjs.Game.gameWorld = new GameWorld();

      powerupjs.Game.mainLoop();
    }
  }

  Game.prototype.loadAssets = function () {

  }


  Game.prototype.mainLoop = function () {
    var delta = 1 / 50
    this.totalTime += 1000 / 50
    var timeStart = Date.now()
    powerupjs.Canvas.clear();
    Mouse.checkInputs();
    powerupjs.Game.gameWorld.handleInput(delta)
    powerupjs.Game.gameWorld.update(delta);
    powerupjs.Game.gameWorld.draw();
    Keyboard.reset()
    Mouse.reset()
    // if (Date.now() - timeStart > 500) console.log(Date.now() - timeStart)

    setTimeout(powerupjs.Game.mainLoop, 1000 / 50)
  }


  powerupjs.Game = new Game()
  return powerupjs;

})(powerupjs || {});
