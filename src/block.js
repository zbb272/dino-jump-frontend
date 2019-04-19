class Block {
  static all = [];
  constructor(obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.origX = this.x;
    this.origY = this.y;

    this.width = obj.width;
    this.height = obj.height;
    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;
    this.color = obj.style;
    this.status = obj.status;
    this.gameContainer = gameContainer;
    this.container = document.createElement("div");
    this.container.classList.add("block");
    this.container.dataset.id = obj.id;
    this.level = Level.all.find(l => l.id === obj.level_id);
    this.visible = true;
    this.id = obj.id;
    this.isMover = false;

    Block.all.push(this);
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;
  }
  getObj() {
    let obj = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      color: this.color
    };
    return obj;
  }
  move(player) {
    const wallClingEdgeCase = player.collidesAll([this]) === this;
    this.setXY(this.x + this.config.dx, this.y + this.config.dy);

    if (player.collidesAll([this]) === this || wallClingEdgeCase) {
      player.isMoved(this.config.dx, this.config.dy);
    }
  }
  remove() {
    this.container.remove();
    this.visible = false;
  }

  draw() {
    this.gameContainer.appendChild(this.container);
    this.visible = true;
  }
  reset() {
    this.setXY(this.origX, this.origY);
    this.config.dx = this.origDX;
    this.config.dy = this.origDY;
    console.log("resetting", this.config.dx, this.config.dy);
  }

  render() {
    if (this.color.startsWith("url")) {
      this.container.style.backgroundImage = this.color;
      this.container.style.backgroundColor = "none";
    } else {
      this.container.style.backgroundColor = this.color;
      this.container.style.backgroundImage = "none";
    }
    this.container.style.minHeight = `${this.height}px`;
    this.container.style.minWidth = `${this.width}px`;
    this.container.style.top = `${this.y}px`;
    this.container.style.left = `${this.x}px`;
  }
  updateMoverObject(color) {
    this.origConfig.color = color;
    // this.color = `mover${JSON.stringify(this.origConfig)}`;
  }
  getMoverObject() {
    return `mover${JSON.stringify(this.origConfig)}`;
  }

  configMovement() {
    this.isMover = true;
    this.config = JSON.parse(this.color.substr(5));
    this.origConfig = { ...this.config };
    for (const key in this.config) {
      if (key !== "color") {
        this.config[key] = parseInt(this.config[key]);
      }
    }
    this.config.maxX = this.config.maxX + this.x;
    this.config.minX = this.config.minX + this.x;
    this.config.maxY = this.config.maxY + this.y;
    this.config.minY = this.config.minY + this.y;
    this.origDX = this.config.dx;
    this.origDY = this.config.dy;

    this.color = this.config.color;
  }
}
