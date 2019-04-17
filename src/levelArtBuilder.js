function levelArtBuilder(){
  let grid = [];
  let gridMode = false;
  let drawingGoing = false;

  let colorPalette;
  let platformTable;
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

  function createPlatformSelector(){

    jungleBackgroundImageURLS = [
      "url(./assets/blockCenter.png)", "url(./assets/blockLeft.png)", "url(./assets/blockRight.png)", "url(./assets/blockMiddle.png)", "url(./assets/blockCornerLeft.png)", "url(./assets/blockCornerRight.png)",
      "url(./assets/blockLeftInsideCorner.png)", "url(./assets/blockRightInsideCorner.png)", "url(./assets/blockBottom.png)", "url(./assets/blockBottomRight.png)", "url(./assets/blockBottomLeft.png)"
    ];
    platformTable = document.createElement("table");
    let jungleRow = document.createElement("tr");
    jungleBackgroundImageURLS.forEach(imageURL => {
      let jungleSquare = document.createElement("td");
      jungleSquare.style.height = "25px";
      jungleSquare.style.width = "25px";
      jungleSquare.style.borderStyle = "solid";
      jungleSquare.style.borderWidth = "1px";
      jungleSquare.style.backgroundImage = imageURL;
      jungleSquare.addEventListener("click", platformSquareEventListener);
      jungleRow.appendChild(jungleSquare)
    });
    platformTable.appendChild(jungleRow);
    builderControlContainer.appendChild(platformTable);
  }

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

  function platformSquareEventListener(event){
    currentStyle = event.target.style.backgroundImage;
  }

  function doneButtonEventHandler(event) {
    // constructor(x, y, width, height, color = "black", visible = true, gameContainer){
    let block;

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
    if(colorPalette !== undefined){
      colorPalette.remove();
    }
    if(platformTable !== undefined){
      platformTable.remove();
    }
    gridModeButton.remove();
    levelArtBuilderOpen = false;
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
      createPlatformSelector();
    }
    else {

    }
  }

  function saveButtonEventHandler(event){

    let blocksToSend = [];
    currentLevel.blocks.forEach(block => {
      blocksToSend.push({ id: block.id, style: block.color });
    })

    let player = document.querySelector(".player");

    console.log(blocksToSend.length);
    obj = { level: { blocks_attributes: blocksToSend } };
    //fetch request
    let levelUrl = `http://localhost:3000/api/v1/levels/${currentLevel.id}`;
    fetch(levelUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  function squareMouseDownEventHandler(event) {
    drawingGoing = true;
  }

  function squareMouseMoveEventHandler(event) {

    if (drawingGoing) {
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
