let toolsConatiner = document.querySelector(".tools-container");
let optionsContainer = document.querySelector(".options-container");
let optionsFlag = true;
let pencilToolContainer = document.querySelector(".pencil-tool-container");
let eraserToolContainer = document.querySelector(".eraser-tool-container");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let pencilFlag = false;
let eraserFlag = false;
let sticky = document.querySelector(".sticky");

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

// sticky tool
sticky.addEventListener("click", (e) => {
  let stickyContainer = document.createElement("div");
  stickyContainer.setAttribute("class", "sticky-container");
  stickyContainer.innerHTML = `
        <div class="header-container">
            <div class="minimize"></div>
            <div class="remove"></div>
      </div>
      <div class="note-container">
        <textarea></textarea>
      </div>
    `;
  document.body.appendChild(stickyContainer);

  stickyContainer.onmousedown = function (event) {
    dragNDrop(stickyContainer, event);
  };

  stickyContainer.ondragstart = function () {
    return false;
  };
});

function dragNDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;
  // document.body.append(element);

  moveAt(event.pageX, event.pageY);

  // moves the element at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the element on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the element, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
