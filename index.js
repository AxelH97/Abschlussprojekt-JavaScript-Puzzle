/* var rows = 5;
var columns = 5;

var currTile;
var otherTile;
var turns = 0;

function moveStart() {
  currTile = this;
}

function moveOver(e) {
  e.preventDefault();
}

function moveEnter(e) {
  e.preventDefault();
}

function moveLeave() {}

function moveDrop() {
  otherTile = this;
}

function moveEnd() {
  if (currTile.src.includes("blank")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;

  turns += 1;
  document.getElementById("turns").innerText = turns;
}

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.src = "./images/blank.jpg";

      tile.addEventListener("dragstart", moveStart);
      tile.addEventListener("dragover", moveOver);
      tile.addEventListener("dragenter", moveEnter);
      tile.addEventListener("dragleave", moveLeave);
      tile.addEventListener("drop", moveDrop);
      tile.addEventListener("dragend", moveEnd);

      document.getElementById("board").append(tile);
    }
  }

  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString());
  }
  pieces.reverse();

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./images/" + pieces[i] + ".jpg";

    tile.addEventListener("dragstart", moveStart);
    tile.addEventListener("dragover", moveOver);
    tile.addEventListener("dragenter", moveEnter);
    tile.addEventListener("dragleave", moveLeave);
    tile.addEventListener("drop", moveDrop);
    tile.addEventListener("dragend", moveEnd);

    document.getElementById("pieces").append(tile);
  }
};

function startTimer(duration) {
  var timer = duration,
    minutes,
    seconds;
  var interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    document.getElementById("timer").innerText =
      minutes + "m " + seconds + "s ";
    if (--timer < 0) {
      timer = duration;
    }
    if (timer == 0) {
      alert("Time is up!");
      clearInterval(interval);
    }
  }, 1000);
}
startTimer(300);
var reloadButton = document.getElementById("reloadButton");

reloadButton.addEventListener("click", function () {
  location.reload();
}); */

var rows = 5;
var columns = 5;

var currTile;
var otherTile;
var turns = 0;

function moveStart() {
  if (this.style.border.includes("green")) {
    return;
  }
  currTile = this;
  this.style.border = "1px solid black";
}

function moveOver(e) {
  e.preventDefault();
}

function moveEnter(e) {
  e.preventDefault();
}

function moveLeave() {}

function moveDrop() {
  otherTile = this;
}

function moveEnd() {
  if (currTile.src.includes("blank")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;

  turns += 1;
  document.getElementById("turns").innerText = turns;

  checkImagePlacement(otherTile);
}

function checkImagePlacement(image) {
  const imageName = image.src.split("/").pop();
  const imageOrder = parseInt(imageName.split(".")[0], 10);

  const boardIndex = Array.from(
    document.getElementById("board").children
  ).indexOf(image);

  if (imageOrder === boardIndex + 1) {
    image.style.border = "1.5px solid green";
    // Bild ist an der richtigen Stelle
    image.removeEventListener("dragstart", moveStart);
    image.removeEventListener("dragend", moveEnd);
    image.removeEventListener("dragover", moveOver);
    image.removeEventListener("dragenter", moveEnter);
    image.removeEventListener("dragleave", moveLeave);
    image.removeEventListener("drop", moveDrop);
  } else {
    image.style.border = "1.5px solid red";
    // Bild ist an der falschen Stelle
  }
}

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.src = "./images/blank.jpg";

      tile.addEventListener("dragstart", moveStart);
      tile.addEventListener("dragover", moveOver);
      tile.addEventListener("dragenter", moveEnter);
      tile.addEventListener("dragleave", moveLeave);
      tile.addEventListener("drop", moveDrop);
      tile.addEventListener("dragend", moveEnd);

      document.getElementById("board").append(tile);
    }
  }

  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString() + ".jpg");
  }

  pieces = shuffleArray(pieces); // Mische die Bilder

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./images/" + pieces[i];

    tile.addEventListener("dragstart", moveStart);
    tile.addEventListener("dragover", moveOver);
    tile.addEventListener("dragenter", moveEnter);
    tile.addEventListener("dragleave", moveLeave);
    tile.addEventListener("drop", moveDrop);
    tile.addEventListener("dragend", moveEnd);

    document.getElementById("pieces").append(tile);
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer(duration) {
  var timer = duration,
    minutes,
    seconds;
  var interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    document.getElementById("timer").innerText =
      minutes + "m " + seconds + "s ";
    if (--timer < 0) {
      timer = duration;
    }
    if (timer == 0) {
      alert("Time is up!");
      clearInterval(interval);
      moveEnd();
    }
  }, 1000);
}
startTimer(180);
var reloadButton = document.getElementById("reloadButton");

reloadButton.addEventListener("click", function () {
  location.reload();
});
