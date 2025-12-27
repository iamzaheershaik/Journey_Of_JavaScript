let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 7;

function checkGuess() {
  const guess = Number(document.getElementById("guessInput").value);
  const message = document.getElementById("message");

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "Enter a number between 1 and 100";
    return;
  }

  attemptsLeft--;
  document.getElementById("attempts").textContent =
    `Guesses left: ${attemptsLeft}`;

  if (guess === secretNumber) {
    message.textContent = "🎉 Correct! You win!";
    document.querySelector(".display").textContent = secretNumber;
    disableGame();
    return;
  }

  // High / Low hint
  let directionHint = guess > secretNumber ? "Too High" : "Too Low";

  // Frequency (distance) hint
  let distance = Math.abs(secretNumber - guess);
  let frequencyHint = "";

  if (distance <= 5) frequencyHint = "🔥 Very Hot";
  else if (distance <= 10) frequencyHint = "🌡 Hot";
  else if (distance <= 20) frequencyHint = "🙂 Warm";
  else frequencyHint = "🧊 Cold";

  message.textContent = `${directionHint} | ${frequencyHint}`;

  if (attemptsLeft === 0) {
    message.textContent = `💀 Game Over! Number was ${secretNumber}`;
    document.querySelector(".display").textContent = secretNumber;
    disableGame();
  }
}

function disableGame() {
  document.getElementById("guessInput").disabled = true;
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 7;

  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessInput").value = "";
  document.getElementById("message").textContent = "Start guessing...";
  document.getElementById("attempts").textContent = "Guesses left: 7";
  document.querySelector(".display").textContent = "?";
}

