class Player {
  constructor(startX, startY, gameContainer) {
    this.x = startX;
    this.y = startY;
    this.dx = 0;
    this.dy = 0;
    this.height = 50;
    this.width = 30;
    this.movingLeft = false;
    this.movingRight = false;
    this.gameContainer = gameContainer;
    this.container = document.createElement("div");
    this.container.classList.add("player");
    this.gameContainer.appendChild(this.container);
    this.render();
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
  }
  haltJump() {
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
      this.slowDown();
    } else {
      if (this.dx > 0) {
        this.dx -= this.dx / 2;
      } else {
        this.dx -= this.dx / 2;
      }
    }
  }

  //can't change direction in the air, but can slow down/speed up
  moveRight() {
    this.movingRight = true;
    if (this.isAirborne() && this.dx < 0) {
      this.slowDown();
    } else if (this.dx < 10) {
      this.dx += 2;
    }
  }
  moveLeft() {
    this.movingLeft = true;
    if (this.isAirborne() && this.dx > 0) {
      this.dx = 0;
    } else if (this.dx > -10) {
      this.dx += -2;
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
        if (this.y + this.dy <= obj.y + obj.height) {
          ret = true;
        }
      });
      return ret;
    }
  }
  //additional paramater here so as to check airborne
  collidesBottom(objects, value = this.dy) {
    let ret = false;
    if (this.y + value + this.height >= this.gameContainer.clientHeight) {
      return true;
    } else {
      objects.forEach(obj => {
        if (this.y + this.height + value >= obj.y) {
          //  debugger;
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
        if (this.x + this.dx <= obj.x + obj.width) {
          debugger;
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
        if (this.x + this.width + this.dx > obj.x) {
          debugger;
          ret = true;
        }
      });
    }
    return ret;
  }
  isAirborne() {
    return !this.collidesBottom(this.getPlatformsBelow(), 1);
  }

  getPlatformsBelow() {
    return Platform.all().filter(plat => {
      return plat.y > this.y + this.height && this.x < plat.x + plat.width && this.x + this.width >= plat.x;
    });
  }
  getPlatformsAbove() {
    return Platform.all().filter(plat => {
      return plat.y + plat.height < this.y && this.x < plat.x + plat.width && this.x + this.width >= plat.x;
    });
  }
  getPlatformsAhead() {
    return Platform.all().filter(plat => {
      return plat.x > this.x + this.width && this.y + this.height > plat.y && this.y < plat.y + plat.height;
    });
  }
  getPlatformsBehind() {
    return Platform.all().filter(plat => {
      return plat.x + plat.width < this.x && this.y + this.height > plat.y && this.y < plat.y + plat.height;
    });
  }

  //currently only checks against windows
  //instead of setting dy/dx to zero, sets them to exactly what they should be in order to reach the collided object's boundary
  collisions() {
    while (this.dx > 0 && this.collidesRight(this.getPlatformsAhead())) {
      this.dx -= 1;
    }
    while (this.dx < 0 && this.collidesLeft(this.getPlatformsBehind())) {
      this.dx += 1;
    }
    while (this.dy > 0 && this.collidesBottom(this.getPlatformsBelow())) {
      this.dy -= 1;
    }
    while (this.dy < 0 && this.collidesTop(this.getPlatformsAbove())) {
      this.dy += 1;
    }
  }

  //applies slows, then collisions, then sets values
  draw(left, right) {
    if (left) {
      this.moveLeft();
    }
    if (right) {
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
