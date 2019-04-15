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

    Level.all.push(this);
    console.log(Level.all);
  }
  render() {
    this.blockSchemas.forEach(b => {
      this.blocks.push(new Block(b, this.gameContainer));
    });
  }

  drop() {
    this.blocks.forEach(block => block.container.remove());
  }
}
