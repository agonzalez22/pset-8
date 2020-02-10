///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;
let turn;
let win;
let gameStarted = false;
let scoreX = 0;
let scoreO = 0;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2"); // grab the subheader

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("score-reset").onclick = resetScore;
document.getElementById("player-scoreX").innerHTML = scoreX;
document.getElementById("player-scoreO").innerHTML = scoreO;
document.getElementById('buttonX').addEventListener('buttonX', startPlayer);
document.getElementById('buttonO').addEventListener('buttonO', startPlayer);

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  turn = "";
  win = null;
  gameStarted = false;
  document.getElementById("buttonO").classList.remove("selected");
  document.getElementById("buttonX").classList.remove("selected");
  render(); // we'll write this later
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  if (win == "X") {
    scoreX = scoreX + 1;
    document.getElementById("player-scoreX").innerHTML = scoreX;
  } else if (win == "O") {
    scoreO = scoreO + 1;
    document.getElementById("player-scoreO").innerHTML = scoreO;
  }

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  gameStarted = true;
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function startPlayer(e) {
  if (gameStarted) return;

  if (e.id == "buttonX") {
    turn = "X";
    document.getElementById("turn-header").innerHTML = "Turn: X";
    document.getElementById("buttonO").classList.remove("selected");
    document.getElementById(e.id).classList.add("selected");
  } else {
    turn = "O";
    document.getElementById(e.id).classList.add("selected");
    document.getElementById("buttonX").classList.remove("selected");
    document.getElementById("turn-header").innerHTML = "Turn: O";
  }
}

function resetScore() {
  init();
  scoreX = 0;
  scoreO = 0;
  document.getElementById("player-scoreX").innerHTML = scoreX;
  document.getElementById("player-scoreO").innerHTML = scoreO;
}
