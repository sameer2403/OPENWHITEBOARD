let toolsConatiner = document.querySelector(".tools-container");
let optionsContainer = document.querySelector(".options-container");
let optionsFlag = true;
let pencilToolContainer = document.querySelector(".pencil-tool-container");
let eraserToolContainer = document.querySelector(".eraser-tool-container");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let pencilFlag = false;
let eraserFlag = false;

// true -> show tools, false -> hide tools
optionsContainer.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;
  if (optionsFlag) showTools();
  else hideTools();
});

function showTools() {
  let iconEle = optionsContainer.children[0];
  iconEle.classList.remove("fa-times");
  iconEle.classList.add("fa-bars");
  toolsConatiner.style.display = "flex";
}

function hideTools() {
  let iconEle = optionsContainer.children[0];
  iconEle.classList.remove("fa-bars");
  iconEle.classList.add("fa-times");
  toolsConatiner.style.display = "none";

  // reset all tool selected status to default
  pencilToolContainer.style.display = "none";
  eraserToolContainer.style.display = "none";
}

// pencil tool
pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilToolContainer.style.display = "block";
  } else {
    pencilToolContainer.style.display = "none";
  }
});

// eraser tool
eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    eraserToolContainer.style.display = "flex";
  } else {
    eraserToolContainer.style.display = "none";
  }
});
console.log("tools");
