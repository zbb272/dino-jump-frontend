class Player {
  constructor(startX, startY, gameContainer) {
    this.x = startX;
    this.y = startY;
    this.lastX = startX;
    this.lastY = startY;
    this.dx = 0;
    this.dy = 0;
    this.height = 37;
    this.width = 23;
    this.lives = 5;

    //values for easing collision calculations
    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;

    //movement upgrades
    this.doubleJumpUnlocked = false;
    this.wallJumpUnlocked = false;
    this.dashUnlocked = false;

    //storing key inputs
    this.movingLeft = false;
    this.movingRight = false;
    this.jumping = false;
    this.doubleJump = true;
    this.dashing = 0;

    //html stuff
    this.renderLives();
    this.gameContainer = gameContainer;
    this.container = document.createElement("div");
    this.container.classList.add("player");
    this.gameContainer.appendChild(this.container);
    this.disabled = true;

    //character image
    this.container.style.backgroundImage = "url(./assets/dinoBlueCharacter/dinoBlueIdle1.png)"
    this.rightMovingSpriteArray = ["url(./assets/dinoBlueCharacter/dinoBlueRunRight1.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunRight2.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunRight3.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunRight4.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunRight5.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunRight6.png)"];
    this.leftMovingSpriteArray = ["url(./assets/dinoBlueCharacter/dinoBlueRunLeft1.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunLeft2.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunLeft3.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunLeft4.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunLeft5.png)", "url(./assets/dinoBlueCharacter/dinoBlueRunLeft6.png)"];
    this.idleSpriteArray = ["url(./assets/dinoBlueCharacter/dinoBlueIdle1.png)", "url(./assets/dinoBlueCharacter/dinoBlueIdle2Left.png)"];
    this.rightMovingSpriteIndex = 0;
    this.leftMovingSpriteIndex = 0;
    this.idleSpriteIndex = 0;
  }

  setLevel(level) {
    this.setXY(level.startPositionX, level.startPositionY);
    this.level = level;
  }

  setXY(x, y) {
    if (this.x !== x) {
      this.lastX = this.x;
    }
    if (this.y !== y) {
      this.lastY = this.y;
    }
    this.x = x;
    this.y = y;
    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;
  }

  //only spot this.x and this.y should be modified

  //triggered by an early keyup, allows for shorter jumps
  haltJump() {
    console.log("Halt jump");
    this.jumping = false;
    if (this.isAirborne()) {
      if (this.dy < 0) {
        this.dy = this.dy / 2;
        this.dy = Math.floor(this.dy);
      }
    }
  }

  //max jump height set here
  processJumpInput() {
    if (!this.isAirborne()) {
      console.log("jump");
      this.jumping = true;
      this.jump(20);
    } else if (this.wallJumpUnlocked && this.isAgainstWall() !== 0) {
      this.jumping = true;
      console.log("walljump");
      this.wallJump(15, this.isAgainstWall() * 10);
    } else if (this.doubleJumpUnlocked && this.doubleJump && this.dashing === 0) {
      this.jumping = true;
      console.log("djump");
      this.doubleJump = false;
      this.jump(10);
    }
  }

  jump(n) {
    this.dy = -1 * n;
  }
  wallJump(y, x) {
    this.jump(y);
    this.dx = x;
  }

  initiateDash() {
    this.dashing = 7;
    this.dy = 0;
    let direction = 0;
    if (this.isAirborne()) {
      this.jumping = true;
    }

    if (this.movingRight) {
      direction = 1;
    } else if (this.movingLeft) {
      direction = -1;
    }

    this.dx = direction * 30;
  }
  completeDash() {
    this.jumping = false;

    this.dx = 0;
    this.dashing = 1;
    console.log("dash ending");
    setTimeout(() => {
      console.log("dash ended");
      this.dashing = 0;
    }, 200);
  }

  //triggered by keyUp --- applies slow()
  haltLeft() {
    this.movingLeft = false;
  }
  haltRight() {
    this.movingRight = false;
  }

  //gradually fall when airborne
  applyGravity() {
    if (this.isAirborne() && this.dashing <= 1 && this.dy <= 30) {
      this.dy += 1;
    }
    if (this.isAgainstWall() && this.wallJumpUnlocked && this.dy > 5) {
      this.dy = 3;
    }
  }

  //produces a sliding/skidding if you are moving too fast
  slowDown() {
    if (this.dx < 2 && this.dx > -2) {
      this.dx = 0;
    } else {
      if (this.dx > 0) {
        this.dx -= this.dx / 5;
        this.dx = Math.floor(this.dx);
      } else {
        this.dx -= this.dx / 5;
        this.dx = Math.ceil(this.dx);
      }
    }
  }

  //can't instantly change direction in the air, but can slow down/speed up
  moveRight() {
    this.movingRight = true;
    if (this.isAgainstWall() !== -1) {
      if (this.isAirborne() && this.dx < 0) {
        this.slowDown();
      } else if (this.dx < 2) {
        this.dx = 4;
      } else if (this.dx < 10) {
        this.dx += 1;
      }
    }
  }
  moveLeft() {
    this.movingLeft = true;
    if (this.isAgainstWall() !== 1) {
      if (this.isAirborne() && this.dx > 0) {
        this.slowDown();
      } else if (this.dx > -2) {
        this.dx = -4;
      } else if (this.dx > -10) {
        this.dx += -1;
      }
    }
  }

  collidesCoin(obj) {
    if (obj.status === "coin") {
      this.level.removeCoin(obj);
      this.level.updateScore(10);
      return true;
    } else if (obj.status === "doubleJump") {
      this.level.removeCoin(obj);
      this.doubleJumpUnlocked = true;
      return true;
    } else if (obj.status === "wallJump") {
      this.level.removeCoin(obj);
      this.wallJumpUnlocked = true;
      return true;
    } else if (obj.status === "dash") {
      this.level.removeCoin(obj);
      this.dashUnlocked = true;
      return true;
    }
    return false;
  }

  //collisions are against each object target
  // first checks if the object is above/below/ahead/behind the given object
  // then determines if the object's relevant side would pass through the object's relevant side if current dx/dy were applied.
  collidesTop(objects, value = this.dy, interceptValue = this.dx, shrink = false) {
    let ret = false;
    if (this.y + this.dy <= 0) {
      return true;
    } else if (objects.length > 0) {
      objects.forEach(obj => {
        if (obj.visible && this.verticallyIntercepts(obj, interceptValue, shrink) && this.top >= obj.bottom && this.top + value <= obj.bottom) {
          if (!this.collidesCoin(obj)) {
            ret = obj;
          }
        }
      });
    }
    return ret;
  }
  //additional paramater here so as to check airborne(doesn't consider dx or)
  //if collision with bottom, reset to original position
  collidesBottom(objects, yValue = this.dy, xValue = this.dx, shrink = false) {
    let ret = false;
    if (this.y + yValue + this.height >= this.gameContainer.clientHeight) {
      this.die();
    } else if (objects.length > 0) {
      objects.forEach(obj => {
        if (obj.visible && this.verticallyIntercepts(obj, xValue, shrink) && this.bottom <= obj.top && this.bottom + yValue >= obj.top) {
          if (!this.collidesCoin(obj)) {
            ret = obj;
          }
        }
      });
      return ret;
    }
  }
  collidesLeft(objects, xValue = this.dx, yValue = this.dy, shrink = false) {
    let ret = false;
    if (this.x + this.dx <= 0) {
      return true;
    } else if (objects.length > 0) {
      objects.forEach(obj => {
        if (obj.visible && this.horizontallyIntercepts(obj, yValue, shrink) && this.left + xValue <= obj.right && this.left >= obj.right) {
          if (!this.collidesCoin(obj)) {
            ret = obj;
          }
        }
      });
      return ret;
    }
  }
  collidesRight(objects, xValue = this.dx, yValue = this.dy, shrink = false) {
    let ret = false;
    if (this.x + this.dx + this.width >= this.gameContainer.clientWidth) {
      return true;
    } else if (objects.length > 0) {
      objects.forEach(obj => {
        if (obj.visible && this.horizontallyIntercepts(obj, yValue, shrink) && this.right <= obj.left && this.right + xValue >= obj.left) {
          if (!this.collidesCoin(obj)) {
            ret = obj;
          }
        }
      });
    }
    return ret;
  }

  collidesAll(objects, wiggle) {
    return this.collidesLeft(objects, -1, wiggle, true) || this.collidesRight(objects, 1, wiggle, true) || this.collidesBottom(objects, 1, wiggle, true) || this.collidesTop(objects, -1, wiggle, true);
  }
  specialCollisions() {
    this.goalCollisions();
    this.badCollisions();
  }

  badCollisions() {
    if (typeof this.collidesAll(this.level.hazards, 3) === "object") {
      this.die();
    }
  }
  goalCollisions() {
    if (typeof this.collidesAll(this.level.goal, 0) === "object") {
      this.disabled = true;
      this.level.updateScore(100);
      this.level.callTime(true);
      this.level.submitScore();
      const success = document.createElement("div");
      success.classList.add("option-menu");
      success.innerHTML = "LEVEL COMPLETE";
      this.gameContainer.appendChild(success);
      setTimeout(() => {
        success.remove();
        this.level.drop();
        this.level.complete();
        this.level = currentLevel;
        this.dx = 0;
        this.dy = 0;
        this.setXY(this.level.startPositionX, this.level.startPositionY);
        this.disabled = false;
      }, 2500);
    }
  }
  die() {
    this.disabled = true;
    this.setXY(this.level.startPositionX, this.level.startPositionY);
    this.dx = 0;
    this.dy = 0;
    this.lives--;
    this.renderLives();
    if (this.lives === 0) {
      this.gameOver();
    } else {
      setTimeout(() => {
        this.disabled = false;
      }, 1000);
    }
  }
  gameOver() {
    this.level.callTime(false);
    this.dx = 0;
    this.dy = 0;
    this.setXY(this.level.startPositionX, this.level.startPositionY);
    this.level.renderScore();
    if (this.level.currentScore > 0) {
      this.level.submitScore();
    }
    const gameOver = document.createElement("div");
    gameOver.classList.add("option-menu");
    gameOver.innerHTML = "GAME OVER";
    this.gameContainer.appendChild(gameOver);
    setTimeout(() => {
      this.lives = 5;
      this.renderLives();
      gameOver.remove();
      this.level.drop();
      this.level.render();
      this.level.init();
      this.disabled = false;
    }, 2500);
  }

  //is the object's current position 1px above another object's top?
  isAirborne() {
    return !this.collidesBottom(this.level.blocks, 1, 0);
  }

  isAgainstWall() {
    if (this.collidesLeft(this.level.blocks, -1, 0)) {
      return 1;
    } else if (this.collidesRight(this.level.blocks, 1, 0)) {
      return -1;
    } else {
      return 0;
    }
  }

  //determines if a block is above/beneath/ahead/behind the player
  horizontallyIntercepts(obj, otherValue, shrink) {
    if (shrink) {
      return obj.top < this.bottom - otherValue && obj.bottom > this.top + otherValue;
    } else {
      return obj.top < this.bottom + otherValue && obj.bottom > this.top + otherValue;
    }
  }
  verticallyIntercepts(obj, otherValue, shrink) {
    if (shrink) {
      return obj.left < this.right - otherValue && obj.right > this.left + otherValue;
    } else {
      return obj.left < this.right + otherValue && obj.right > this.left + otherValue;
    }
  }

  //boolean flag is only true if there are no collisions
  //each time a collision is flagged, the relavant dx/dy is brought down/up slightly
  //final dx/dy will move the player to a position exactly against the object
  collisions() {
    let allGood = false;
    while (!allGood) {
      allGood = true;
      if (this.collidesRight(this.level.blocks)) {
        this.dx -= 1;
        allGood = false;
      }
      if (this.collidesLeft(this.level.blocks)) {
        this.dx += 1;
        allGood = false;
      }
      if (this.collidesBottom(this.level.blocks)) {
        this.dy -= 1;
        allGood = false;
      }
      if (this.collidesTop(this.level.blocks)) {
        this.dy += 1;
        allGood = false;
      }
    }
  }

  //Acts, applies slows, then collisions, then sets values
  draw(inputs) {
    if (!this.disabled) {
      this.specialCollisions();
      if (!this.isAirborne() || (this.isAirborne() && this.isAgainstWall())) {
        this.doubleJump = true;
      }
      if (this.dashing > 2) {
        this.dashing -= 1;
        if (this.dashing <= 2) {
          this.completeDash();
        }
      }
      if (inputs.jump && !this.jumping) {
        this.processJumpInput();
      }
      if (this.dashUnlocked && inputs.dash && this.dashing === 0) {
        this.initiateDash();
      }
      if (inputs.left) {
        this.moveLeft();
      }
      if (inputs.right) {
        this.moveRight();
      }
      this.applyGravity();
      if (!this.isAirborne() && !this.movingRight && !this.movingLeft) {
        this.slowDown();
      }
      this.collisions();
      this.setXY(this.x + this.dx, this.y + this.dy);
      this.render();
    }
  }

  renderLives() {
    const livesBar = document.getElementById("lives-bar");
    // livesBar.innerText = "";
    while (livesBar.firstChild) {
      livesBar.removeChild(livesBar.firstChild);
    }

    for (let i = 0; i < this.lives; i++) {
      // livesBar.innerText += " <3";
      let liveDiv = document.createElement("div");
      liveDiv.style.float = "left"
      liveDiv.style.height = "17px";
      liveDiv.style.width = "17px";
      liveDiv.style.backgroundImage = "url(./assets/hearts/heart.png)";
      livesBar.appendChild(liveDiv);
    }
  }
  render() {
    if (!this.disabled) {
      this.container.style.minHeight = `${this.height}px`;
      this.container.style.minWidth = `${this.width}px`;
      this.container.style.top = `${this.y}px`;
      this.container.style.left = `${this.x}px`;
      if(this.movingRight){
        this.rightMovingSpriteIndex === 5 ? this.rightMovingSpriteIndex = 0 : this.rightMovingSpriteIndex += 1;
        this.leftMovingSpriteIndex = 0;
        this.idleSpriteIndex = 0;
        this.container.style.backgroundImage = this.rightMovingSpriteArray[this.rightMovingSpriteIndex];
      }
      else if(this.movingLeft){
        this.leftMovingSpriteIndex === 5 ? this.leftMovingSpriteIndex = 0 : this.leftMovingSpriteIndex += 1;
        this.rightMovingSpriteIndex = 0;
        this.idleSpriteIndex = 1;
        this.container.style.backgroundImage = this.leftMovingSpriteArray[this.leftMovingSpriteIndex];
      } else {
        // console.log("idle")
        // this.idleSpriteIndex === 3 ? this.idleSpriteIndex = 0 : this.idleSpriteIndex += 1;
        // this.rightMovingSpriteIndex = 0;
        // this.leftMovingSpriteIndex = 0;
        this.container.style.backgroundImage = this.idleSpriteArray[this.idleSpriteIndex];
      }

    }
  }
}
