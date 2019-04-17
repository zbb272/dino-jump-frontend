function levelArtBuilder(){
  let grid = [];
  let gridMode = false;
  let drawingGoing = false;

  let colorPalette;
  let currentStyle = "none"
  let builderControlContainer = document.getElementById("builder-controls");

  let doneButton = document.createElement("button");
  doneButton.innerText = "Done";
  doneButton.style.top = `${gameContainer.clientHeight / 2}px`;
  doneButton.style.left = `${gameContainer.clientWidth + 10}px`;
  doneButton.addEventListener("click", doneButtonEventHandler);
  builderControlContainer.appendChild(doneButton);

  let saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.style.top = `${gameContainer.clientHeight / 2}px`;
  saveButton.style.left = `${gameContainer.clientWidth + 35}px`;
  saveButton.addEventListener("click", saveButtonEventHandler);
  builderControlContainer.appendChild(saveButton);

  let gridModeButton = document.createElement("button");
  gridModeButton.innerText = "Grid Mode";
  gridModeButton.addEventListener("click", gridModeButtonEventHandler);
  builderControlContainer.appendChild(gridModeButton);


  function createColorPalette(){
    // let colorPalette = document.createElement("div");
    colorPalette = document.createElement("table");
    let r = 0;
    let g = 0;
    let b = 255;
    let rUpRow = document.createElement("tr");
    while(r < 255){
      let colorSquare = document.createElement("td");
      colorSquare.style.backgroundColor = `rgb(${r},${g},${b})`;
      colorSquare.style.height = "10px";
      colorSquare.style.width = "10px";
      colorSquare.style.maxWidth = "10px";
      colorSquare.style.borderStyle = "solid";
      colorSquare.style.borderWidth = "1px";
      colorSquare.addEventListener("click", colorSquareEventListener);
      rUpRow.appendChild(colorSquare)
      r += 5;
    }
    colorPalette.appendChild(rUpRow);
    let bDownRow = document.createElement("tr");
    while(b > 0){
      let colorSquare = document.createElement("td");
      colorSquare.style.backgroundColor = `rgb(${r},${g},${b})`;
      colorSquare.style.height = "10px";
      colorSquare.style.width = "10px";
      colorSquare.style.maxWidth = "10px";
      colorSquare.style.borderStyle = "solid";
      colorSquare.style.borderWidth = "1px";
      colorSquare.addEventListener("click", colorSquareEventListener);
      bDownRow.appendChild(colorSquare)
      b -= 5;
    }
    colorPalette.appendChild(bDownRow);
    let gUpRow = document.createElement("tr");
    while(g < 255){
      let colorSquare = document.createElement("td");
      colorSquare.style.backgroundColor = `rgb(${r},${g},${b})`;
      colorSquare.style.height = "10px";
      colorSquare.style.width = "10px";
      colorSquare.style.maxWidth = "10px";
      colorSquare.style.borderStyle = "solid";
      colorSquare.style.borderWidth = "1px";
      colorSquare.addEventListener("click", colorSquareEventListener);
      gUpRow.appendChild(colorSquare)
      g += 5;
    }
    colorPalette.appendChild(gUpRow);
    let rDownRow = document.createElement("tr");
    while(r > 0){
      let colorSquare = document.createElement("td");
      colorSquare.style.backgroundColor = `rgb(${r},${g},${b})`;
      colorSquare.style.height = "10px";
      colorSquare.style.width = "10px";
      colorSquare.style.maxWidth = "10px";
      colorSquare.style.borderStyle = "solid";
      colorSquare.style.borderWidth = "1px";
      colorSquare.addEventListener("click", colorSquareEventListener);
      rDownRow.appendChild(colorSquare)
      r -= 5;
    }
    colorPalette.appendChild(rDownRow);
    let bUpRow = document.createElement("tr");
    while(b < 255){
      let colorSquare = document.createElement("td");
      colorSquare.style.backgroundColor = `rgb(${r},${g},${b})`;
      colorSquare.style.height = "10px";
      colorSquare.style.width = "10px";
      colorSquare.style.maxWidth = "10px";
      colorSquare.style.borderStyle = "solid";
      colorSquare.style.borderWidth = "1px";
      colorSquare.addEventListener("click", colorSquareEventListener);
      bUpRow.appendChild(colorSquare)
      b += 5;
    }
    colorPalette.appendChild(bUpRow);
    let gDownRow = document.createElement("tr");
    while(g > 0){
      let colorSquare = document.createElement("td");
      colorSquare.style.backgroundColor = `rgb(${r},${g},${b})`;
      colorSquare.style.height = "10px";
      colorSquare.style.width = "10px";
      colorSquare.style.maxWidth = "10px";
      colorSquare.style.borderStyle = "solid";
      colorSquare.style.borderWidth = "1px";
      colorSquare.addEventListener("click", colorSquareEventListener);
      gDownRow.appendChild(colorSquare)
      g -= 5;
    }
    colorPalette.appendChild(gDownRow);
    let bwRow = document.createElement("tr");
    r = 255;
    b = 255;
    g = 255;
    while(g > 0){
      let colorSquare = document.createElement("td");
      colorSquare.style.backgroundColor = `rgb(${r},${g},${b})`;
      colorSquare.style.height = "10px";
      colorSquare.style.width = "10px";
      colorSquare.style.maxWidth = "10px";
      colorSquare.style.borderStyle = "solid";
      colorSquare.style.borderWidth = "1px";
      colorSquare.addEventListener("click", colorSquareEventListener);
      bwRow.appendChild(colorSquare)
      r -= 5;
      b -= 5;
      g -= 5;
    }
    colorPalette.appendChild(bwRow);
    builderControlContainer.appendChild(colorPalette);
  }

  function colorSquareEventListener(event){
    currentStyle = event.target.style.backgroundColor;
  }

  function doneButtonEventHandler(event) {
    // constructor(x, y, width, height, color = "black", visible = true, gameContainer){
    let block;

    currentLevel.blocks.forEach(block => block.renderWithImage());

    levelBuilderOpen = false;

    doneButton.remove();
    saveButton.remove();

    if (grid.length !== 0) {
      for (let y = 0; y < 28; y++) {
        for (let x = 0; x < 48; x++) {
          grid[y][x].remove();
        }
      }
    }

    if (gridMode) {
      //remove grid mode stuff
    }
    colorPalette.remove();
    gridModeButton.remove();
  }

  function gridModeButtonEventHandler(event) {
    gridMode = !gridMode;
    if (gridMode) {
      console.log("grid mode enabled");
      //create grid 28 rows x 48 columns
      for (let y = 0; y < 28; y++) {
        grid[y] = [];
        for (let x = 0; x < 48; x++) {
          let square = document.createElement("div");
          square.style.minHeight = "25px";
          square.style.minWidth = "25px";
          square.style.top = `${y * 25}px`;
          square.style.left = `${x * 25}px`;
          square.classList.add("grid-square");
          square.style.borderStyle = "solid";
          square.style.borderWidth = "1px";
          square.dataset.status = "none";

          if (y === 0 && x % 4 === 0) {
            square.innerText = `${x / 4}`;
          } else if (x === 0 && y % 4 === 0) {
            square.innerText = `${y / 4}`;
          }
          // square.addEventListener("click", squareClickEventHandler);
          square.addEventListener("mousedown", squareMouseDownEventHandler);
          square.addEventListener("mousemove", squareMouseMoveEventHandler);
          square.addEventListener("mouseup", squareMouseUpEventHandler);
          gameContainer.appendChild(square);
          grid[y].push(square);
        }
      }
      createColorPalette();
    }
    else {

    }
  }

  function saveButtonEventHandler(event){

  }

  function squareMouseDownEventHandler(event) {
    drawingGoing = true;
  }

  function squareMouseMoveEventHandler(event) {

    if (drawingGoing) {

      let square = event.target;
      // if (eraserBlockMode) {
      //   if (square.style.backgroundColor !== "none") {
      //     square.dataset.status = "none";
      //     square.style.backgroundColor = "transparent";
      //     newBlocks.splice(newBlocks.indexOf(square), 1);
      //   }
      // }
      if(currentStyle !== "none"){
        Block.all.forEach(block => {
          if(block.style !== currentStyle){
            if(block.x === parseInt(event.target.style.left.replace(/\D/gm, "/")) && block.y === parseInt(event.target.style.top.replace(/\D/gm, "/"))){
              block.color = currentStyle;
              block.render();
            }
          }
        })
      }

    }
  }

  function squareMouseUpEventHandler(event) {
    drawingGoing = false;
  }
}
