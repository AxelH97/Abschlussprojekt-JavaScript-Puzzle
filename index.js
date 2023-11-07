var rows = 5;
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

var reloadButton = document.getElementById("reloadButton");

reloadButton.addEventListener("click", function () {
  location.reload();
});
