var canvas = $(".area")[0];
var ctx = canvas.getContext("2d");

// _______________________________________________________________________________________________________________________________
// DRAWING ANIMATED CHARACTER

// ----------------------- RED Knight ------------------------

var redKnight = {
  srcX: 0,
  srcY: 0,
  sheetWidth: 780,
  sheetHeight: 775,
  x: 0,
  y: 620,
  cols: 5,
  rows: 5,
  width: 156,
  height: 155,
  currentFrame: 0,
  run: false,
  jump: false,
  atk: false,
  die: false,
  standRow: 0,
  runRow: 1,
  jumpRow: 2,
  atkRow: 3,
  dieRow: 4,
  speed: 15,
  xVelocity: 0,
  yVelocity: 0,
  damage: 5,
  health: 30
};

var redKnightImg = new Image();
redKnightImg.src = "./images/redKnight.png";
redKnightImg.onload = function() {
  ctx.drawImage(
    redKnightImg,
    redKnight.srcX,
    redKnight.srcY,
    redKnight.width,
    redKnight.height,
    redKnight.x,
    redKnight.y,
    redKnight.width,
    redKnight.height
  );
};

function updateRedKnightFrame() {
  ctx.clearRect(redKnight.x, redKnight.y, redKnight.width, redKnight.height);
  redKnight.currentFrame = ++redKnight.currentFrame % redKnight.cols;
  redKnight.srcX = redKnight.currentFrame * redKnight.width;
  redKnight.yVelocity += 4.5;
  redKnight.x += redKnight.xVelocity;
  redKnight.y += redKnight.yVelocity;
  redKnight.xVelocity *= 0.9;
  redKnight.yVelocity *= 0.9;
  if (redKnight.y > 620) {
    redKnight.y = 620;
    redKnight.yVelocity = 0;
  }
  if (redKnight.run) {
    redKnight.srcY = redKnight.runRow * redKnight.height;
  } else if (redKnight.jump) {
    redKnight.srcY = redKnight.jumpRow * redKnight.height;
  } else if (redKnight.atk) {
    redKnight.srcY = redKnight.atkRow * redKnight.height;
  } else if (redKnight.die) {
    redKnight.srcY = redKnight.dieRow * redKnight.height;
  } else {
    redKnight.srcY = redKnight.standRow * redKnight.height;
  }
}

function drawRedKnight() {
  ctx.drawImage(
    redKnightImg,
    redKnight.srcX,
    redKnight.srcY,
    redKnight.width,
    redKnight.height,
    redKnight.x,
    redKnight.y,
    redKnight.width,
    redKnight.height
  );
}

setInterval(function() {
  updateRedKnightFrame();
}, 100);

// ----------------------- BLUE Knight ------------------------

var blueKnight = {
  srcX: 0,
  srcY: 0,
  sheetWidth: 780,
  sheetHeight: 775,
  x: 500,
  y: 100,
  cols: 5,
  rows: 5,
  width: 156,
  height: 155,
  currentFrame: 0,
  run: false,
  jump: false,
  atk: false,
  die: false,
  standRow: 0,
  runRow: 1,
  jumpRow: 2,
  atkRow: 3,
  dieRow: 4,
  speed: 15,
  xVelocity: 0,
  yVelocity: 0,
  damage: 5,
  health: 30
};

var blueKnightImg = new Image();
blueKnightImg.src = "./images/blueKnight.png";
blueKnightImg.onload = function() {
  ctx.drawImage(
    blueKnightImg,
    blueKnight.srcX,
    blueKnight.srcY,
    blueKnight.width,
    blueKnight.height,
    blueKnight.x,
    blueKnight.y,
    blueKnight.width,
    blueKnight.height
  );
};

function updateBlueKnightFrame() {
  ctx.clearRect(
    blueKnight.x,
    blueKnight.y,
    blueKnight.width,
    blueKnight.height
  );
  blueKnight.yVelocity += 4.5;
  blueKnight.x += blueKnight.xVelocity;
  blueKnight.y += blueKnight.yVelocity;
  blueKnight.xVelocity *= 0.9;
  blueKnight.yVelocity *= 0.9;
  if (blueKnight.y > 620) {
    blueKnight.y = 620;
    blueKnight.yVelocity = 0;
  }
  blueKnight.currentFrame = ++blueKnight.currentFrame % blueKnight.cols;
  blueKnight.srcX = blueKnight.currentFrame * blueKnight.width;
  if (blueKnight.run) {
    blueKnight.srcY = blueKnight.runRow * blueKnight.height;
  } else if (blueKnight.jump) {
    blueKnight.srcY = blueKnight.jumpRow * blueKnight.height;
  } else if (blueKnight.atk) {
    blueKnight.srcY = blueKnight.atkRow * blueKnight.height;
  } else if (blueKnight.die) {
    blueKnight.srcY = blueKnight.dieRow * blueKnight.height;
  } else {
    blueKnight.srcY = blueKnight.standRow * blueKnight.height;
  }
}

