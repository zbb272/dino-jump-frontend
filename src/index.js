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
    let obj = {x: 0, y: gameContainer.clientHeight - 100, width: 300, height: 100, gameContainer: gameContainer, color: "black", status: "platform"}
    let platform2 = new Block(obj);
    obj = {x: 300, y: gameContainer.clientHeight - 250, width: 50, height: 250, gameContainer: gameContainer, color: "black", status: "platform"}
    let platform3 = new Block(obj);
    obj = {x: 550, y: gameContainer.clientHeight - 220, width: 75, height: 220, gameContainer: gameContainer, color: "black", status: "platform"}
    let platform5 = new Block(obj);
    obj = {x: 1000, y: gameContainer.clientHeight - 300, width: gameContainer.clientWidth - 1000, height: 300, gameContainer: gameContainer, color: "black", status: "platform"}
    let platform6 = new Block(obj);
    obj = {x: 800, y: gameContainer.clientHeight - 200, width: 10, height: 15, gameContainer: gameContainer, color: "black", status: "platform"}
    let platform11 = new Block(obj);
    obj = {x: 875, y: gameContainer.clientHeight - 500, width: 100, height: 15, gameContainer: gameContainer, color: "black", status: "platform"}
    let platform7 = new Block(obj);
    obj = {x: 700, y: gameContainer.clientHeight - 500, width: 75, height: 15, gameContainer: gameContainer, color: "black", status: "platform"}
    let platform8 = new Block(obj);
    obj = {x: 500, y: gameContainer.clientHeight - 600, width: 50, height: 15, gameContainer: gameContainer, color: "black", status: "platform"}
    let platform9 = new Block(obj);
    obj = {x: 250, y: gameContainer.clientHeight - 650, width: 24, height: 5, gameContainer: gameContainer, color: "black", status: "platform"}
    let platform10 = new Block(obj);
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