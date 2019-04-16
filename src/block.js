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
    this.container.style.backgroundColor = this.color;
    this.container.style.minHeight = `${this.height}px`;
    this.container.style.minWidth = `${this.width}px`;
    this.container.style.top = `${this.y}px`;
    this.container.style.left = `${this.x}px`;
  }

  renderWithImage(){
    if(this.status === "platform"){
      this.applyPlatformStyle();
    }
  }

  applyPlatformStyle(){
    let blockLeft = false;
    let blockRight = false;
    let blockAbove = false;
    let blockBelow = false;
    let blockRightTopDiagonal = false;
    let blockLeftTopDiagonal = false;

    Block.all.forEach(block => {
      if(block.x === (this.x - 25) && block.y === this.y){
        blockLeft = true;
      }
      if(block.x === (this.x + 25) && block.y === this.y){
        blockRight = true;
      }
      if(block.x === this.x && block.y === (this.y - 25)){
        blockAbove = true;
      }
      if(block.x === this.x && block.y === (this.y + 25)){
        blockBelow = true;
      }
      if(block.x === (this.x + 25) && block.y === (this.y - 25)){
        blockRightTopDiagonal = true;
      }
      if(block.x === (this.x - 25) && block.y === (this.y - 25)){
        blockLeftTopDiagonal = true;
      }
    })
    if(blockLeft && blockRight && blockAbove && blockRightTopDiagonal && !blockLeftTopDiagonal){
      this.container.classList.add("platform-block-right-inside-corner");
    }
    else if(blockLeft && blockRight && blockAbove && !blockRightTopDiagonal && blockLeftTopDiagonal){
      this.container.classList.add("platform-block-left-inside-corner");
    }
    else if(blockLeft && blockRight && blockAbove){
      this.container.classList.add("platform-block-center");
    }
    else if(!blockLeft && blockRight && blockAbove){
      this.container.classList.add("platform-block-left");
    }
    else if(blockLeft && !blockRight && blockAbove){
      this.container.classList.add("platform-block-right");
    }
    else if(blockLeft && blockRight && !blockAbove){
      this.container.classList.add("platform-block-middle");
    }
    else if(!blockLeft && blockRight && !blockAbove){
      this.container.classList.add("platform-block-corner-left");
    }
    else if(blockLeft && !blockRight && !blockAbove){
      this.container.classList.add("platform-block-corner-right");
    }
    this.container.classList.add("platform-block");
  }
}
