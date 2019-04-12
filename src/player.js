class Player{
  constructor(startX, startY, gameContainer){
    this.x = startX;
    this.y = startY;
    this.dx = 0;
    this.dy = 0;
    this.height = 50;
    this.width = 30;
    this.gameContainer = gameContainer;
    this.container = document.createElement("div");
    this.container.classList.add("player");
    this.gameContainer.appendChild(this.container);
    this.render()

  }

  jump(){
    this.dy = 25;
    console.log("jump");
  }

  setXY(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){
    //change values here

    if((this.y - this.dy + this.height) < this.gameContainer.clientHeight && (this.y + this.dy) > 0){
      this.dy -= 2;

      // this.y -= this.dy;
      console.log("y-value of player: " + this.y)
    }
    else{
      this.dy = 0;
    }
    if(this.x > this.gameContainer.clientWidth){
      this.x += this.dx;
      console.log("x-value of player: " + this.x)
    }
    this.y -= this.dy;
    console.log(this.dy)
    this.render()
  }

  render(){
    this.container.style.minHeight = `${this.height}px`;
    this.container.style.minWidth = `${this.width}px`;;
    this.container.style.top = `${this.y}px`;
    this.container.style.left = `${this.x}px`;
  }
}
