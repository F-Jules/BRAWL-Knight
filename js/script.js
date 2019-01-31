$(function drawStuff() {
  var canvas = $(".area")[0];
  var ctx = canvas.getContext("2d");

  var red = {
    name: "red",
    color: "#FA9E9E",
    srcX: 0,
    srcY: 0,
    sheetWidth: 780,
    sheetHeight: 1395,
    x: 145,
    y: 0,
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
    speed: 5,
    xVelocity: 0,
    yVelocity: 0,
    damage: 10,
    health: 100,
    life: 3,
    image: "./images/redKnight.png"
  };

  var blue = {
    name: "blue",
    color: "#90C9FF",
    srcX: 0,
    srcY: 0,
    sheetWidth: 780,
    sheetHeight: 1395,
    x: window.innerWidth - 350,
    y: 0,
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
    speed: 5,
    xVelocity: 0,
    yVelocity: 0,
    damage: 10,
    health: 100,
    life: 3,
    image: "./images/blueKnight.png"
  };

  var redImg = new Image();
  redImg.src = red["image"];
  var blueImg = new Image();
  blueImg.src = blue["image"];

  var images = [redImg, blueImg];
  var allKnights = [red, blue];

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
    ALTGR: 18,
    SPACE: 32
  };

  var keys = [];

  var fps = 60;
  var interval = 1000 / fps;
  var lastTime = new Date().getTime();
  var currentTime;
  var delta;

  var lastFire = {
    red: 0,
    blue: 0,
    sword: 0,
    timeout: 0,
    timeoutAttack: 0,
    swordBlue: 0,
    timeoutBlue: 0,
    timeoutAttackBlue: 0,
    jump: 0
  };

  var kirbyMusic = new Audio(
    "./sounds/kirbys-return-to-dream-land-title-theme-8-bit-remix.mp3"
  );
  var swordHit = new Audio("./sounds/Sword-swing.wav");
  var deathKnight = new Audio("./sounds/Pain-SoundBible.com-1883168362.wav");
  var applaude = new Audio(
    "./sounds/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.wav"
  );

  function drawLoop() {
    requestAnimationFrame(drawLoop);
    currentTime = new Date().getTime();
    delta = currentTime - lastTime;
    if (delta > interval) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (index = 0; index < allKnights.length; ++index) {
        drawingKnight(allKnights[index], images[index]);
        healthBars(allKnights[index]);
        death(allKnights[index]);
        respawn(allKnights[index]);
        gravity(allKnights[index]);
        animations(allKnights[index]);
        frameUpdater(allKnights[index]);
      }
      update();
      lastTime = currentTime - (delta % interval);
    }
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

  drawLoop();

  function frameUpdater(knight) {
    if (Date.now() - lastFire[knight.name] > 65) {
      // vitesse des anims
      knight.currentFrame = ++knight.currentFrame % knight.cols; // ============== FRAME UPDATER -- SORTIT DE ANIMATIONS (my bad) ==============
      lastFire[knight.name] = Date.now();
    }
  }

  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    for (index = 0; index < allKnights.length; ++index) {
      resetAnimations(allKnights[index]);
    }
  });

  function update() {
    var someDelay = 200;

    /* ROUGE ATTACK */
    if (red.atkLeft == true && Date.now() - lastFire["sword"] > someDelay) {
      // Permet de terminer un loop d'anim de frappe
      if (red.currentFrame == 0) {
        red.atkLeft = false;
      }
      lastFire["timeout"] = Date.now();
    }
    if (red.atkRight == true && Date.now() - lastFire["sword"] > someDelay) {
      // Permet de terminer un loop d'anim de frappe
      if (red.currentFrame == 0) {
        red.atkRight = false;
      }
      lastFire["timeout"] = Date.now();
    }
    if (keys[map["F"]]) {
      if (red.left == true) {
        if (Date.now() - lastFire["timeout"] > 50) {
          red.atkLeft = true;
          lastFire["sword"] = Date.now();
          if (red.x > blue.x && red.x < blue.x + 65 && red.y > blue.y - 60) {
            function slowKill() {
              if (Date.now() - lastFire["timeoutAttack"] > 250) {
                blue.health -= red.damage;
                swordHit.play();
                lastFire["timeoutAttack"] = Date.now();
              } else return;
            }
            slowKill();
          }
        }
      }
      if (red.right == true) {
        if (Date.now() - lastFire["timeout"] > 50) {
          red.atkRight = true;
          lastFire["sword"] = Date.now();
          if (red.x < blue.x && red.x > blue.x - 65 && red.y > blue.y - 60) {
            function slowKill() {
              if (Date.now() - lastFire["timeoutAttack"] > 250) {
                blue.health -= red.damage;
                swordHit.play();
                lastFire["timeoutAttack"] = Date.now();
              } else return;
            }
            slowKill();
          }
        }
      }
    }
    /* BLEU ATTACK */
    if (
      blue.atkLeft == true &&
      Date.now() - lastFire["swordBlue"] > someDelay
    ) {
      // Permet de terminer un loop d'anim de frappe
      if (blue.currentFrame == 0) {
        blue.atkLeft = false;
      }
      lastFire["timeoutBlue"] = Date.now();
    }
    if (
      blue.atkRight == true &&
      Date.now() - lastFire["swordBlue"] > someDelay
    ) {
      // Permet de terminer un loop d'anim de frappe
      if (blue.currentFrame == 0) {
        blue.atkRight = false;
      }
      lastFire["timeoutBlue"] = Date.now();
    }
    if (keys[map["ALTGR"]]) {
      if (blue.left == true) {
        if (Date.now() - lastFire["timeoutBlue"] > 50) {
          blue.atkLeft = true;
          lastFire["swordBlue"] = Date.now();
          if (blue.x > red.x && blue.x < red.x + 65 && blue.y > red.y - 60) {
            function slowKill() {
              if (Date.now() - lastFire["timeoutAttackBlue"] > 250) {
                red.health -= blue.damage;
                swordHit.play();
                lastFire["timeoutAttackBlue"] = Date.now();
              } else return;
            }
            slowKill();
          }
        }
      }
      if (blue.right == true) {
        if (Date.now() - lastFire["timeoutBlue"] > 50) {
          blue.atkRight = true;
          lastFire["swordBlue"] = Date.now();
          if (blue.x < red.x && blue.x > red.x - 65 && blue.y > red.y - 60) {
            function slowKill() {
              if (Date.now() - lastFire["timeoutAttackBlue"] > 250) {
                red.health -= blue.damage;
                swordHit.play();
                lastFire["timeoutAttackBlue"] = Date.now();
              } else return;
            }
            slowKill();
          }
        }
      }
    }
    /* END ATTACK */
    if (keys[map["A"]] || keys[map["Q"]]) {
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
      red.atkLeft = false; // attack animation fix
      red.left = false;
      red.right = true;
      red.runRight = true;
      if (red.x + red.speed + red.width < canvas.width) {
        red.x += red.speed;
      }
    }

    if (keys[map["DROITE"]]) {
      blue.atkLeft = false; // attack animation fix
      blue.left = false;
      blue.right = true;
      blue.runRight = true;
      if (blue.x + blue.speed + blue.width < canvas.width) {
        blue.x += blue.speed;
      }
    }

    var jumpDelay = 550;

    if (Date.now() - lastFire["jump"] > jumpDelay) {
      if (red.y >= window.innerHeight - 280) {
        red.jumpRight = false;
        red.jumpLeft = false;
      }
      lastFire["jumpTimeout"] = Date.now();
    }

    if (keys[map["W"]] || keys[map["Z"]]) {
      if (red.right && red.jumpRight == false) {
        if (Date.now() - lastFire["jumpTimeout"] > jumpDelay + 250) {
        }
        red.jumpRight = true;
        lastFire["jump"] = Date.now();
        jumpGrad(red, delta);
      }

      if (red.left && red.jumpLeft == false) {
        if (Date.now() - lastFire["jumpTimeout"] > jumpDelay + 250) {
        }
        red.jumpLeft = true;
        lastFire["jump"] = Date.now();
        jumpGrad(red, delta);
      }
    }

    if (Date.now() - lastFire["jump"] > jumpDelay) {
      if (red.y >= window.innerHeight - 280) {
        blue.jumpRight = false;
        blue.jumpLeft = false;
      }
      lastFire["jumpTimeout"] = Date.now();
    }

    if (keys[map["HAUT"]]) {
      if (blue.right && blue.jumpRight == false) {
        if (Date.now() - lastFire["jumpTimeout"] > jumpDelay + 250) {
        }
        blue.jumpRight = true;
        lastFire["jump"] = Date.now();
        jumpGrad(blue, delta);
      }
      if (blue.left && blue.jumpLeft == false) {
        if (Date.now() - lastFire["jumpTimeout"] > jumpDelay + 250) {
        }
        blue.jumpLeft = true;
        lastFire["jump"] = Date.now();
        jumpGrad(blue, delta);
      }
    }
    if (keys[map["SPACE"]]) {
      kirbyMusic.play();
    }
  }

  // -------------------------- ANIMATIONS ROWS -------------------------------------------------------------------------

  function animations(knight) {
    knight.srcX = knight.currentFrame * knight.width;
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
    knight.standRight = knight.right;
    knight.runLeft = false;
    knight.runRight = false;
    // knight.jumpLeft = false;
    // knight.jumpRight = false;
  }

  function jumpGrad(knight, delta) {
    setTimeout(suiteUP1, delta / 200);

    function suiteUP1() {
      knight.y -= 50;
    }
    setTimeout(suiteUP2, delta / 300);

    function suiteUP2() {
      knight.y -= 40;
    }
    setTimeout(suiteUP3, delta / 400);

    function suiteUP3() {
      knight.y -= 30;
    }
    setTimeout(suiteUP4, delta / 500);

    function suiteUP4() {
      knight.y -= 10;
    }
  }

  // -------------------------- GRAVITIY ---------------------------------------

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

  // -------------------------- LIFE (& DEATH) ---------------------------------

  function healthBars(knight) {
    var hp1 = $(".ldBar-" + knight.name)[0];
    var hp = new ldBar(hp1);
    hp.set(knight.health);
  }

  function death(knight) {
    var capped = capitalize(knight.name);
    if (!$(".lives" + capped + "-remaining").html()) {
      $(".lives" + capped + "-remaining").html(knight.life);
    }
    if (knight.health <= 0 && knight.life > 0) {
      knight.life -= 1;
      $(".lives" + capped + "-remaining").html(knight.life);
      deathKnight.play();
    }
    if (red.life === 0) {
      $(".game-end h2").html("BLUE HAS WON");
      $(".popup-content").css("background-color", blue.color);
      $(".game-end").addClass("showing");
      applaude.play();
    } else if (blue.life === 0) {
      $(".game-end h2").html("RED HAS WON");
      $(".popup-content").css("background-color", red.color);
      $(".game-end").addClass("showing");
      applaude.play();
    }
  }

  function respawn(knight) {
    if (knight.life == 0) {
      return;
    }
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

  /* other help functions */

  ctx.canvas.width = window.innerWidth - 50;
  ctx.canvas.height = window.innerHeight;
  $(window).on("resize", function() {
    for (index = 0; index < allKnights.length; ++index) {
      if (allKnights[index].x + allKnights[index].width > canvas.width) {
        allKnights[index].x = canvas.width - allKnights[index].width;
      }
    }
    ctx.canvas.width = window.innerWidth - 50;
    ctx.canvas.height = window.innerHeight;
  });

  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  $(".restart").click(function() {
    location.reload();
  });
});
