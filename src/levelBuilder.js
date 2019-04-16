function levelBuilder() {
  let mouseFlag = 0;

  let gridMode = false;
  let dragGoing = false;
  let dragMode = false;

  let platformBlockMode = false;
  let enemyBlockMode = false;
  let coinBlockMode = false;

  let startDragX, startDragY, endDragX, endDragY;
  let dottedRectangle;
  let doneButton;
  let saveButton;
  let gridModeButton;
  let platformBlockButton;
  let enemyBlockButton;
  let coinBlockButton;
  let newInputField;

  let grid;
  let builderControlContainer;
  let newBlocks;

  newBlocks = [];

  // currentLevel = level;
  builderControlContainer = document.getElementById("builder-controls");

  doneButton = document.createElement("button");
  doneButton.innerText = "Done";
  doneButton.style.top = `${gameContainer.clientHeight / 2}px`;
  doneButton.style.left = `${gameContainer.clientWidth + 10}px`;
  doneButton.addEventListener("click", doneButtonEventHandler);
  builderControlContainer.appendChild(doneButton);

  saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.style.top = `${gameContainer.clientHeight / 2}px`;
  saveButton.style.left = `${gameContainer.clientWidth + 35}px`;
  saveButton.addEventListener("click", saveButtonEventHandler);
  builderControlContainer.appendChild(saveButton);

  saveAsNewForm = document.createElement("form");
  newLabel = document.createElement("label");
  newLabel.innerText = "Save as New Level: ";
  saveAsNewForm.appendChild(newLabel);
  newInputField = document.createElement("input");
  newInputField.type = "text";
  saveAsNewForm.appendChild(newInputField);
  newSubmit = document.createElement("input");
  newSubmit.innerText = "Submit";
  newSubmit.type = "submit";
  saveAsNewForm.appendChild(newSubmit);
  saveAsNewForm.addEventListener("submit", saveAsNewEventHandler);
  builderControlContainer.appendChild(saveAsNewForm);

  dottedRectangle = document.createElement("div");
  dottedRectangle.style.position = "absolute";
  gameContainer.appendChild(dottedRectangle);
  document.addEventListener("mousedown", mouseDownEvent);
  document.addEventListener("mousemove", mouseMoveEvent);
  document.addEventListener("mouseup", mouseUpEvent);

  dragModeButton = document.createElement("button");
  dragModeButton.innerText = "Drag Mode";
  dragModeButton.addEventListener("click", dragModeButtonEventHandler);
  builderControlContainer.appendChild(dragModeButton);

  gridModeButton = document.createElement("button");
  gridModeButton.innerText = "Grid Mode";
  gridModeButton.addEventListener("click", gridModeButtonEventHandler);
  builderControlContainer.appendChild(gridModeButton);

  function mouseDownEvent(event) {
    console.log("mouseDown");
    if (!gridMode && dragMode) {
      mouseFlag = 0;
      if (event.target !== doneButton && event.target !== saveButton) {
        startDragX = event.clientX - event.target.offsetLeft;
        startDragY = event.clientY - event.target.offsetTop;

        if (dragGoing) {
          dragGoing = false;
        } else {
          dragGoing = true;
          dottedRectangle.style.minHeight = `1px`;
          dottedRectangle.style.minWidth = `1px`;
          dottedRectangle.style.top = `${startDragY}px`;
          dottedRectangle.style.left = `${startDragX}px`;
          dottedRectangle.style.outlineStyle = "dotted";
          dottedRectangle.style.zIndex = 4;
          dottedRectangle.style.backgroundColor = "";
        }

        console.log("X: " + startDragX + " Y: " + startDragY);
      }
    }
  }

  function mouseMoveEvent(event) {
    if (dragGoing && dragMode) {
      console.log("mouse move");
      if (event.pageX > startDragX) {
        dottedRectangle.style.minWidth = `${event.pageX - startDragX}px`;
      } else {
        dottedRectangle.style.left = `${event.pageX}px`;
        dottedRectangle.style.minWidth = `${startDragX - event.pageX}px`;
      }
      if (event.pageY > startDragY) {
        dottedRectangle.style.minHeight = `${event.pageY - startDragY}px`;
      } else {
        dottedRectangle.style.top = `${event.pageY}px`;
        dottedRectangle.style.minHeight = `${startDragY - event.pageY}px`;
      }
      mouseFlag = 1;
    } else {
      mouseFlag = 0;
    }
  }

  function mouseUpEvent(event) {
    console.log("mouseUp");
    if (dragMode) {
      if (mouseFlag === 0) {
        console.log("click");
      } else if (mouseFlag === 1) {
        endDragX = event.pageX;
        endDragY = event.pageY;
        dottedRectangle.style.backgroundColor = "black";
        dottedRectangle.style.outlineStyle = "none";

        console.log("X: " + endDragX + " Y: " + endDragY);
        console.log("drag");
        mouseFlag = 0;
        dragGoing = false;
      }
    }
  }

  function doneButtonEventHandler(event) {
    // constructor(x, y, width, height, color = "black", visible = true, gameContainer){
    let block;
    if (endDragX > startDragX) {
      if (endDragY > startDragY) {
        obj = {
          x: startDragX,
          y: startDragY,
          width: parseInt(dottedRectangle.style.minWidth),
          height: parseInt(dottedRectangle.style.minHeight),
          gameContainer: gameContainer,
          color: "black",
          status: "platform"
        };
        block = new Block(obj);
      } else {
        obj = {
          x: startDragX,
          y: endDragY,
          width: parseInt(dottedRectangle.style.minWidth),
          height: parseInt(dottedRectangle.style.minHeight),
          gameContainer: gameContainer,
          color: "black",
          status: "platform"
        };
        block = new Block(obj);
      }
    } else {
      if (endDragY > startDragY) {
        obj = {
          x: endDragX,
          y: startDragY,
          width: parseInt(dottedRectangle.style.minWidth),
          height: parseInt(dottedRectangle.style.minHeight),
          gameContainer: gameContainer,
          color: "black",
          status: "platform"
        };
        block = new Block(obj);
      } else {
        obj = {
          x: endDragX,
          y: endDragY,
          width: parseInt(dottedRectangle.style.minWidth),
          height: parseInt(dottedRectangle.style.minHeight),
          gameContainer: gameContainer,
          color: "black",
          status: "platform"
        };
        block = new Block(obj);
      }
    }
    console.log(newBlocks);
    newBlocks.forEach(square => {
      obj = {
        x: parseInt(square.style.left.replace(/\D/gm, "/")),
        y: parseInt(square.style.top.replace(/\D/gm, "/")),
        width: 25,
        height: 25,
        style: square.style.backgroundColor,
        status: square.dataset.status
      };
      let b = new Block(obj);
      console.log(Level.all);
      currentLevel.add(b);
      console.log(b);
    });

    levelBuilderOpen = false;

    doneButton.remove();
    saveButton.remove();
    dragModeButton.remove();
    dottedRectangle.remove();
    for (let y = 0; y < 28; y++) {
      for (let x = 0; x < 48; x++) {
        grid[y][x].remove();
      }
    }
    gridModeButton.remove();
    platformBlockButton.remove();
    enemyBlockButton.remove();
    coinBlockButton.remove();

    gameContainer.removeEventListener("mousedown", mouseDownEvent);
    gameContainer.removeEventListener("mousemove", mouseMoveEvent);
    gameContainer.removeEventListener("mouseup", mouseUpEvent);
  }

  function dragModeButtonEventHandler(event) {
    dragMode = !dragMode;
  }

  function gridModeButtonEventHandler(event) {
    gridMode = !gridMode;
    grid = [];
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
          square.addEventListener("click", squareClickEventHandler);
          gameContainer.appendChild(square);
          grid[y].push(square);
        }
      }

      platformBlockButton = document.createElement("button");
      platformBlockButton.innerText = "Platform Block";
      platformBlockButton.addEventListener("click", platformBlockEventHandler);
      builderControlContainer.appendChild(platformBlockButton);
      enemyBlockButton = document.createElement("button");
      enemyBlockButton.innerText = "Enemy Block";
      enemyBlockButton.addEventListener("click", enemyBlockEventHandler);
      builderControlContainer.appendChild(enemyBlockButton);
      coinBlockButton = document.createElement("button");
      coinBlockButton.innerText = "Coin Block";
      coinBlockButton.addEventListener("click", coinBlockEventHandler);
      builderControlContainer.appendChild(coinBlockButton);
    }
  }

  function platformBlockEventHandler(event) {
    platformBlockMode = true;
    enemyBlockMode = false;
    coinBlockMode = false;
  }

  function enemyBlockEventHandler(event) {
    platformBlockMode = false;
    enemyBlockMode = true;
    coinBlockMode = false;
  }

  function coinBlockEventHandler(event) {
    platformBlockMode = false;
    enemyBlockMode = false;
    coinBlockMode = true;
  }

  function squareClickEventHandler(event) {
    console.log("square clicked");
    let status = "platform";
    let square = event.target;

    newBlocks;
    if (platformBlockMode) {
      if (square.dataset.status === "none") {
        square.dataset.status = "platform";
        square.style.backgroundColor = "black";
        newBlocks.push(square);
      } else if (square.dataset.status === "platform") {
        square.dataset.status = "none";
        square.style.backgroundColor = "none";
        newBlocks.splice(newBlocks.indexOf(square), 1);
      }
    } else if (enemyBlockMode) {
      if (square.dataset.status === "none") {
        square.dataset.status = "enemy";
        square.style.backgroundColor = "red";
        newBlocks.push(square);
      } else if (square.dataset.status === "enemy") {
        square.dataset.status = "none";
        square.style.backgroundColor = "none";
        newBlocks.splice(newBlocks.indexOf(square), 1);
      }
    } else if (coinBlockMode) {
      if (square.dataset.status === "none") {
        square.dataset.status = "coin";
        square.style.backgroundColor = "green";
        newBlocks.push(square);
      } else if (square.dataset.status === "coin") {
        square.dataset.status = "none";
        square.style.backgroundColor = "none";
        newBlocks.splice(newBlocks.indexOf(square), 1);
      }
    }
  }

  function saveAsNewEventHandler(event) {
    event.preventDefault();
    let player = document.querySelector(".player");
    currentLevel.blocks.forEach(block => {
      newBlocks.push(block);
    });
    obj = { name: newInputField.value, startPositionX: player.style.left, startPositionY: player.style.right, blocks: newBlocks };
    let levelUrl = `http://localhost:3000/api/v1/levels/`;
    console.log(JSON.stringify(obj));
    fetch(levelUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(res => res.json());
  }

  function saveButtonEventHandler(event) {
    console.log("save button hit");
    let blockArray = [];
    Block.all.forEach(block => {
      blockArray.push(block.getObj());
      console.log(block.getObj());
    });
    //fetch request
    let levelUrl = `http://localhost:3000/levels/${currentLevel.id}`;
    fetch(levelUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ blockArray })
    }).then(res => response.json());
  }
}
