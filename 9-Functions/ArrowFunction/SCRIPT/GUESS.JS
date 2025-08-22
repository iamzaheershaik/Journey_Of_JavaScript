document.addEventListener('DOMContentLoaded', function () {
    // Hardcoded secret number for now
    var secretNumber = 67;  
    var numberOfGuesses = 0;
    var bestScore = localStorage.getItem('bestScore') || Infinity;  // Load best score from localStorage

    var guessInput = document.getElementById('guess');
    var guessButton = document.getElementById('guessBtn');
    var giveUpButton = document.getElementById('giveUpBtn');
    var playAgainButton = document.getElementById('playAgainBtn');
    var prompt = document.querySelector('.prompt');
    var bestScoreLabel = document.querySelector('.header .label:nth-child(1)');
    var numberOfGuessesLabel = document.querySelector('.header .label:nth-child(2)');

    
    bestScoreLabel.textContent = 'Best Score: ' + (bestScore === Infinity ? 'N/A' : bestScore);
    numberOfGuessesLabel.textContent = 'Guesses: ' + numberOfGuesses;

    
    guessButton.addEventListener('click', function () {
        var userGuess = parseInt(guessInput.value);

      
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            alert('Please enter a number between 1 and 100.');
            return;
        }

        numberOfGuesses++;

        if (userGuess === secretNumber) {
            prompt.textContent = 'Correct! You guessed it in ' + numberOfGuesses + ' guesses.';
            if (numberOfGuesses < bestScore) {
                bestScore = numberOfGuesses;
                localStorage.setItem('bestScore', bestScore);  
            }
            numberOfGuessesLabel.textContent = 'Guesses: ' + numberOfGuesses;
            bestScoreLabel.textContent = 'Best Score: ' + bestScore;
        } else if (userGuess < secretNumber) {
            prompt.textContent = 'Too low! Try again.';
        } else {
            prompt.textContent = 'Too high! Try again.';
        }

        
        numberOfGuessesLabel.textContent = 'Guesses: ' + numberOfGuesses;
        guessInput.value = ''; 
    });

  
    giveUpButton.addEventListener('click', function () {
        prompt.textContent = 'You gave up! The number was ' + secretNumber + '.';
        numberOfGuessesLabel.textContent = 'Guesses: ' + numberOfGuesses;
    });

    
    playAgainButton.addEventListener('click', function () {
        numberOfGuesses = 0;
        prompt.textContent = 'Try and guess it!';
        guessInput.value = '';
        numberOfGuessesLabel.textContent = 'Guesses: ' + numberOfGuesses;
        bestScoreLabel.textContent = 'Best Score: ' + (bestScore === Infinity ? 'N/A' : bestScore);
    });
});
