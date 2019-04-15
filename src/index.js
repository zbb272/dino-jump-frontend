let gameContainer;
document.addEventListener("DOMContentLoaded", run());

function run(){
  gameContainer = document.getElementById("game-container");

  let rightPressed = false;
  let leftPressed = false;
  let jumpPressed = false;
  document.addEventListener("keydown", keyDownEventHandler);
  document.addEventListener("keyup", keyUpEventHandler);

  let startY = (gameContainer.clientHeight - 50)
  let startX = 30;
  let player = new Player(startX, startY, gameContainer);
  createTestLevel();
  // debugger

  setInterval(draw, 20);

  function draw(){
    // checkCollision();
    player.draw(leftPressed, rightPressed, jumpPressed);
  }

  function createTestLevel(){
    let platform2 = new Block(0, gameContainer.clientHeight - 100, 300, 100, gameContainer);
    let platform3 = new Block(300, gameContainer.clientHeight - 250, 50, 250, gameContainer);
    //let platform4 = new Block(400, 200, 50, 200, gameContainer);
    let platform5 = new Block(550, gameContainer.clientHeight - 220, 75, 220, gameContainer);
    let platform6 = new Block(1000, gameContainer.clientHeight - 300, gameContainer.clientWidth - 1000, 300, gameContainer);
    let platform11 = new Block(800, gameContainer.clientHeight - 200, 10, 15, gameContainer);
    let platform7 = new Block(875, gameContainer.clientHeight - 500, 100, 15, gameContainer);
    let platform8 = new Block(700, gameContainer.clientHeight - 500, 75, 15, gameContainer);
    let platform9 = new Block(500, gameContainer.clientHeight - 600, 50, 15, gameContainer);
    let platform10 = new Block(200, gameContainer.clientHeight - 650, 24, 5, gameContainer);
  }

  //event handlers
  function keyDownEventHandler(event){
    if(event.key === "Right" || event.key === "ArrowRight"){
      rightPressed = true;
      console.log("right");
    }
    else if(event.key === "left" || event.key === "ArrowLeft"){
      leftPressed = true;
    }
    if(event.keyCode === 32 || event.key === "Space"){
      jumpPressed = true;
    }
    if(event.keyCode === 76 || event.key === "l"){
      levelBuilder();
    }
    else if (event.key === "?") {
      debugger;
    }
  }

  function keyUpEventHandler(event){
    if(event.key === "Right" || event.key === "ArrowRight"){
      rightPressed = false;
      player.haltRight();
    }
    else if(event.key === "left" || event.key === "ArrowLeft"){
      leftPressed = false;
      player.haltLeft();
    }
    if (event.keyCode === 32 || event.key === "Space") {
      jumpPressed = false;
      player.haltJump();
    }
  }
}
