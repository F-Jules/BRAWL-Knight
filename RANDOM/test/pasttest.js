var redKnightSrcX;
var redKnightSrcY;
var redKnightSheetWidth = 780;
var redKnightSheetHeigth = 775;
var redKnightX = 0;
var redKnightY = 0;
var redKnightCols = 5;
var redKnightRows = 5;
var redKnightWidth = redKnightSheetWidth / redKnightCols;
var redKnightHeigth = redKnightSheetHeigth / redKnightRows;
var redKnightCurrentFrame = 0;

var redKnightImg = new Image();
redKnightImg.src = "../images/redKnight.png";
redKnightImg.onload = function() {
  ctx.drawImage(
    redKnightImg,
    redKnightSrcX,
    redKnightSrcY,
    redKnightWidth,
    redKnightHeigth,
    redKnightX,
    redKnightY,
    redKnightWidth,
    redKnightHeigth
  );
};

function updateRedKnightFrame() {
  ctx.clearRect(redKnightX, redKnightY, redKnightWidth, redKnightHeigth);
  redKnightCurrentFrame = ++redKnightCurrentFrame % redKnightCols;
  redKnightSrcX = redKnightCurrentFrame * redKnightWidth;
  redKnightSrcY = 0;
}

function drawRedKnight() {
  ctx.drawImage(
    redKnightImg,
    redKnightSrcX,
    redKnightSrcY,
    redKnightWidth,
    redKnightHeigth,
    redKnightX,
    redKnightY,
    redKnightWidth,
    redKnightHeigth
  );
}

setInterval(function() {
  updateRedKnightFrame();
}, 200);

// ----------------------- BLUE Knight ------------------------

var blueKnightSrcX;
var blueKnightSrcY;
var blueKnightSheetWidth = 780;
var blueKnightSheetHeigth = 775;
var blueKnightX = 500;
var blueKnightY = 100;
var blueKnightCols = 5;
var blueKnightRows = 5;
var blueKnightWidth = blueKnightSheetWidth / blueKnightCols;
var blueKnightHeigth = blueKnightSheetHeigth / blueKnightRows;
var blueKnightCurrentFrame = 0;

var blueKnightCharacter = new Image();
blueKnightCharacter.src = "../images/blueKnight.png";
blueKnightCharacter.onload = function() {
  ctx.drawImage(
    blueKnightCharacter,
    blueKnightSrcX,
    blueKnightSrcY,
    blueKnightWidth,
    blueKnightHeigth,
    blueKnightX,
    blueKnightY,
    blueKnightWidth,
    blueKnightHeigth
  );
};

function updateBlueKnightFrame() {
  ctx.clearRect(blueKnightX, blueKnightY, blueKnightWidth, blueKnightHeigth);
  blueKnightCurrentFrame = ++blueKnightCurrentFrame % blueKnightCols;
  blueKnightSrcX = blueKnightCurrentFrame * blueKnightWidth;
  blueKnightSrcY = 0;
}

function drawBlueKnight() {
  ctx.drawImage(
    blueKnightCharacter,
    blueKnightSrcX,
    blueKnightSrcY,
    blueKnightWidth,
    blueKnightHeigth,
    blueKnightX,
    blueKnightY,
    blueKnightWidth,
    blueKnightHeigth
  );
}

setInterval(function() {
  updateBlueKnightFrame();
}, 200);

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
      redKnightX += 20;
      break;
  }
};
