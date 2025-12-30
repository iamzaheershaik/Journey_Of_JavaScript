var currentPlayer = "X";
var gameOver = false;
var board = ["", "", "", "", "", "", "", "", ""];

function makeMove(boxNumber) {
  if (gameOver == true) {
    return;
  }

  if (board[boxNumber] != "") {
    return;
  }

  board[boxNumber] = currentPlayer;
  document.getElementById("box" + boxNumber).innerHTML = currentPlayer;

  if (checkWinner() == true) {
    gameOver = true;
    document.getElementById("message").innerHTML =
      "🎉 Player " + currentPlayer + " wins! 🎉";
    disableAllBoxes();
    return;
  }

  var isTie = true;
  for (var i = 0; i < 9; i++) {
    if (board[i] == "") {
      isTie = false;
    }
  }

  if (isTie == true) {
    gameOver = true;
    document.getElementById("message").innerHTML = "It's a tie! 🤝";
    return;
  }

  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  document.getElementById("message").innerHTML =
    "Player " + currentPlayer + "'s turn";
}

function checkWinner() {
  if (board[0] != "" && board[0] == board[1] && board[1] == board[2]) {
    return true;
  }
  if (board[3] != "" && board[3] == board[4] && board[4] == board[5]) {
    return true;
  }
  if (board[6] != "" && board[6] == board[7] && board[7] == board[8]) {
    return true;
  }
  if (board[0] != "" && board[0] == board[3] && board[3] == board[6]) {
    return true;
  }
  if (board[1] != "" && board[1] == board[4] && board[4] == board[7]) {
    return true;
  }
  if (board[2] != "" && board[2] == board[5] && board[5] == board[8]) {
    return true;
  }
  if (board[0] != "" && board[0] == board[4] && board[4] == board[8]) {
    return true;
  }
  if (board[2] != "" && board[2] == board[4] && board[4] == board[6]) {
    return true;
  }
  return false;
}

function disableAllBoxes() {
  for (var i = 0; i < 9; i++) {
    document.getElementById("box" + i).classList.add("disabled");
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];

  for (var i = 0; i < 9; i++) {
    document.getElementById("box" + i).innerHTML = "";
    document.getElementById("box" + i).classList.remove("disabled");
  }

  currentPlayer = "X";
  gameOver = false;
  document.getElementById("message").innerHTML = "Player X's turn";
}
