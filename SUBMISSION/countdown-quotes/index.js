let count = 10;
let timer = null;

const countdownEl = document.getElementById("countdown");
const quoteEl = document.getElementById("quote");

const quotes = [
  "Discipline beats motivation.",
  "Focus on progress, not perfection.",
  "Consistency creates confidence.",
  "Small steps win big games.",
  "Do the work, even when tired."
];

function startCountdown() {
  if (timer !== null) return; // prevents multiple timers

  count = 10;
  countdownEl.textContent = count;

  timer = setInterval(() => {
    count--;
    countdownEl.textContent = count;

    if (count === 0) {
      clearInterval(timer);
      timer = null;
      changeQuote(); // auto change quote when done
    }
  }, 1000);
}

function changeQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = quotes[randomIndex];
}
