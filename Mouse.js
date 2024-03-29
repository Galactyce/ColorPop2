function handleMouseMove(evt) {
  var canvasScale = powerupjs.Canvas.scale;
  var canvasOffset = powerupjs.Canvas.offset;
  var mx = (evt.pageX - canvasOffset.x) / canvasScale.x;
  var my = (evt.pageY - canvasOffset.y) / canvasScale.y;
  Mouse.position = new powerupjs.Vector2(mx, my);
  if (Mouse.down) {
    powerupjs.Game.gameWorld.dragging = true;
  }
}

function handleMouseDown(evt) {
  evt.preventDefault();

  if (evt.which === 1) {
    if (!Mouse.down) Mouse.pressed = true;
    Mouse.down = true;
  }
}

function handleMouseUp(evt) {
  evt.preventDefault();
  if (evt.which === 1) {
    Mouse.down = false;
    powerupjs.Game.gameWorld.dragging = false;
  }
}

function Mouse_Singleton() {
  this.position = new powerupjs.Vector2(0, 0);
  this.down = false;
  this.pressed = false;
}

Mouse_Singleton.prototype.checkInputs = function () {
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleMouseUp);
  document.onmousemove = handleMouseMove;
};

Mouse_Singleton.prototype.reset = function () {
  this.pressed = false;
};

Mouse_Singleton.prototype.containsMouseDown = function (rect) {
    return this.down && rect.contains(this.position);
};

Mouse_Singleton.prototype.containsMousePress = function (rect) {
    return this.pressed && rect.contains(this.position);
};

var Mouse = new Mouse_Singleton();
