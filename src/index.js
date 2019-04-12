document.addEventListener("DOMContentLoaded", run());

function run(){
  let gameContainer = document.getElementById("game-container");

  let rightPressed = false;
  let leftPressed = false;
  document.addEventListener("keydown", keyDownEventHandler);

  let startY = (gameContainer.clientHeight - 50)
  let startX = 30;
  let player = new Player(startX, startY, gameContainer);
  // debugger

  setInterval(draw, 50);

  function draw(){
    player.draw();
  }

  function checkCollision(){

  }

  //event handlers
  function keyDownEventHandler(event){
    if(event.key === "Right" || event.key === "ArrowRight"){
      console.log("event handler right")
      rightPressed = true;
    }
    else if(event.key === "left" || event.key === "ArrowLeft"){
      console.log("event handler left")
      leftPressed = true;
    }
    if(event.keyCode === 32 || event.key === "Space"){
      console.log("event handler space")
      console.log(player)
      player.jump();
    }
  }
}
