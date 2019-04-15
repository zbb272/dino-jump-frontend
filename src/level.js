class Level {
  static all = [];
  constructor(obj, gameContainer) {
    this.gameContainer = gameContainer;
    this.id = obj.id;
    this.name = obj.name;
    this.startPositionX = obj.startPositionX;
    this.startPositionY = obj.startPositionY;
    this.blockSchemas = obj.blocks;
    this.blocks = [];
    this.hazards = [];
    this.goal = [];
    this.coins = [];

    Level.all.push(this);
    console.log(Level.all);
  }

  render() {
    this.blockSchemas.forEach(b => {
      const block = new Block(b, this.gameContainer);
      if (b.status === "goal") {
        this.goal = [block];
      } else if (b.status === "enemy") {
        this.hazards.push(block);
      } else if (b.status === "coins") {
        this.coins.push(block);
      }
      this.block.push(block);
    });
  }

  drop() {
    this.blocks.forEach(block => block.container.remove());
  }
}
