const all = [];
class Platform {
  constructor(x, y, width, height, gameContainer, type) {
    this.x = x;
    this.y = gameContainer.clientHeight - y;
    this.width = width;
    this.height = height;
    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;
    this.container = document.createElement("div");
    this.gameContainer = gameContainer;
    this.gameContainer.appendChild(this.container);
    this.container.classList.add(type);
    this.render();
    all.push(this);
  }

  static all() {
    return all;
  }

  render() {
    this.container.style.minHeight = `${this.height}px`;
    this.container.style.minWidth = `${this.width}px`;
    this.container.style.top = `${this.y}px`;
    this.container.style.left = `${this.x}px`;
  }
}
