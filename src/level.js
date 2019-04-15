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
      this.add(block);
    });
  }

  add(block) {
    if (block.status === "goal") {
      this.goal.push(block);
    } else if (block.status === "enemy") {
      this.hazards.push(block);
    } else if (block.status === "coin") {
      this.coins.push(block);
    }
    this.blocks.push(block);
  }

  drop() {
    this.blocks.forEach(block => block.container.remove());
  }
}
