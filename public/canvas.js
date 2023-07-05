let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthEle = document.querySelector(".pencil-width");
let eraserWidthEle = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let penColor = "black";
let eraserColor = "white";
let penWidth = pencilWidthEle.value;
let eraserWidth = eraserWidthEle.value;

// undoRedo tracker array
let undoRedoTracker = []; //data
let track = 0; // represent which action from tracker array

let mousedown = false;

//API
let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// tool.beginPath(); // new graphic path or line
// tool.moveTo(10, 10); // start point
// tool.lineTo(100, 150); // end point
// tool.stroke(); // fill color to invisible line

// tool.lineTo(200, 200);
// tool.stroke();

// mousedown -> start new graphic path, mousemove -> path fill(graphics)
canvas.addEventListener("mousedown", (e) => {
  mousedown = true;

  // beginPath({
  //   x: e.clientX,
  //   y: e.clientY,
  // });
  let data = {
    x: e.clientX,
    y: e.clientY,
  };
  //send data to server
  socket.emit("beginPath", data);
});

canvas.addEventListener("mousemove", (e) => {
  if (mousedown) {
    let data = {
      x: e.clientX,
      y: e.clientY,
      color: eraserFlag ? eraserColor : penColor,
      width: eraserFlag ? eraserWidth : penWidth,
    };
    //send to server
    socket.emit("drawStroke", data);
  }
  // drawStroke({
  //   x: e.clientX,
  //   y: e.clientY,
  //   color: eraserFlag ? eraserColor : penColor,
  //   width: eraserFlag ? eraserWidth : penWidth,
  // });
});

canvas.addEventListener("mouseup", (e) => {
  mousedown = false;

  let url = canvas.toDataURL();
  undoRedoTracker.push(url); // fill array
  track = undoRedoTracker.length - 1;
});

// undo : trck --
undo.addEventListener("click", (e) => {
  if (track > 0) track--;
  //action to display prev img
  let data = {
    trackValue: track,
    undoRedoTracker,
  };
  socket.emit("redoUndo", data);
  // undoredoCanvas(trackObj);
});

//redo track++
redo.addEventListener("click", (e) => {
  if (track < undoRedoTracker.length - 1) track++;
  //action to display next img
  let data = {
    trackValue: track,
    undoRedoTracker,
  };
  socket.emit("redoUndo", data);
  // undoredoCanvas(trackObj);
});

// undoredo action canvas
function undoRedoCanvas(trackObj) {
  // re-initialize
  track = trackObj.trackValue;
  undoRedoTracker = trackObj.undoRedoTracker;

  let url = undoRedoTracker[track];
  let img = new Image(); // new image reference element
  img.src = url;
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
  tool.strokeStyle = strokeObj.color;
  tool.lineWidth = strokeObj.width;
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}

//select pencil color

pencilColor.forEach((colorEle) => {
  colorEle.addEventListener("click", (e) => {
    let color = colorEle.classList[0];
    penColor = color;
    tool.strokeStyle = penColor;
  });
});

//pencil width
pencilWidthEle.addEventListener("change", (e) => {
  penWidth = pencilWidthEle.value;
  tool.lineWidth = penWidth;
});

//eraser width
eraserWidthEle.addEventListener("change", (e) => {
  eraserWidth = eraserWidthEle.value;
  tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click", (e) => {
  if (eraserFlag) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = penColor;
    tool.lineWidth = penWidth;
  }
});

// download img
download.addEventListener("click", (e) => {
  let url = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
});

socket.on("beginPath", (data) => {
  //data  -> data from server
  beginPath(data);
});

socket.on("drawStroke", (data) => {
  //data  -> data from server
  drawStroke(data);
});

socket.on("redoUndo", (data) => {
  //data  -> data from server
  undoRedoCanvas(data);
});