function drawBlueKnight() {
  ctx.drawImage(
    blueKnightImg,
    blueKnight.srcX,
    blueKnight.srcY,
    blueKnight.width,
    blueKnight.height,
    blueKnight.x,
    blueKnight.y,
    blueKnight.width,
    blueKnight.height
  );
}

setInterval(function() {
  updateBlueKnightFrame();
}, 100);

// -------------------------- DRAWING LOOP ----------------------------------

function drawLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRedKnight();
  drawBlueKnight();

  requestAnimationFrame(drawLoop);
}

drawLoop();

// -------------------------- COMMANDS -------------------------------------------------------------------------

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 68: //D = MOVE RIGHT REDKNIGHT
      event.preventDefault();
      if (redKnight.x + redKnight.speed + redKnight.width < canvas.width) {
        redKnight.x += redKnight.speed;
      }
      redKnight.run = true;
      break;
    case 65: // A = MOVE LEFT REDKNIGHT
      event.preventDefault();
      if (redKnight.x - redKnight.speed > 0) {
        redKnight.x -= redKnight.speed;
      }
      redKnight.run = true;
      break;
    case 70: // F = ATTACK REDKNIGHT
      event.preventDefault();
      redKnight.atk = true;
      if (redKnight.x > blueKnight.x - 25 && redKnight.x < blueKnight.x + 15) {
        console.log("hit");
      }
      break;
    case 87: // W = JUMP REDKNIGHT
      if (redKnight.jump == false) {
        redKnight.y -= 100;
        redKnight.jump = true;
      }
      break;
    case 39: //RIGHT ARROW = MOVE RIGHT BLUEKNIGHT
      event.preventDefault();
      if (blueKnight.x + blueKnight.speed + blueKnight.width < canvas.width) {
        blueKnight.x += blueKnight.speed;
      }
      blueKnight.run = true;
      break;
    case 37: // LEFT ARROW = MOVE LEFT BLUEKNIGHT
      event.preventDefault();
      if (blueKnight.x - blueKnight.speed > 0) {
        blueKnight.x -= blueKnight.speed;
      }
      blueKnight.run = true;
      break;
    case 18: // ALTRIGHT = ATTACK BLUEKNIGHT
      event.preventDefault();
      blueKnight.atk = true;
      break;
    case 38: // ARROW UP = JUMP BLUEKNIGHT
      event.preventDefault();
      blueKnight.y -= 40;
      blueKnight.jump = true;
      break;
  }
};

document.onkeypress = function(event) {
  switch (event.keyCode) {
  }
};

document.onkeyup = function(event) {
  switch (event.keyCode) {
    case 68: //D = MOVE RIGHT REDKNIGHT
      event.preventDefault();
      redKnight.run = false;
      break;
    case 65: // A = MOVE LEFT REDKNIGHT
      event.preventDefault();
      redKnight.run = false;
      break;
    case 70: // F = ATTACK REDKNIGHT
      event.preventDefault();
      redKnight.atk = false;
      break;
    case 87: // W = JUMP REDKNIGHT
      redKnight.jump = false;
      break;
    case 39: //RIGHT ARROW = MOVE RIGHT BLUEKNIGHT
      event.preventDefault();
      blueKnight.run = false;
      break;
    case 37: // LEFT ARROW = MOVE LEFT BLUEKNIGHT
      event.preventDefault();
      blueKnight.run = false;
      break;
    case 18: // ALTRIGHT = ATTACK BLUEKNIGHT
      event.preventDefault();
      blueKnight.atk = false;
      break;
    case 38: // ARROW UP = JUMP BLUEKNIGHT
      event.preventDefault();
      blueKnight.jump = false;
      break;
  }
};

// -------------------------- PHYSICS -------------------------------------------------------------------------

function gravity(x, y, xVelocity, yVelocity) {
  yVelocity += 1.5;
  x += xVelocity;
  y += yVelocity;
  xVelocity *= 0.9;
  yVelocity *= 0.9;
}

function collision(redKnight, blueKnight) {
  return (
    redKnight.y + redKnight.height >= blueKnight.y &&
    redKnight.y <= blueKnight.y + blueKnight.height &&
    redKnight.x + redKnight.width >= blueKnight.x &&
    redKnight.x <= blueKnight.x + blueKnight.width
  );
}
