let gameContainer;
let levelBuilderOpen = false;
let currentLevel;
document.addEventListener("DOMContentLoaded", run());

function run() {
  gameContainer = document.getElementById("game-container");
  gameContainer.style.display = "none";

  let mainMenu = document.getElementById("main-menu");
  let titleElement = document.createElement("h1");
  titleElement.innerText = "Platform Party 6000";
  let subTitleElement = document.createElement("h4");
  subTitleElement.innerText = "Press Any Key To Continue";

  mainMenu.appendChild(titleElement);
  mainMenu.appendChild(subTitleElement);
  mainMenu.addEventListener("click", mainMenuKeyDownEventHandler);

  function mainMenuKeyDownEventHandler(event){
    gameListMenu();
  }

  function gameListMenu(){
    mainMenu.removeEventListener("click", mainMenuKeyDownEventHandler);

    subTitleElement.innerText = "Select Game To Play";
    gameList = document.createElement("ul");
    let gameListItem = document.createElement("li");
    gameListItem.innerText = "Test Game";
    gameListItem.addEventListener("click", gameSelectEventListener);
    gameList.appendChild(gameListItem);
    mainMenu.appendChild(gameList);
  }

  function gameSelectEventListener(event){
    gameList.remove();
    levelListMenu();
  }

  function levelListMenu(){
    subTitleElement.innerText = "Select Level To Play";
    let levelList = document.createElement("ul");

    let levelUrl = `http://localhost:3000/api/v1/levels/`;
    fetch(levelUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.forEach(level => {
          let levelListItem = document.createElement("li");
          levelListItem.innerText = level.name;
          levelListItem.dataset.id = level.id;
          levelListItem.addEventListener("click", levelSelectEventListener);
          levelList.appendChild(levelListItem);
          new Level(level, gameContainer)
        })
      })

    mainMenu.appendChild(levelList);

  }

  function levelSelectEventListener(event){
    console.log(event.target)
    //setup Player
    let startY = gameContainer.clientHeight - 50;
    let startX = 30;
    player = new Player(0, 0, gameContainer);

    //setup level
    currentLevel = Level.all.find(level => level.id === parseInt(event.target.dataset.id));
    currentLevel.render();
    player.setLevel(currentLevel);
    player.disabled = false;

    //close menu
    mainMenu.style.display = "none";
    runGame();
  }



  function runGame(){
    // gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "block";

    let optionMenuOpen = false;

    let rightPressed = false;
    let leftPressed = false;
    let jumpPressed = false;
    let dashPressed = false;
    document.addEventListener("keydown", keyDownEventHandler);
    document.addEventListener("keyup", keyUpEventHandler);


    // let currentLevel;

    let level = "";
    let levelUrl = `http://localhost:3000/api/v1/levels/`;

    setInterval(draw, 20);

    function draw() {
      // checkCollision();
      if (!player.disabled) {
        player.draw({ left: leftPressed, right: rightPressed, jump: jumpPressed, dash: dashPressed });
        if (dashPressed) {
          dashPressed = false;
        }
      }
    }

    function showOptionMenu(){
      optionMenu = document.createElement("div");
      optionMenu.classList.add("option-menu")
      optionMenuTitle = document.createElement("h2");
      optionMenuTitle.innerText = "Options";
      optionMenu.appendChild(optionMenuTitle);
      optionList = document.createElement("ul");

      returnItem = document.createElement("li");
      returnItem.innerText = "Return to Game";
      returnItem.addEventListener("click", optionItemEventListener);
      optionList.appendChild(returnItem);

      optionItem = document.createElement("li");
      optionItem.innerText = "Exit to Main Menu";
      optionItem.addEventListener("click", optionItemEventListener);
      optionList.appendChild(optionItem);

      optionMenu.appendChild(optionList)
      gameContainer.appendChild(optionMenu)
    }

    function optionItemEventListener(event){
      console.log(event.target)
      if(event.target.innerText === "Return to Game"){
        optionMenu.remove();
        optionMenuOpen = false;
      }
      else if(event.target.innerText === "Exit to Main Menu"){
        document.location.reload();
      }
    }

    //event handlers
    function keyDownEventHandler(event) {
      // event.preventDefault();
      if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
        console.log("right");
      } else if (event.key === "left" || event.key === "ArrowLeft") {
        leftPressed = true;
      }
      if (event.keyCode === 32 || event.key === "Space") {
        jumpPressed = true;
      }
      if (event.keyCode === 16) {
        dashPressed = true;
      }
      if (event.keyCode === 76 || event.key === "l") {
        if (!levelBuilderOpen) {
          levelBuilderOpen = true;
          // debugger
          levelBuilder();
        }
      } else if (event.key === "?") {
        debugger;
      }
      if(event.keyCode === 27 || event.key === "Escape"){
        if(optionMenuOpen){
          optionMenu.remove();
          optionMenuOpen = false;
        }
        else{
          optionMenuOpen = true;
          showOptionMenu();
        }
      }

      //temporary power toggles
      if (event.key === "w") {
        player.wallJumpUnlocked = !player.wallJumpUnlocked;
      }
      if (event.key === "j") {
        player.doubleJumpUnlocked = !player.doubleJumpUnlocked;
      }
      if (event.key === "d") {
        player.dashUnlocked = !player.dashUnlocked;
      }
    }

    function keyUpEventHandler(event) {
      // event.preventDefault();
      if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = false;
        player.haltRight();
      } else if (event.key === "left" || event.key === "ArrowLeft") {
        leftPressed = false;
        player.haltLeft();
      }
      if (event.keyCode === 32 || event.key === "Space") {
        jumpPressed = false;
        player.haltJump();
      }
    }
  }

}
