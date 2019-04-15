class Player {
  constructor(startX, startY, gameContainer) {
    this.x = startX;
    this.y = startY;
    this.dx = 0;
    this.dy = 0;
    this.height = 50;
    this.width = 30;

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
    this.dashing = false;

    //html stuff
    this.gameContainer = gameContainer;
    this.container = document.createElement("div");
    this.container.classList.add("player");
    this.gameContainer.appendChild(this.container);
    this.render();
  }

  //only spot this.x and this.y should be modified
  setXY(x, y) {
    this.x = x;
    this.y = y;
    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;
  }
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
    } else if (this.doubleJumpUnlocked && this.doubleJump) {
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
    this.dashing = true;
    this.dy = 0;
    this.jumping = true;
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
    if (this.isAirborne() && !this.dashing) {
      this.dy += 1;
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
    if (this.isAirborne() && this.dx < 0) {
      this.slowDown();
    } else if (this.dx < 2) {
      this.dx = 4;
    } else if (this.dx < 10) {
      this.dx += 1;
    }
  }
  moveLeft() {
    this.movingLeft = true;
    if (this.isAirborne() && this.dx > 0) {
      this.slowDown();
    } else if (this.dx > -2) {
      this.dx = -4;
    } else if (this.dx > -10) {
      this.dx += -1;
    }
  }

  //collisions are against each object target
  // first checks if the object is above/below/ahead/behind the given object
  // then determines if the object's relevant side would pass through the object's relevant side if current dx/dy were applied.
  collidesTop(objects) {
    let ret = false;
    objects.forEach(obj => {
      if (this.verticallyIntercepts(obj, this.dx) && this.top >= obj.bottom && this.top + this.dy <= obj.bottom) {
        ret = true;
      }
    });
    return ret;
  }
  //additional paramater here so as to check airborne(doesn't consider dx or)
  //if collision with bottom, reset to original position
  collidesBottom(objects, yValue = this.dy, xValue = this.dx) {
    let ret = false;
    if (this.y + yValue + this.height >= this.gameContainer.clientHeight) {
      this.setXY(30, this.gameContainer.clientHeight - 400);
    } else {
      objects.forEach(obj => {
        if (this.verticallyIntercepts(obj, xValue) && this.bottom <= obj.top && this.bottom + yValue >= obj.top) {
          ret = true;
        }
      });
      return ret;
    }
  }
  collidesLeft(objects, xValue = this.dx, yValue = this.dy) {
    let ret = false;
    if (this.x + this.dx <= 0) {
      return true;
    } else {
      objects.forEach(obj => {
        if (this.horizontallyIntercepts(obj, yValue) && this.left + xValue <= obj.right && this.left >= obj.right) {
          ret = true;
        }
      });
      return ret;
    }
  }
  collidesRight(objects, xValue = this.dx, yValue = this.dy) {
    let ret = false;
    if (this.x + this.dx + this.width >= this.gameContainer.clientWidth) {
      return true;
    } else {
      objects.forEach(obj => {
        if (this.horizontallyIntercepts(obj, yValue) && this.right <= obj.left && this.right + xValue >= obj.left) {
          ret = true;
        }
      });
    }
    return ret;
  }

  //is the object's current position 1px above another object's top?
  isAirborne() {
    return !this.collidesBottom(Block.all, 1, 0);
  }

  isAgainstWall() {
    if (this.collidesLeft(Block.all, -1, 0)) {
      return 1;
    } else if (this.collidesRight(Block.all, 1, 0)) {
      return -1;
    } else {
      return 0;
    }
  }

  //determines if a block is above/beneath/ahead/behind the player
  horizontallyIntercepts(obj, otherValue) {
    return obj.top < this.bottom + otherValue && obj.bottom > this.top + otherValue;
  }
  verticallyIntercepts(obj, otherValue) {
    return obj.left < this.right + otherValue && obj.right > this.left + otherValue;
  }

  //boolean flag is only true if there are no collisions
  //each time a collision is flagged, the relavant dx/dy is brought down/up slightly
  //final dx/dy will move the player to a position exactly against the object
  collisions() {
    let allGood = false;
    while (!allGood) {
      allGood = true;
      if (this.collidesRight(Block.all)) {
        this.dx -= 1;
        allGood = false;
      }
      if (this.collidesLeft(Block.all)) {
        this.dx += 1;
        allGood = false;
      }
      if (this.collidesBottom(Block.all)) {
        this.dy -= 1;
        allGood = false;
      }
      if (this.collidesTop(Block.all)) {
        this.dy += 1;
        allGood = false;
      }
    }
  }

  //Acts, applies slows, then collisions, then sets values
  draw(inputs) {
    if (!this.isAirborne()) {
      this.doubleJump = true;
    }
    if (inputs.jump && !this.jumping) {
      this.processJumpInput();
    }
    if (inputs.dash && !this.dashing) {
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

  render() {
    this.container.style.minHeight = `${this.height}px`;
    this.container.style.minWidth = `${this.width}px`;
    this.container.style.top = `${this.y}px`;
    this.container.style.left = `${this.x}px`;
  }
}
