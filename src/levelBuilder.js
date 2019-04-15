
let mouseFlag = 0;
let dragGoing = false;
let startDragX, startDragY, endDragX, endDragY;
let dottedRectangle;
let doneButton;
let saveButton;
let currentLevel;

function levelBuilder(level){
  currentLevel = level;
  doneButton = document.createElement("button");
  doneButton.innerText = "Done";
  doneButton.style.top = `${gameContainer.clientHeight / 2}px`;
  doneButton.style.left = `${gameContainer.clientWidth + 10}px`;
  doneButton.addEventListener("click", doneButtonEventHandler);
  gameContainer.appendChild(doneButton);

  saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.style.top = `${gameContainer.clientHeight / 2}px`;
  saveButton.style.left = `${gameContainer.clientWidth + 35}px`;
  saveButton.addEventListener("click", saveButtonEventHandler);
  gameContainer.appendChild(saveButton);

  dottedRectangle = document.createElement("div");
  dottedRectangle.style.position = "absolute";
  gameContainer.appendChild(dottedRectangle);
  gameContainer.addEventListener("mousedown", mouseDownEvent);
  gameContainer.addEventListener("mousemove", mouseMoveEvent);
  gameContainer.addEventListener("mouseup", mouseUpEvent);
}

function mouseDownEvent(event){
  console.log("mouseDown");
  mouseFlag = 0;
  if(event.target !== doneButton && event.target !== saveButton){
    startDragX = event.clientX - event.target.offsetLeft;
    startDragY = event.clientY - event.target.offsetTop;

    if(dragGoing){
      dragGoing = false;
    }
    else{
      dragGoing = true;
      dottedRectangle.style.minHeight = `1px`;
      dottedRectangle.style.minWidth = `1px`;
      dottedRectangle.style.top = `${startDragY}px`;
      dottedRectangle.style.left = `${startDragX}px`;
      dottedRectangle.style.outlineStyle = "dotted";
      dottedRectangle.style.zIndex = 4;
      dottedRectangle.style.backgroundColor = "";
    }

    console.log("X: "+startDragX+" Y: "+startDragY);
  }
}

function mouseMoveEvent(event){
  if(dragGoing){
    console.log("mouse move")
    if(event.pageX > startDragX){
      dottedRectangle.style.minWidth = `${event.pageX - startDragX}px`;
    }
    else{
      dottedRectangle.style.left = `${event.pageX}px`;
      dottedRectangle.style.minWidth = `${startDragX - event.pageX}px`;
    }
    if(event.pageY > startDragY){
      dottedRectangle.style.minHeight = `${event.pageY - startDragY}px`;
    }
    else{
      dottedRectangle.style.top = `${event.pageY}px`;
      dottedRectangle.style.minHeight = `${startDragY - event.pageY}px`;
    }
  }
  mouseFlag = 1;
}

function mouseUpEvent(event){
  console.log("mouseUp");
  if(mouseFlag === 0){
    console.log("click");
  }
  else if(mouseFlag === 1){
    endDragX = event.pageX;
    endDragY = event.pageY;
    dottedRectangle.style.backgroundColor = "black";
    dottedRectangle.style.outlineStyle = "none";

    console.log("X: "+endDragX+" Y: "+endDragY);
    console.log("drag");
    mouseFlag = 0;
    dragGoing = false;
  }
}


function doneButtonEventHandler(event){

    // constructor(x, y, width, height, color = "black", visible = true, gameContainer){
    let block;
    if(endDragX > startDragX){
      if(endDragY > startDragY){
        obj = {x: startDragX, y: startDragY, width: parseInt(dottedRectangle.style.minWidth), height: parseInt(dottedRectangle.style.minHeight), gameContainer: gameContainer, color: "black", status: "platform"}
        block = new Block(obj);
      }
      else{
        obj = {x: startDragX, y: endDragY, width: parseInt(dottedRectangle.style.minWidth), height: parseInt(dottedRectangle.style.minHeight), gameContainer: gameContainer, color: "black", status: "platform"}
        block = new Block(obj);
      }
    }
    else{
      if(endDragY > startDragY){
        obj = {x: endDragX, y: startDragY, width: parseInt(dottedRectangle.style.minWidth), height: parseInt(dottedRectangle.style.minHeight), gameContainer: gameContainer, color: "black", status: "platform"}
        block = new Block(obj);
      }
      else{
        obj = {x: endDragX, y: endDragY, width: parseInt(dottedRectangle.style.minWidth), height: parseInt(dottedRectangle.style.minHeight), gameContainer: gameContainer, color: "black", status: "platform"}
        block = new Block(obj);
      }
    }
    if(block instanceof Block){
      doneButton.remove();
      saveButton.remove();
      dottedRectangle.remove();
      gameContainer.removeEventListener("mousedown", mouseDownEvent);
      gameContainer.removeEventListener("mousemove", mouseMoveEvent);
      gameContainer.removeEventListener("mouseup", mouseUpEvent);
    }
  }


function saveButtonEventHandler(event){
  console.log("save button hit");
  let blockArray = [];
  Block.all.forEach(block => {
    blockArray.push(block.getObj());
    console.log(block.getObj());
  });
  //fetch request
  let levelUrl = `localhost:3000/levels/${currentLevel.id}`;
  fetch(levelUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({blockArray})
  }).then(res => response.json());
}
