class Game {
  static all = [];
  constructor(id, name, levels) {
    this.id = id;
    this.name = name;
    this.levels = levels;
    Game.all.push(this);
    this.score = 0;
  }
  complete(currentPlayer) {
    this.gameCompleteMenu(currentPlayer);
  }

  restart(currentPlayer) {
    currentPlayer.doubleJumpUnlocked = false;
    currentPlayer.wallJumpUnlocked = false;
    currentPlayer.dashUnlocked = false;
    clearInterval(currentLevel.timer);
    currentLevel.drop();
    currentLevel = this.levels[0];
    this.score = 0;
    clearInterval(currentLevel.timer);
    currentLevel.init();
    currentPlayer.lives = 5;
    currentPlayer.renderLives();
    currentPlayer.setLevel(currentLevel);
  }
  gameCompleteMenu(player) {
    const completion = document.createElement("div");
    completion.classList.add("option-menu");
    const completionTitle = document.createElement("h2");
    completionTitle.innerHTML = `GAME COMPLETE! <br> TOTAL SCORE: ${this.score}`;
    completion.appendChild(completionTitle);

    const completionList = document.createElement("ul");

    const returnItem = document.createElement("li");
    returnItem.innerText = "Restart Game";
    returnItem.addEventListener("click", completionItemEventListener.bind(this));
    completionList.appendChild(returnItem);

    const completionItem = document.createElement("li");
    completionItem.innerText = "Exit to Main Menu";
    completionItem.addEventListener("click", completionItemEventListener.bind(this));
    completionList.appendChild(completionItem);

    completion.appendChild(completionList);
    gameContainer.appendChild(completion);

    function completionItemEventListener(event) {
      console.log(event.target);
      if (event.target.innerText === "Restart Game") {
        completion.remove();
        this.restart(player);
      } else if (event.target.innerText === "Exit to Main Menu") {
        document.location.reload();
      }
    }
  }
}
