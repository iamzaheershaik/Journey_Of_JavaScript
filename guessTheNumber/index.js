let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

const msg = document.getElementById('message');
const scoreSpan = document.getElementById('score');
const input = document.getElementById('guessInput');
const btn = document.getElementById('checkBtn');
const resetBtn = document.getElementById('resetBtn');

btn.addEventListener('click', () => {
    const userGuess = Number(input.value);

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        msg.textContent = "> ERROR: INVALID_INPUT";
        return;
    }

    if (userGuess === targetNumber) {
        msg.textContent = "> SUCCESS: ACCESS_GRANTED. YOU WIN.";
        msg.style.color = "#fff";
        endGame();
    } else {
        attempts--;
        scoreSpan.textContent = attempts;
        
        if (attempts > 0) {
            msg.textContent = userGuess > targetNumber ? "> FEEDBACK: TOO_HIGH" : "> FEEDBACK: TOO_LOW";
        } else {
            msg.textContent = `> FATAL_ERROR: SYSTEM_LOCKED. TARGET was ${targetNumber}`;
            endGame();
        }
    }
    input.value = '';
    input.focus();
});

function endGame() {
    input.disabled = true;
    btn.disabled = true;
    resetBtn.classList.remove('hidden');
}

resetBtn.addEventListener('click', () => {
    location.reload(); 
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btn.click();
});