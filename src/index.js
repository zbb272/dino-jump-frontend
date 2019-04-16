let gameContainer;
let levelBuilderOpen = false;
let currentLevel;
document.addEventListener("DOMContentLoaded", run());

function run() {
  gameContainer = document.getElementById("game-container");

  let rightPressed = false;
  let leftPressed = false;
  let jumpPressed = false;
  let dashPressed = false;
  document.addEventListener("keydown", keyDownEventHandler);
  document.addEventListener("keyup", keyUpEventHandler);

  let startY = gameContainer.clientHeight - 50;
  let startX = 30;
  let player = new Player(0, 0, gameContainer);
  // let currentLevel;

  let level = "";
  let levelUrl = `http://localhost:3000/api/v1/levels/`;

  init();
  setInterval(draw, 20);

  function getLevels() {
    return fetch(levelUrl)
      .then(res => res.json())
      .then(levels => {
        levels.forEach(levelData => {
          const level = new Level(levelData, gameContainer);
        });
      })
      .then(() => {
        levelForm();
      });
  }

  function init() {
    getLevels().then(() => {
      currentLevel = Level.all[0];
      currentLevel.render();
      // debugger;
      player.setLevel(currentLevel);
      player.disabled = false;
    });
  }

  function levelForm() {
    const form = document.getElementById("level-select-form");
    const select = document.getElementById("level-select");

    Level.all.forEach(level => {
      const option = document.createElement("option");
      option.name = level.name;
      option.dataset.id = level.id;
      option.innerHTML = level.name;
      select.appendChild(option);
    });
    form.addEventListener("submit", e => {
      e.preventDefault();

      selectLevel(select.options[select.selectedIndex].dataset.id);
    });
  }
  function selectLevel(id) {
    fetch(levelUrl + id)
      .then(res => res.json())
      .then(data => {
        const level = new Level(data, gameContainer);
        level.render();
        currentLevel.drop();
        player.level = level;
        player.setLevel(level);
        currentLevel = level;
      });
  }

  function draw() {
    // checkCollision();
    if (!player.disabled) {
      player.draw({ left: leftPressed, right: rightPressed, jump: jumpPressed, dash: dashPressed });
      if (dashPressed) {
        dashPressed = false;
      }
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
