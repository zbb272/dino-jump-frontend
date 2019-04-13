class Player {
  constructor(startX, startY, gameContainer) {
    this.x = startX;
    this.y = startY;
    this.dx = 0;
    this.dy = 0;
    this.height = 50;
    this.width = 30;
    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;
    this.movingLeft = false;
    this.movingRight = false;
    this.jumping = false;
    this.gameContainer = gameContainer;
    this.container = document.createElement("div");
    this.container.classList.add("player");
    this.gameContainer.appendChild(this.container);
    this.render();
  }

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
    this.jumping = false;
    if (this.isAirborne()) {
      if (this.dy < 0) {
        this.dy = this.dy / 2;
      }
    }
  }
  jump() {
    if (!this.isAirborne()) {
      this.dy = -20;
      console.log("jump", this.dy);
    }
  }

  //triggered by keyUp --- applies slow() when grounded
  haltLeft() {
    this.movingLeft = false;
  }
  haltRight() {
    this.movingRight = false;
  }

  //gradually fall when airborne
  applyGravity() {
    if (this.isAirborne()) {
      this.dy += 1;
    }
  }

  //will only occur when grounded and not holding a key
  //produces a sliding/skidding if you are moving too fast
  slowDown() {
    if (this.dx < 2 && this.dx > -2) {
      this.dx = 0;
    } else {
      if (this.dx > 0) {
        this.dx -= this.dx / 3;
      } else {
        this.dx -= this.dx / 3;
      }
    }
  }

  //can't change direction in the air, but can slow down/speed up
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

  //collisions are given an optional object target
  //if no target is given, checks against the window
  collidesTop(objects) {
    let ret = false;
    if (this.y + this.dy <= 0) {
      return true;
    } else {
      objects.forEach(obj => {
        if (this.verticallyIntercepts(obj, this.dx) && this.top >= obj.bottom && this.top + this.dy <= obj.bottom) {
          ret = true;
        }
      });
      return ret;
    }
  }
  //additional paramater here so as to check airborne
  collidesBottom(objects, value = this.dy, otherValue = this.dx) {
    let ret = false;
    if (this.y + value + this.height >= this.gameContainer.clientHeight) {
      return true;
    } else {
      objects.forEach(obj => {
        if (this.verticallyIntercepts(obj, otherValue) && this.bottom <= obj.top && this.bottom + value >= obj.top) {
          ret = true;
        }
      });
      return ret;
    }
  }
  collidesLeft(objects) {
    let ret = false;
    if (this.x + this.dx <= 0) {
      return true;
    } else {
      objects.forEach(obj => {
        if (this.horizontallyIntercepts(obj) && this.left + this.dx <= obj.right && this.left >= obj.right) {
          ret = true;
        }
      });
      return ret;
    }
  }
  collidesRight(objects) {
    let ret = false;
    if (this.x + this.dx + this.width >= this.gameContainer.clientWidth) {
      return true;
    } else {
      objects.forEach(obj => {
        if (this.horizontallyIntercepts(obj) && this.right <= obj.left && this.right + this.dx >= obj.left) {
          ret = true;
        }
      });
    }
    return ret;
  }
  isAirborne() {
    return !this.collidesBottom(Platform.all(), 1, 0);
  }
  horizontallyIntercepts(obj) {
    return obj.top < this.bottom + this.dy && obj.bottom > this.top + this.dy;
  }
  verticallyIntercepts(obj, otherValue) {
    return obj.left < this.right + otherValue && obj.right > this.left + otherValue;
  }

  //currently only checks against windows
  //instead of setting dy/dx to zero, sets them to exactly what they should be in order to reach the collided object's boundary
  collisions() {
    let allGood = false;
    while (!allGood) {
      allGood = true;
      if (this.collidesRight(Platform.all())) {
        this.dx -= 1;
        allGood = false;
      }
      if (this.collidesLeft(Platform.all())) {
        this.dx += 1;
        allGood = false;
      }
      if (this.collidesBottom(Platform.all())) {
        this.dy -= 1;
        allGood = false;
      }
      if (this.collidesTop(Platform.all())) {
        this.dy += 1;
        allGood = false;
      }
    }
  }

  //applies slows, then collisions, then sets values
  draw(left, right, jump) {
    if (left) {
      this.moveLeft();
    }
    if (right) {
      this.moveRight();
    }
    if (jump && !this.isAirborne() && !this.jumping) {
      this.jumping = true;
      this.jump();
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
