document.addEventListener("DOMContentLoaded", run());

function run() {
  let gameContainer = document.getElementById("game-container");

  let rightPressed = false;
  let leftPressed = false;
  let jumpPressed = false;

  document.addEventListener("keydown", keyDownEventHandler);
  // document.addEventListener("keypress", keyPressEventHandler);
  document.addEventListener("keyup", keyUpEventHandler);

  let startY = gameContainer.clientHeight - 150;
  let startX = 30;
  let player = new Player(startX, startY, gameContainer);
  let platform2 = new Platform(0, 100, 300, 100, gameContainer, "platform-brown");
  let platform3 = new Platform(300, 250, 50, 250, gameContainer, "platform-brown");
  //let platform4 = new Platform(400, 200, 50, 200, gameContainer, "platform-brown");
  let platform5 = new Platform(550, 220, 75, 220, gameContainer, "platform-brown");
  let platform6 = new Platform(1000, 300, gameContainer.clientWidth - 1000, 300, gameContainer, "platform-brown");

  let platform11 = new Platform(800, 200, 10, 15, gameContainer, "platform-brown");
  let platform7 = new Platform(875, 500, 100, 15, gameContainer, "platform-brown");
  let platform8 = new Platform(700, 500, 75, 15, gameContainer, "platform-brown");
  let platform9 = new Platform(500, 600, 50, 15, gameContainer, "platform-brown");
  let platform10 = new Platform(200, 650, 24, 5, gameContainer, "platform-green");

  setInterval(draw, 20);

  function draw() {
    player.draw(leftPressed, rightPressed, jumpPressed);
  }

  //event handlers
  function keyDownEventHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
      rightPressed = true;
    } else if (event.key === "left" || event.key === "ArrowLeft") {
      leftPressed = true;
    } else if (event.keyCode === 32 || event.key === "Space") {
      jumpPressed = true;
    } else if (event.key === "?") {
      debugger;
    }
  }
  function keyUpEventHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
      rightPressed = false;
      player.haltRight();
    } else if (event.key === "left" || event.key === "ArrowLeft") {
      leftPressed = false;
      player.haltLeft();
    } else if (event.keyCode === 32 || event.key === "Space") {
      jumpPressed = false;
      player.haltJump(event.timeStamp);
    }
  }
}
