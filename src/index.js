let gameContainer;
let levelBuilderOpen = false;
let levelArtBuilderOpen = false;
let canSave = false;
let currentLevel;
let currentGame;
let characterMenuSpriteMoveInterval;
let levelList;
document.addEventListener("DOMContentLoaded", run());

function run() {
  gameContainer = document.getElementById("game-container");
  gameContainer.style.display = "none";

  let mainMenuContainer = document.getElementById("main-menu-container");

  let mainMenu = document.createElement("div");
  mainMenu.classList.add("main-menu");
  mainMenuContainer.appendChild(mainMenu);
  let titleElement = document.createElement("h1");
  titleElement.innerText = "Platform Party 6000";
  let subTitleElement = document.createElement("h4");
  subTitleElement.innerText = "Press Any Key To Continue";

  mainMenu.appendChild(titleElement);
  mainMenu.appendChild(subTitleElement);
  mainMenu.addEventListener("click", mainMenuKeyDownEventHandler);

  function mainMenuKeyDownEventHandler(event) {
    gameListMenu();
  }

  function gameListMenu() {
    mainMenu.removeEventListener("click", mainMenuKeyDownEventHandler);

    subTitleElement.innerText = "Select Game";
    gameList = document.createElement("ul");
    gameList.classList.add("menu-list");

    let gameUrl = `http://localhost:3000/api/v1/games/`;
    fetch(gameUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.forEach(game => {
          let gameListItem = document.createElement("li");
          gameListItem.innerText = game.name;
          gameListItem.dataset.id = game.id;
          gameListItem.classList.add("menu-item");
          gameListItem.addEventListener("click", gameSelectEventListener);
          gameList.appendChild(gameListItem);
          new Game(parseInt(game.id), game.name, []);
        });
      });
    let newGameButton = document.createElement("button");
    newGameButton.innerText = "Create New Game";
    newGameButton.classList.add("menu-button");
    newGameButton.addEventListener("click", newGameButtonEventListener);
    gameList.appendChild(newGameButton);

    mainMenu.appendChild(gameList);
  }

  function newGameButtonEventListener(event) {
    gameList.remove();
    subTitleElement.innerText = "Enter Name of New Game: ";
    let newGameForm = document.createElement("form");
    let nameInputField = document.createElement("input");
    newGameForm.appendChild(nameInputField);
    let newSubmitField = document.createElement("button");
    newSubmitField.type = "submit";
    newSubmitField.innerText = "submit";
    newGameForm.appendChild(newSubmitField);
    newGameForm.addEventListener("submit", newGameFormEventListener);
    mainMenu.appendChild(newGameForm);
  }

  function newGameFormEventListener(event) {
    event.preventDefault();
    if (event.target.childNodes[0].value !== "") {
      let obj = { name: event.target.childNodes[0].value };
      let gameUrl = `http://localhost:3000/api/v1/games/`;
      fetch(gameUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then(res => res.json())
        .then(data => console.log(data));
      document.location.reload();
    }
  }

  function gameSelectEventListener(event) {
    let game_id = parseInt(event.target.dataset.id);
    currentGame = Game.all.find(game => game.id === game_id);
    gameList.remove();
    levelListMenu(game_id);
  }

  function levelListMenu(game_id) {
    titleElement.innerText = currentGame.name;
    subTitleElement.innerText = "Select Level To Play";

    levelList = document.createElement("ul");
    levelList.classList.add("menu-list");
    let levelUrl = `http://localhost:3000/api/v1/games/`;
    fetch(levelUrl)
      .then(res => res.json())
      .then(data => {
        data.forEach(game => {
          if (game_id === game.id) {
            game.levels.forEach(level => {
              let levelListItem = document.createElement("li");
              levelListItem.classList.add("menu-item")
              levelListItem.innerText = level.name;
              levelListItem.dataset.id = level.id;
              levelListItem.addEventListener("click", levelSelectEventListener);
              levelList.appendChild(levelListItem);
              currentGame.levels.push(new Level(level, gameContainer));
            });
          }
        });
      });

    let deleteGameButton = document.createElement("button");
    deleteGameButton.innerText = "Delete Game";
    deleteGameButton.classList.add("menu-button");
    deleteGameButton.addEventListener("click", deleteGameButtonEventHandler);
    levelList.appendChild(deleteGameButton);

    mainMenu.appendChild(levelList);
  }

  function deleteGameButtonEventHandler(event) {
    if (window.confirm("Are you sure you want to delete the game? This is not reversible.")) {
      let levelUrl = `http://localhost:3000/api/v1/games/${currentGame.id}`;
      fetch(levelUrl, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => console.log(data));
      document.location.reload();
    }
  }

  function levelSelectEventListener(event) {
    console.log(event.target);
    //setup Player
    let startY = gameContainer.clientHeight - 50;
    let startX = 30;
    player = new Player(0, 0, gameContainer);

    //setup level
    currentLevel = Level.all.find(level => level.id === parseInt(event.target.dataset.id));

    characterListMenu();
  }

  function characterListMenu() {
    levelList.remove();
    subTitleElement.innerText = "Select Your Character";
    let character1IdleSprites = [
      "url(./assets/dinoBlueCharacter/dinoBlueIdleRight.png)",
      "url(./assets/dinoBlueCharacter/dinoBlueIdle2.png)",
      "url(./assets/dinoBlueCharacter/dinoBlueIdle3.png)",
      "url(./assets/dinoBlueCharacter/dinoBlueIdle4.png)"
    ];
    let characterDiv1 = document.createElement("div");
    characterDiv1.style.minHeight = "68px";
    characterDiv1.style.minWidth = "60px";
    characterDiv1.style.maxWidth = "60px";
    characterDiv1.style.position = "absolute";
    characterDiv1.style.left = "450px";
    characterDiv1.style.top = "325px";
    characterDiv1.style.backgroundImage = "url(./assets/dinoBlueCharacter/dinoBlueIdleRight.png)";
    characterDiv1.style.backgroundRepeat = "no-repeat";
    characterDiv1.style.backgroundSize = "cover";
    characterDiv1.dataset.character = "blue";
    // let character2Name = document.createElement("h4");
    // character2Name.innerText = "Meep";
    // character2Name.style.top = "450px";
    // characterDiv1.appendChild(character2Name)
    characterDiv1.addEventListener("click", characterSelectEvent);
    mainMenu.appendChild(characterDiv1);
    let character2IdleSprites = [
      "url(./assets/dinoRedCharacter/dinoRedIdleRight.png)",
      "url(./assets/dinoRedCharacter/dinoRedIdle2.png)",
      "url(./assets/dinoRedCharacter/dinoRedIdle3.png)",
      "url(./assets/dinoRedCharacter/dinoRedIdle4.png)"
    ];
    let characterDiv2 = document.createElement("div");
    characterDiv2.style.minHeight = "68px";
    characterDiv2.style.minWidth = "60px";
    characterDiv2.style.maxWidth = "60px";
    characterDiv2.style.position = "absolute";
    characterDiv2.style.left = "525px";
    characterDiv2.style.top = "325px";
    characterDiv2.style.backgroundImage = "url(./assets/dinoRedCharacter/dinoRedIdleRight.png)";
    characterDiv2.style.backgroundRepeat = "no-repeat";
    characterDiv2.style.backgroundSize = "cover";
    characterDiv2.dataset.character = "red";
    characterDiv2.addEventListener("click", characterSelectEvent);
    mainMenu.appendChild(characterDiv2);
    let character3IdleSprites = [
      "url(./assets/dinoGoldCharacter/dinoGoldIdleRight.png)",
      "url(./assets/dinoGoldCharacter/dinoGoldIdle2.png)",
      "url(./assets/dinoGoldCharacter/dinoGoldIdle3.png)",
      "url(./assets/dinoGoldCharacter/dinoGoldIdle4.png)"
    ];
    let characterDiv3 = document.createElement("div");
    characterDiv3.style.minHeight = "68px";
    characterDiv3.style.minWidth = "60px";
    characterDiv3.style.maxWidth = "60px";
    characterDiv3.style.position = "absolute";
    characterDiv3.style.left = "600px";
    characterDiv3.style.top = "325px";
    characterDiv3.style.backgroundImage = "url(./assets/dinoGoldCharacter/dinoGoldIdleRight.png)";
    characterDiv3.style.backgroundRepeat = "no-repeat";
    characterDiv3.style.backgroundSize = "cover";
    characterDiv3.dataset.character = "gold";
    characterDiv3.addEventListener("click", characterSelectEvent);
    mainMenu.appendChild(characterDiv3);
    let character4IdleSprites = [
      "url(./assets/dinoGreenCharacter/dinoGreenIdleRight.png)",
      "url(./assets/dinoGreenCharacter/dinoGreenIdle2.png)",
      "url(./assets/dinoGreenCharacter/dinoGreenIdle3.png)",
      "url(./assets/dinoGreenCharacter/dinoGreenIdle4.png)"
    ];
    let characterDiv4 = document.createElement("div");
    characterDiv4.style.minHeight = "68px";
    characterDiv4.style.minWidth = "60px";
    characterDiv4.style.maxWidth = "60px";
    characterDiv4.style.position = "absolute";
    characterDiv4.style.left = "675px";
    characterDiv4.style.top = "325px";
    characterDiv4.style.backgroundImage = "url(./assets/dinoGreenCharacter/dinoGreenIdleRight.png)";
    characterDiv4.style.backgroundRepeat = "no-repeat";
    characterDiv4.style.backgroundSize = "cover";
    characterDiv4.dataset.character = "green";
    characterDiv4.addEventListener("click", characterSelectEvent);
    mainMenu.appendChild(characterDiv4);

    characterMenuSpriteMoveInterval = setInterval(moveIdleSprites, 80);
    let characterSpriteIndex = 0;
    function moveIdleSprites() {
      characterDiv1.style.backgroundImage = character1IdleSprites[characterSpriteIndex];
      characterDiv2.style.backgroundImage = character2IdleSprites[characterSpriteIndex];
      characterDiv3.style.backgroundImage = character3IdleSprites[characterSpriteIndex];
      characterDiv4.style.backgroundImage = character4IdleSprites[characterSpriteIndex];
      if (characterSpriteIndex < 3) {
        characterSpriteIndex++;
      } else {
        characterSpriteIndex = 0;
      }
    }
  }

  function characterSelectEvent(event) {
    clearInterval(characterMenuSpriteMoveInterval);
    if (event.target.dataset.character === "blue") {
      player.rightMovingSpriteArray = [
        "url(./assets/dinoBlueCharacter/dinoBlueRunRight1.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunRight2.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunRight3.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunRight4.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunRight5.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunRight6.png)"
      ];
      player.leftMovingSpriteArray = [
        "url(./assets/dinoBlueCharacter/dinoBlueRunLeft1.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunLeft2.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunLeft3.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunLeft4.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunLeft5.png)",
        "url(./assets/dinoBlueCharacter/dinoBlueRunLeft6.png)"
      ];
      player.idleSpriteArray = ["url(./assets/dinoBlueCharacter/dinoBlueIdleRight.png)", "url(./assets/dinoBlueCharacter/dinoBlueIdleLeft.png)"];
      player.deathSpriteArray = ["url(./assets/dinoBlueCharacter/dinoBlueDeath1.png)", "url(./assets/dinoBlueCharacter/dinoBlueDeath2.png)", "url(./assets/dinoBlueCharacter/dinoBlueDeath3.png)"];
    } else if (event.target.dataset.character === "red") {
      player.rightMovingSpriteArray = [
        "url(./assets/dinoRedCharacter/dinoRedRunRight1.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunRight2.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunRight3.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunRight4.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunRight5.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunRight6.png)"
      ];
      player.leftMovingSpriteArray = [
        "url(./assets/dinoRedCharacter/dinoRedRunLeft1.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunLeft2.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunLeft3.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunLeft4.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunLeft5.png)",
        "url(./assets/dinoRedCharacter/dinoRedRunLeft6.png)"
      ];
      player.idleSpriteArray = ["url(./assets/dinoRedCharacter/dinoRedIdleRight.png)", "url(./assets/dinoRedCharacter/dinoRedIdleLeft.png)"];
      player.deathSpriteArray = ["url(./assets/dinoRedCharacter/dinoRedDeath1.png)", "url(./assets/dinoRedCharacter/dinoRedDeath2.png)", "url(./assets/dinoRedCharacter/dinoRedDeath3.png)"];
    } else if (event.target.dataset.character === "gold") {
      player.rightMovingSpriteArray = [
        "url(./assets/dinoGoldCharacter/dinoGoldRunRight1.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunRight2.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunRight3.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunRight4.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunRight5.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunRight6.png)"
      ];
      player.leftMovingSpriteArray = [
        "url(./assets/dinoGoldCharacter/dinoGoldRunLeft1.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunLeft2.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunLeft3.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunLeft4.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunLeft5.png)",
        "url(./assets/dinoGoldCharacter/dinoGoldRunLeft6.png)"
      ];
      player.idleSpriteArray = ["url(./assets/dinoGoldCharacter/dinoGoldIdleRight.png)", "url(./assets/dinoGoldCharacter/dinoGoldIdleLeft.png)"];
      player.deathSpriteArray = ["url(./assets/dinoGoldCharacter/dinoGoldDeath1.png)", "url(./assets/dinoGoldCharacter/dinoGoldDeath2.png)", "url(./assets/dinoGoldCharacter/dinoGoldDeath3.png)"];
    } else if (event.target.dataset.character === "green") {
      player.rightMovingSpriteArray = [
        "url(./assets/dinoGreenCharacter/dinoGreenRunRight1.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunRight2.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunRight3.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunRight4.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunRight5.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunRight6.png)"
      ];
      player.leftMovingSpriteArray = [
        "url(./assets/dinoGreenCharacter/dinoGreenRunLeft1.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunLeft2.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunLeft3.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunLeft4.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunLeft5.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenRunLeft6.png)"
      ];
      player.idleSpriteArray = ["url(./assets/dinoGreenCharacter/dinoGreenIdleRight.png)", "url(./assets/dinoGreenCharacter/dinoGreenIdleLeft.png)"];
      player.deathSpriteArray = [
        "url(./assets/dinoGreenCharacter/dinoGreenDeath1.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenDeath2.png)",
        "url(./assets/dinoGreenCharacter/dinoGreenDeath3.png)"
      ];
    }

    currentLevel.init();
    player.setLevel(currentLevel);
    //close menu
    player.disabled = false;
    mainMenu.style.display = "none";
    mainMenuContainer.style.display = "none";
    runGame();
  }

  function runGame() {
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

    let levelCounter = 0;
    function draw() {
      levelCounter++;
      if (!currentLevel.disabled && currentLevel.movers.length > 0) {
        currentLevel.progress(player, levelCounter % 4);
      }
      if (!player.disabled) {
        player.draw({ left: leftPressed, right: rightPressed, jump: jumpPressed, dash: dashPressed });
        if (dashPressed) {
          dashPressed = false;
        }
      }
    }

    function showOptionMenu() {
      optionMenu = document.createElement("div");
      optionMenu.classList.add("option-menu");
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

      optionMenu.appendChild(optionList);
      gameContainer.appendChild(optionMenu);
    }

    function optionItemEventListener(event) {
      console.log(event.target);
      if (event.target.innerText === "Return to Game") {
        optionMenu.remove();
        optionMenuOpen = false;
      } else if (event.target.innerText === "Exit to Main Menu") {
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
        if (!levelBuilderOpen && !levelArtBuilderOpen) {
          levelBuilderOpen = true;
          // debugger
          levelBuilder();
        }
      }
      if (event.keyCode === 80 || event.key === "p") {
        if (!levelBuilderOpen && !levelArtBuilderOpen) {
          levelArtBuilderOpen = true;
          // debugger
          levelArtBuilder();
        }
      } else if (event.key === "?") {
        debugger;
      }
      if (event.keyCode === 27 || event.key === "Escape") {
        if (optionMenuOpen) {
          optionMenu.remove();
          optionMenuOpen = false;
        } else {
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
