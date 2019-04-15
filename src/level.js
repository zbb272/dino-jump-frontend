class Level{
  static all = [];
  constructor(obj){
    this.id = obj.id;
    this.name = obj.name;
    this.startPositionX = obj.startPositionX;
    this.startPositionY = obj.startPositionY;
    this.blocks = obj.arrayOfBlocks;
    Level.all.push(this);
  }
}
