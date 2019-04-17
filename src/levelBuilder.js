function levelBuilder() {
  let mouseFlag = 0;

  let gridMode = false;

  let drawingGoing = false;

  let platformBlockMode = false;
  let enemyBlockMode = false;
  let coinBlockMode = false;
  let goalBlockMode = false;
  let eraserBlockMode = false;

  let platformBlockButton;
  let enemyBlockButton;
  let coinBlockButton;
  let goalBlockButton;
  let eraserBlockButton;
  let powerBlockButton;
  let powerBlockSelector;

  let grid = [];
  let newBlocks = [];

  // currentLevel = level;
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
  let deleteLevelButton = document.createElement("button");
  deleteLevelButton.innerText = "Delete Level";
  deleteLevelButton.addEventListener("click", deleteButtonEventHandler);
  builderControlContainer.appendChild(deleteLevelButton);

  let saveAsNewForm = document.createElement("form");
  newLabel = document.createElement("label");
  newLabel.innerText = "Save as New Level: ";
  saveAsNewForm.appendChild(newLabel);
  let newInputField = document.createElement("input");
  newInputField.type = "text";
  saveAsNewForm.appendChild(newInputField);
  newSubmit = document.createElement("input");
  newSubmit.innerText = "Submit";
  newSubmit.type = "submit";
  saveAsNewForm.appendChild(newSubmit);
  saveAsNewForm.addEventListener("submit", saveAsNewEventHandler);
  builderControlContainer.appendChild(saveAsNewForm);

  //create custom block form
  customBlockForm = document.createElement("form");
  customBlockForm.innerText = "Create Block: ";

  blockXLabel = document.createElement("label");
  blockXLabel.innerText = "X: ";
  blockXInput = document.createElement("input");
  blockXInput.type = "text";
  customBlockForm.appendChild(blockXLabel);
  customBlockForm.appendChild(blockXInput);

  blockYLabel = document.createElement("label");
  blockYLabel.innerText = "Y: ";
  blockYInput = document.createElement("input");
  blockYInput.type = "text";
  customBlockForm.appendChild(blockYLabel);
  customBlockForm.appendChild(blockYInput);

  blockWidthLabel = document.createElement("label");
  blockWidthLabel.innerText = "Width: ";
  blockWidthInput = document.createElement("input");
  blockWidthInput.type = "text";
  customBlockForm.appendChild(blockWidthLabel);
  customBlockForm.appendChild(blockWidthInput);

  blockHeightLabel = document.createElement("label");
  blockHeightLabel.innerText = "Height: ";
  blockHeightInput = document.createElement("input");
  blockHeightInput.type = "text";
  customBlockForm.appendChild(blockHeightLabel);
  customBlockForm.appendChild(blockHeightInput);

  blockStatusLabel = document.createElement("label");
  blockStatusLabel.innerText = "Status: ";
  blockSelect = document.createElement("select");
  platformOption = document.createElement("option");
  platformOption.value = "platform";
  platformOption.innerText = "Platform";
  blockSelect.appendChild(platformOption);
  enemyOption = document.createElement("option");
  enemyOption.value = "enemy";
  enemyOption.innerText = "Enemy";
  blockSelect.appendChild(enemyOption);
  coinOption = document.createElement("option");
  coinOption.value = "coin";
  coinOption.innerText = "Coin";
  blockSelect.appendChild(coinOption);
  goalOption = document.createElement("option");
  goalOption.value = "goal";
  goalOption.innerText = "Goal";
  blockSelect.appendChild(goalOption);

  customBlockForm.appendChild(blockStatusLabel);
  customBlockForm.appendChild(blockSelect);

  submitInput = document.createElement("input");
  submitInput.type = "submit";
  customBlockForm.appendChild(submitInput);
  customBlockForm.addEventListener("submit", customBlockFormEventHandler);
  builderControlContainer.appendChild(customBlockForm);

  let gridModeButton = document.createElement("button");
  gridModeButton.innerText = "Grid Mode";
  gridModeButton.addEventListener("click", gridModeButtonEventHandler);
  builderControlContainer.appendChild(gridModeButton);

  function doneButtonEventHandler(event) {
    // constructor(x, y, width, height, color = "black", visible = true, gameContainer){
    let block;
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
      currentLevel.add(b);
    });

    levelBuilderOpen = false;

    doneButton.remove();
    saveButton.remove();

    saveAsNewForm.remove();
    customBlockForm.remove();
    console.log(grid.length);
    if (grid.length !== 0) {
      for (let y = 0; y < 28; y++) {
        for (let x = 0; x < 48; x++) {
          grid[y][x].remove();
        }
      }
    }

    if (gridMode) {
      platformBlockButton.remove();
      enemyBlockButton.remove();
      coinBlockButton.remove();
      goalBlockButton.remove();
      eraserBlockButton.remove();
      powerBlockButton.remove();
      powerBlockSelector.remove();
    }
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
      goalBlockButton = document.createElement("button");
      goalBlockButton.innerText = "Goal Block";
      goalBlockButton.addEventListener("click", goalBlockEventHandler);
      builderControlContainer.appendChild(goalBlockButton);
      powerBlockButton = document.createElement("button");

      powerBlockButton.innerText = "Power Block";
      powerBlockButton.addEventListener("click", powerBlockEventHandler);
      builderControlContainer.appendChild(powerBlockButton);
      powerBlockSelector = document.createElement("select");
      powerDoubleJump = document.createElement("option");
      powerDoubleJump.value = "doubleJump";
      powerDoubleJump.innerText = "Double Jump";
      powerBlockSelector.appendChild(powerDoubleJump);
      powerDash = document.createElement("option");
      powerDash.value = "dash";
      powerDash.innerText = "Dash";
      powerBlockSelector.appendChild(powerDash);
      powerWallJump = document.createElement("option");
      powerWallJump.value = "wallJump";
      powerWallJump.innerText = "Wall Jump";
      powerBlockSelector.appendChild(powerWallJump);
      builderControlContainer.appendChild(powerBlockSelector);

      eraserBlockButton = document.createElement("button");
      eraserBlockButton.innerText = "Eraser";
      eraserBlockButton.addEventListener("click", eraserBlockEventHandler);
      builderControlContainer.appendChild(eraserBlockButton);


    } else {
      platformBlockButton.remove();
      enemyBlockButton.remove();
      coinBlockButton.remove();
      goalBlockButton.remove();
      eraserBlockButton.remove();
      powerBlockButton.remove();
      powerBlockSelector.remove();
      platformBlockMode = false;
      enemyBlockMode = false;
      coinBlockMode = false;
      goalBlockMode = false;
      eraserBlockMode = false;
      powerBlockMode = false;
    }
  }

  function platformBlockEventHandler(event) {
    platformBlockMode = true;
    enemyBlockMode = false;
    coinBlockMode = false;
    goalBlockMode = false;
    eraserBlockMode = false;
    powerBlockMode = false;
  }

  function enemyBlockEventHandler(event) {
    platformBlockMode = false;
    enemyBlockMode = true;
    coinBlockMode = false;
    goalBlockMode = false;
    eraserBlockMode = false;
    powerBlockMode = false;
  }

  function coinBlockEventHandler(event) {
    platformBlockMode = false;
    enemyBlockMode = false;
    coinBlockMode = true;
    goalBlockMode = false;
    eraserBlockMode = false;
    powerBlockMode = false;
  }

  function goalBlockEventHandler(event) {
    platformBlockMode = false;
    enemyBlockMode = false;
    coinBlockMode = false;
    goalBlockMode = true;
    eraserBlockMode = false;
    powerBlockMode = false;
  }

  function eraserBlockEventHandler(event) {
    platformBlockMode = false;
    enemyBlockMode = false;
    coinBlockMode = false;
    goalBlockMode = false;
    eraserBlockMode = true;
    powerBlockMode = false;
  }

  function powerBlockEventHandler(event){
    platformBlockMode = false;
    enemyBlockMode = false;
    coinBlockMode = false;
    goalBlockMode = false;
    eraserBlockMode = false;
    powerBlockMode = true;
  }

  function squareMouseDownEventHandler(event) {
    drawingGoing = true;
  }

  function squareMouseMoveEventHandler(event) {
    if (drawingGoing) {
      let square = event.target;

      newBlocks;
      if (platformBlockMode) {
        if (square.dataset.status === "none") {
          square.dataset.status = "platform";
          square.style.backgroundColor = "black";
          newBlocks.push(square);
        }
      } else if (enemyBlockMode) {
        if (square.dataset.status === "none") {
          square.dataset.status = "enemy";
          square.style.backgroundColor = "red";
          newBlocks.push(square);
        }
      } else if (coinBlockMode) {
        if (square.dataset.status === "none") {
          square.dataset.status = "coin";
          square.style.backgroundColor = "green";
          newBlocks.push(square);
        }
      } else if (goalBlockMode) {
        if (square.dataset.status === "none") {
          square.dataset.status = "goal";
          square.style.backgroundColor = "gold";
          newBlocks.push(square);
        }
      } else if (powerBlockMode) {
        console.log(powerBlockSelector.value)
        if (square.dataset.status === "none") {
          square.dataset.status = powerBlockSelector.value;
          square.style.backgroundColor = "blue";
          newBlocks.push(square);
        }
      } else if (eraserBlockMode) {
        if (square.dataset.status !== "none") {
          square.dataset.status = "none";
          square.style.backgroundColor = "transparent";
          newBlocks.splice(newBlocks.indexOf(square), 1);
        }
      }
    }
  }

  function squareMouseUpEventHandler(event) {
    drawingGoing = false;
  }

  function saveAsNewEventHandler(event) {
    event.preventDefault();
    let player = document.querySelector(".player");
    currentLevel.blocks.forEach(block => {
      newBlocks.push(block);
    });
    blocksToSend = [];
    newBlocks.forEach(block => {
      blocksToSend.push({ x: block.x, y: block.y, width: block.width, height: block.height, style: block.color, status: block.status });
    });
    obj = {
      level: {
        name: newInputField.value,
        startPositionX: parseInt(player.style.left.replace(/\D/gm, "/")),
        startPositionY: parseInt(player.style.top.replace(/\D/gm, "/")),
        blocks_attributes: blocksToSend
      }
    };
    let levelUrl = `http://localhost:3000/api/v1/levels/`;
    console.log(JSON.stringify(obj));
    fetch(levelUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  function saveButtonEventHandler(event) {
    let player = document.querySelector(".player");
    currentLevel.blocks.forEach(block => {
      newBlocks.push(block);
    });
    blocksToSend = [];
    newBlocks.forEach(block => {
      if (!block.id) {
        blocksToSend.push({ x: block.x, y: block.y, width: block.width, height: block.height, style: block.color, status: block.status });
      }
    });
    console.log(blocksToSend.length);
    obj = { level: { startPositionX: parseInt(player.style.left.replace(/\D/gm, "/")), startPositionY: parseInt(player.style.top.replace(/\D/gm, "/")), blocks_attributes: blocksToSend } };
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

  function customBlockFormEventHandler(event) {
    event.preventDefault();
    let xValue = event.target.childNodes[2].value;
    let yValue = event.target.childNodes[4].value;
    let wValue = event.target.childNodes[6].value;
    let hValue = event.target.childNodes[8].value;
    let sValue = event.target.childNodes[10].value;
    let colorValue;
    sValue === "platform" ? (colorValue = "black") : "";
    sValue === "enemy" ? (colorValue = "red") : "";
    sValue === "coin" ? (colorValue = "green") : "";
    sValue === "goal" ? (colorValue = "gold") : "";
    console.log(colorValue);
    if (xValue !== "" && yValue !== "" && wValue !== "" && hValue !== "") {
      obj = {
        x: parseInt(xValue),
        y: parseInt(yValue),
        width: parseInt(wValue),
        height: parseInt(hValue),
        style: colorValue,
        status: sValue
      };
      let b = new Block(obj);
      currentLevel.add(b);
    }
  }
}

function deleteButtonEventHandler(event){
  if(window.confirm("Are you sure you want to delete the level? This is not reversible.")){
    let levelUrl = `http://localhost:3000/api/v1/levels/${currentLevel.id}`;
    fetch(levelUrl, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => console.log(data));
    document.location.reload();
  }
}

//OBSOLETE FUNCTIONS!!!!! WARNING!!! HERE THERE BE MONSTERS

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
      square.style.backgroundColor = "transparent";
      newBlocks.splice(newBlocks.indexOf(square), 1);
    }
  } else if (enemyBlockMode) {
    if (square.dataset.status === "none") {
      square.dataset.status = "enemy";
      square.style.backgroundColor = "red";
      newBlocks.push(square);
    } else if (square.dataset.status === "enemy") {
      square.dataset.status = "none";
      square.style.backgroundColor = "transparent";
      newBlocks.splice(newBlocks.indexOf(square), 1);
    }
  } else if (coinBlockMode) {
    if (square.dataset.status === "none") {
      square.dataset.status = "coin";
      square.style.backgroundColor = "green";
      newBlocks.push(square);
    } else if (square.dataset.status === "coin") {
      square.dataset.status = "none";
      square.style.backgroundColor = "transparent";
      newBlocks.splice(newBlocks.indexOf(square), 1);
    }
  } else if (goalBlockMode) {
    if (square.dataset.status === "none") {
      square.dataset.status = "goal";
      square.style.backgroundColor = "gold";
      newBlocks.push(square);
    } else if (square.dataset.status === "goal") {
      square.dataset.status = "none";
      square.style.backgroundColor = "transparent";
      newBlocks.splice(newBlocks.indexOf(square), 1);
    }
  } else if (eraserBlockMode) {
    if (square.dataset.status !== "none") {
      square.dataset.status = "none";
      square.style.backgroundColor = "transparent";
      newBlocks.splice(newBlocks.indexOf(square), 1);
    }
  }
}

function dragAndDropStuff() {
  let dragGoing = false;
  let dragMode = false;
  let startDragX, startDragY, endDragX, endDragY;
  let dottedRectangle;

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

  function dragModeButtonEventHandler(event) {
    dragMode = !dragMode;
  }

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
  // dragModeButton.remove();
  // dottedRectangle.remove();
  // gameContainer.removeEventListener("mousedown", mouseDownEvent);
  // gameContainer.removeEventListener("mousemove", mouseMoveEvent);
  // gameContainer.removeEventListener("mouseup", mouseUpEvent);
}
