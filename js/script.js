$(function drawStuff() {
  var lifeRed = 5;
  var lifeBlue = 5;

  $(".livesRed-remaining").html(lifeRed);
  $(".livesBlue-remaining").html(lifeBlue);
  var canvas = $(".area")[0];
  var ctx = canvas.getContext("2d");

  ctx.mozImageSmoothingEnabled = true;
  ctx.webkitImageSmoothingEnabled = true;
  ctx.msImageSmoothingEnabled = true;
  ctx.imageSmoothingEnabled = true;

  setInterval(function() {
    ctx.canvas.width = window.innerWidth - 50;
    ctx.canvas.height = window.innerHeight;
  }, 100);

  var startPos = 200;

  red = {
    srcX: 0,
    srcY: 0,
    sheetWidth: 780,
    sheetHeight: 1395,
    x: startPos - 60,
    y: window.innerHeight - 750,
    cols: 5,
    rows: 9,
    width: 156,
    height: 155,
    currentFrame: 0,
    standRight: true,
    runRight: false,
    jumpRight: false,
    atkRight: false,
    dieRight: false,
    standLeft: false,
    runLeft: false,
    atkLeft: false,
    jumpLeft: false,
    left: false,
    right: true,
    standRowRight: 0,
    runRowRight: 1,
    jumpRowRight: 2,
    atkRowRight: 3,
    dieRowRight: 4,
    standRowLeft: 5,
    runRowLeft: 6,
    jumpRowLeft: 7,
    atkRowLeft: 8,
    speed: 10,
    xVelocity: 0,
    yVelocity: 0,
    damage: 5,
    health: 100,
    life: 5,
    image: "./images/redKnight.png"
  };

  blue = {
    srcX: 0,
    srcY: 0,
    sheetWidth: 780,
    sheetHeight: 1395,
    x: window.innerWidth - 356,
    y: window.innerHeight - 750,
    cols: 5,
    rows: 9,
    width: 156,
    height: 155,
    currentFrame: 0,
    standRight: false,
    runRight: false,
    jumpRight: false,
    atkRight: false,
    dieRight: false,
    standLeft: true,
    runLeft: false,
    atkLeft: false,
    jumpLeft: false,
    left: true,
    right: false,
    standRowLeft: 0,
    runRowLeft: 1,
    jumpRowLeft: 2,
    atkRowLeft: 3,
    dieRowLeft: 4,
    standRowRight: 5,
    runRowRight: 6,
    jumpRowRight: 7,
    atkRowRight: 8,
    speed: 10,
    xVelocity: 0,
    yVelocity: 0,
    damage: 5,
    health: 100,
    life: 5,
    image: "./images/blueKnight.png"
  };
  var redImg = new Image();
  redImg.src = red["image"];
  redImg.onload = drawingKnight(red, redImg);

  var blueImg = new Image();
  blueImg.src = blue["image"];
  blueImg.onload = drawingKnight(blue, blueImg);

  function updateKnightFrame(knight) {
    // ANIMATIONS FRAME -------------------------------------------
    ctx.clearRect(knight.x, knight.y, knight.width, knight.height);
    knight.currentFrame = ++knight.currentFrame % knight.cols;
    knight.srcX = knight.currentFrame * knight.width;
  }

  function drawingKnight(knight, img) {
    ctx.drawImage(
      img,
      knight.srcX,
      knight.srcY,
      knight.width,
      knight.height,
      knight.x,
      knight.y,
      knight.width,
      knight.height
    );
  }

  setInterval(function() {
    updateKnightFrame(blue);
    updateKnightFrame(red);
    /* repositionnement si hors de la fenetre, par la droite */
    // if (red.x + red.width > canvas.width) {
    //   red.x = canvas.width - red.width;
    // }
    // if (blue.x + blue.width > canvas.width) {
    //   blue.x = canvas.width - blue.width;
    // }
  }, 100);

  // -------------------------- PLATFORMS -----------------------------------

  // class Deck {
  //   constructor(deckX, deckY, deckWidth, deckHeigth) {
  //     this.x = deckX;
  //     this.y = deckY;
  //     this.width = deckWidth;
  //     this.height = deckHeigth;
  //   }
  //   drawDeck() {
  //     ctx.fillRect(this.x, this.y, this.width, this.height);
  //   }
  // }
  // var deck1 = new Deck(250, 350, 250, 10);

  // -------------------------- DRAWING LOOP -----------------------------------

  function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingKnight(red, redImg);
    drawingKnight(blue, blueImg);
    // // LIVES BARS -------------------------------------------
    blueHealthBar();
    redHealthBar();
    // DEATH -------------------------------------------
    death(red, blue);
    respawn(red);
    respawn(blue);
    // GRAVITY, COLLISION AND FRICTION -------------------------------------------
    gravity(red);
    gravity(blue);
    // ANIMATIONS ROWS -------------------------------------------
    animations(red);
    animations(blue);
    requestAnimationFrame(drawLoop);
  }

  drawLoop();

  // -------------------------- COMMANDS -------------------------------

  var map = {
    A: 65,
    Q: 81,
    D: 68,
    Z: 90,
    W: 87,
    F: 70,
    DROITE: 39,
    GAUCHE: 37,
    HAUT: 38,
    ALTGR: 18
  };

  var keys = [];

  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    resetAnimations(red);
    resetAnimations(blue);
  });

  function update() {
    if (keys[map["A"]]) {
      red.right = false;
      red.left = true;
      red.runLeft = true;
      if (red.x - red.speed > 0) {
        red.x -= red.speed;
      }
    }

    if (keys[map["GAUCHE"]]) {
      blue.right = false;
      blue.left = true;
      blue.runLeft = true;
      if (blue.x - blue.speed > 0) {
        blue.x -= blue.speed;
      }
    }

    if (keys[map["D"]]) {
      red.left = false;
      red.right = true;
      red.runRight = true;
      if (red.x + red.speed + red.width < canvas.width) {
        red.x += red.speed;
      }
    }

    if (keys[map["DROITE"]]) {
      blue.left = false;
      blue.right = true;
      blue.runRight = true;
      if (blue.x + blue.speed + blue.width < canvas.width) {
        blue.x += blue.speed;
      }
    }

    if (keys[map["W"]]) {
      if (red.left && red.jumpLeft == false) {
        red.jumpLeft = true;
        red.y -= 100;
      }
      if (red.right && red.jumpRight == false) {
        red.jumpRight = true;
        red.y -= 100;
        console.log(red.y);
      }
    }

    if (keys[map["HAUT"]]) {
      if (blue.right && blue.jumpRight == false) {
        blue.y -= 100;
        blue.jumpRight = true;
        console.log(blue.y);
      }
      if (blue.left && blue.jumpLeft == false) {
        blue.y -= 100;
        blue.jumpLeft = true;
      }
    }

    if (keys[map["F"]]) {
      if (red.left == true) {
        red.atkLeft = true;
        if (red.x < blue.x + 65 && red.x > blue.x) {
          blue.health -= red.damage;
        }
      }
      if (red.right == true) {
        red.atkRight = true;
        if (red.x > blue.x - 65 && red.x < blue.x) {
          blue.health -= red.damage;
        }
      }
    }

    if (keys[map["ALTGR"]]) {
      if (blue.left == true) {
        blue.atkLeft = true;
        if (red.x < blue.x + 65 && red.x < blue.x) {
          red.health -= blue.damage;
        }
      }
      if (blue.right == true) {
        blue.atkRight = true;
        if (red.x > blue.x - 65 && red.x > blue.x) {
          red.health -= blue.damage;
        }
      }
    }
  }

  setInterval(function() {
    update();
  }, 50);

  // -------------------------- ANIMATIONS ROWS -------------------------------------------------------------------------

  function animations(knight) {
    if (knight.runLeft) {
      knight.srcY = knight.runRowLeft * knight.height;
    } else if (knight.jumpLeft) {
      knight.srcY = knight.jumpRowLeft * knight.height;
    } else if (knight.atkLeft) {
      knight.srcY = knight.atkRowLeft * knight.height;
    } else if (knight.runRight) {
      knight.srcY = knight.runRowRight * knight.height;
    } else if (knight.jumpRight) {
      knight.srcY = knight.jumpRowRight * knight.height;
    } else if (knight.atkRight) {
      knight.srcY = knight.atkRowRight * knight.height;
    } else if (knight.standRight) {
      knight.srcY = knight.standRowRight * knight.height;
    } else if (knight.standLeft) {
      knight.srcY = knight.standRowLeft * knight.height;
    }
  }

  function resetAnimations(knight) {
    knight.standLeft = knight.left;
    knight.runLeft = false;
    knight.atkLeft = false;
    knight.jumpLeft = false;

    knight.standRight = knight.right;
    knight.runRight = false;
    knight.atkRight = false;
    knight.jumpRight = false;
  }

  // function jumpReset(knight) {
  //   if (
  //     knight.jumpLeft == true ||
  //     knight.jumpRight == true ||
  //     knight.y != window.innerHeight - 750
  //   ) {

  //   }
  // }

  // -------------------------- GRAVITIY -------------------------------------------------------------------------

  function gravity(knight) {
    knight.yVelocity += 1.5;
    knight.x += knight.xVelocity;
    knight.y += knight.yVelocity;
    knight.xVelocity *= 0.9;
    knight.yVelocity *= 0.9;
    if (knight.y > window.innerHeight - 280) {
      knight.y = window.innerHeight - 280;
      knight.yVelocity = 0;
    }
  }

  // function collision(knight, plat) {
  //   return (
  //     knight.y + knight.height >= plat.y &&
  //     knight.y <= plat.y + blue.height &&
  //     knight.x + knight.width >= plat.x &&
  //     knight.x <= plat.x + plat.width
  //   );
  // }

  // function checkCollision() {
  //   if (collision(red, deck1) === true) {
  //     red.y = deck1.y;
  //   }
  // }

  // -------------------------- DEATH -------------------------------------------------------------------------

  function death(knight) {
    if (knight.health <= 0) {
      knight.die = true;
      knight.srcY = knight.dieRow * knight.height;
    }
    if (red.health <= 0 && red.life > 0) {
      lifeRed -= 1;
      red.life -= 1;
      $(".livesRed-remaining").html(lifeRed);
    }
    if (blue.health <= 0 && blue.life > 0) {
      lifeBlue -= 1;
      blue.life -= 1;
      $(".livesBlue-remaining").html(lifeBlue);
    }
    if (red.life == 0) {
      $(".game-end h2").html("BLUE KNIGHT HAS WON");
      $(".popup-content").css("background-color", "blue");
      // $(".restart").addClass("blue");
      $(".game-end").addClass("showing");
    }
    if (blue.life == 0) {
      $(".game-end h2").html("RED KNIGHT HAS WON");
      $(".popup-content").css("background-color", "red");
      // $(".restart").addClass("red");
      $(".game-end").addClass("showing");
    }
  }

  function respawn(knight) {
    if (knight.health <= 0) {
      knight.die = false;
      knight.reset = function() {
        knight.x = Math.random() * canvas.width;
        knight.y = 0;
      };
      knight.health = 100;
      knight.reset();
    }
  }

  $(".restart").click(function() {
    location.reload();
  });

  // -------------------------- HEALTH BAR -------------------------------------------------------------------------

  function redHealthBar() {
    $(document).ready(function() {
      var rk1 = $(".ldBar-red")[0];
      var rk = new ldBar(rk1);
      rk.set(red.health);
    });
  }

  function blueHealthBar() {
    $(document).ready(function() {
      var bk1 = $(".ldBar-blue")[0];
      var bk = new ldBar(bk1);
      bk.set(blue.health);
    });
  }

  console.log(window.innerHeight);
  console.log(red.y);
  console.log(blue.y);
});
