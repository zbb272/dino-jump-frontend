const currentScore = document.getElementById("current-score");
const highScore = document.getElementById("high-score");
const clock = document.getElementById("clock");
class Level {
  static all = [];
  constructor(obj, gameContainer) {
    this.gameContainer = gameContainer;
    this.id = obj.id;
    this.name = obj.name;
    this.startPositionX = obj.startPositionX;
    this.startPositionY = obj.startPositionY;
    this.highScore = obj.high_score.value;
    this.blockSchemas = obj.blocks;
    this.blocks = [];
    this.hazards = [];
    this.goal = [];
    this.coins = [];
    this.powers = [];
    this.movers = [];
    this.currentScore = 0;
    this.disabled = false;
    this.first = true;
    Level.all.push(this);
  }
  init() {
    this.movers.forEach(b => {
      b.reset();
    });
    console.log(this.movers);
    this.time = 0;
    this.timer = setInterval(() => {
      this.time = parseInt(this.time) + 1;
      clock.innerHTML = this.time;
    }, 1000);
    this.render();
  }

  progress(player) {
    if (!this.disabled) {
      this.movers.forEach(block => {
        // fully simultaneous
        if (block.config.dx > 0) {
          if (block.x >= block.config.maxX) {
            block.config.dx = -1 * block.config.dx;
          }
        } else if (block.config.dx < 0) {
          if (block.x <= block.config.minX) {
            block.config.dx = -1 * block.config.dx;
          }
        }
        if (block.config.dy > 0) {
          if (block.y >= block.config.maxY) {
            block.config.dy = -1 * block.config.dy;
          }
        } else if (block.config.dy < 0) {
          if (block.y <= block.config.minY) {
            block.config.dy = -1 * block.config.dy;
          }
        }
        block.move(player);

        block.render();
      });
    }
  }
  complete() {
    let i = currentGame.levels.indexOf(this);
    i++;
    if (i === currentGame.levels.length) {
      i = 0;
    }
    this.drop();
    currentLevel = currentGame.levels[i];
    currentLevel.init();
  }

  render() {
    this.movers.forEach(b => b.reset());
    this.renderScore();
    if (this.first) {
      this.blockSchemas.forEach(b => {
        const block = new Block(b, this.gameContainer);
        this.add(block);
      });
    }
    this.first = false;
  }

  renderScore() {
    highScore.innerHTML = this.highScore;
    currentScore.innerHTML = this.currentScore;
  }

  updateHighScore(num) {
    this.highScore = num;
    this.renderScore();
  }

  updateScore(num = 0) {
    this.currentScore = parseInt(this.currentScore) + num;
    this.renderScore();
  }

  add(block) {
    if (block.status === "goal") {
      this.goal.push(block);
    } else if (block.status === "enemy") {
      this.hazards.push(block);
    } else if (block.status === "coin") {
      this.coins.push(block);
    } else if (block.status === "doubleJump" || block.status === "walljump" || block.status === "dash") {
      console.log("Power");
      this.coins.push(block);
    }
    if (block.color.substr(0, 5) === "mover") {
      block.configMovement();
      this.movers.push(block);
    }
    this.blocks.push(block);
  }
  removeCoin(block) {
    console.log("Touched");
    this.coins.splice(this.coins.indexOf(block), 1);
    block.remove();
  }

  drop() {
    this.blocks.forEach(block => block.container.remove());
  }
  callTime(complete) {
    clearInterval(this.timer);
    if (complete) {
      if (this.time <= 120) {
        this.updateScore(120 - parseInt(this.time));
      }
    }
    this.time = 0;
  }
  submitScore() {
    fetch("http://localhost:3000/api/v1/scores/", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ level_id: this.id, value: this.currentScore })
    })
      .then(res => console.log(res))
      .then(() => {
        if (this.currentScore > this.highScore) {
          this.highScore = this.currentScore;
        }
        this.currentScore = 0;
      });
  }
}
