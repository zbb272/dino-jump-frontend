class Block {
  static all = [];
  constructor(obj) {
    this.x = obj.x;
    this.y = obj.y;
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
    this.gameContainer.appendChild(this.container);
    this.level = Level.all.find(l => l.id === obj.level_id);
    this.visible = true;
    this.id = obj.id;
    this.render();
    Block.all.push(this);
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
  remove() {
    this.container.remove();
    this.visible = false;
  }

  draw() {
    this.render();
  }

  render() { 
    if(this.color.startsWith("url")){
      this.container.style.backgroundImage = this.color;
      this.container.style.backgroundColor = "none";
    }
    else{
      this.container.style.backgroundColor = this.color;
      this.container.style.backgroundImage = "none";
    }
    this.container.style.minHeight = `${this.height}px`;
    this.container.style.minWidth = `${this.width}px`;
    this.container.style.top = `${this.y}px`;
    this.container.style.left = `${this.x}px`;
  }

}
