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
      clearInterval(interval);
      timerExpired = true; // Timer ist abgelaufen
      document.getElementById("message").innerText = "You lose, Time is up!";
      document.getElementById("message").style.display = "block";
      removeDragEventListeners();
    } else if (allImagesPlacedCorrectly()) {
      clearInterval(interval);
      document.getElementById("message").innerText = "You win!";
      document.getElementById("message").style.display = "block";
      removeDragEventListeners();
    }

    document.getElementById("timerSound").play("bing.mp3");
  }, 1000);
}
startTimer(300); // Zeit wariabel einstellen um das spiel zu verlängern oder zu verkürzen

function playSound() {
  timerSound.currentTime = 0;
  timerSound.play("bing.mp3");
  
  // Event-Listener entfernen, um nur einmal abzuspielen
  timerSound.removeEventListener("ended", playSound);
}
