document.addEventListener("DOMContentLoaded", run());

function run() {
  let gameContainer = document.getElementById("game-container");

  let rightPressed = false;
  let leftPressed = false;
  document.addEventListener("keydown", keyDownEventHandler);
  // document.addEventListener("keypress", keyPressEventHandler);
  document.addEventListener("keyup", keyUpEventHandler);

  let startY = gameContainer.clientHeight - 50;
  let startX = 30;
  let player = new Player(startX, startY, gameContainer);
  let platform2 = new Platform(200, gameContainer.clientHeight - 100, 50, 100, gameContainer, "platform-brown");
  let platform3 = new Platform(300, gameContainer.clientHeight - 200, 50, 200, gameContainer, "platform-brown");
  let platform4 = new Platform(400, gameContainer.clientHeight - 200, 100, 200, gameContainer, "platform-brown");
  let platform5 = new Platform(400, gameContainer.clientHeight - 400, 75, 20, gameContainer, "platform-brown");
  let platform6 = new Platform(600, gameContainer.clientHeight - 450, 100, 20, gameContainer, "platform-brown");
  let platform7 = new Platform(700, gameContainer.clientHeight - 200, 100, 20, gameContainer, "platform-brown");
  let platform8 = new Platform(800, gameContainer.clientHeight - 100, 100, 20, gameContainer, "platform-brown");

  setInterval(draw, 20);

  function draw() {
    player.draw(leftPressed, rightPressed);
  }
  function checkCollision() {}

  //event handlers
  function keyDownEventHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
      console.log("Right donwn", event.timeStamp);
      rightPressed = true;
    } else if (event.key === "left" || event.key === "ArrowLeft") {
      console.log("left down");
      leftPressed = true;
    } else if (event.keyCode === 32 || event.key === "Space") {
      player.jump();
    } else if (event.key === "?") {
      debugger;
    }
  }
  function keyUpEventHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
      console.log("right up");
      rightPressed = false;
      player.haltRight();
    } else if (event.key === "left" || event.key === "ArrowLeft") {
      console.log("left up");
      leftPressed = false;
      player.haltLeft();
    } else if (event.keyCode === 32 || event.key === "Space") {
      player.haltJump(event.timeStamp);
    }
  }
}
