class Game{
  static all = [];
  constructor(id, name, levels){
    this.id = id;
    this.name = name;
    this.levels = levels;
    Game.all.push(this);
  }
}
