class Block{
  static all = [];
  constructor(x, y, width, height, gameContainer, color = "black", visible = true){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;
    this.color = color;
    this.visible = visible;
    this.gameContainer = gameContainer;
    this.container = document.createElement("div");
    this.container.classList.add("block");
    this.gameContainer.appendChild(this.container);
    this.render();
    Block.all.push(this);
  }

  getObj(){
    let obj = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      color: this.color,
    };
    return obj;
  }

  draw(){
    this.render()
  }

  render(){
    this.container.style.backgroundColor = this.color;
    this.container.style.minHeight = `${this.height}px`;
    this.container.style.minWidth = `${this.width}px`;;
    this.container.style.top = `${this.y}px`;
    this.container.style.left = `${this.x}px`;
  }
}
