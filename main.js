const WIN = 1, TIE = 0, LOSE = -1;

const buttons = document.querySelector('.icons').querySelectorAll('button');
const playerScoreText = document.querySelector('.player');
const compScoreText = document.querySelector('.computer');
const compChoiceText = document.querySelector('.choice');
const playAgain = document.querySelector(`.play-again`);
const canvas = document.querySelector(`#my-canvas`);
const message = document.querySelector('.message');
let timeout;

let playerScore = 0;
let compScore = 0;
let confettiSettings = { target: 'my-canvas' };
let confetti = new ConfettiGenerator(confettiSettings);

function updateScores() {
    playerScoreText.textContent = `Player score: ${playerScore}`;
    compScoreText.textContent = `Computer score: ${compScore}`;
}

function playRound(button) {
    if (button.srcElement.classList.contains("rock")) round("rock");
    else if (button.srcElement.classList.contains("paper")) round("paper");
    else round("scissors");
}

buttons.forEach((button) => {
    button.addEventListener("click", playRound);
})

function randomChoice() {
    let choice = Math.floor(Math.random() * 3);
    if (choice == 0) {
        return "rock";
    } else if (choice == 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

function round(playerChoice) {
    let compChoice = randomChoice();
    if (playerChoice == "rock" && compChoice == "scissors") {
        playerScore++;
        showOnScreen("rock", "scissors", WIN);
    }
    else if (playerChoice == "rock" && compChoice == "paper") {
        compScore++;
        showOnScreen("rock", "paper", LOSE);
    }
    else if (playerChoice == "rock" && compChoice == "rock") {
        showOnScreen("rock", "rock", TIE);
    }
    else if (playerChoice == "paper" && compChoice == "scissors") {
        compScore++;
        showOnScreen("paper", "scissors", LOSE);
    }
    else if (playerChoice == "paper" && compChoice == "paper") {
        showOnScreen("paper", "paper", TIE);
    }
    else if (playerChoice == "paper" && compChoice == "rock") {
        playerScore++;
        showOnScreen("paper", "rock", WIN);
    }
    else if (playerChoice == "scissors" && compChoice == "scissors") {
        showOnScreen("scissors", "scissors", TIE);
    }
    else if (playerChoice == "scissors" && compChoice == "paper") {
        playerScore++;
        showOnScreen("scissors", "paper", WIN);
    }
    else {
        compScore++;
        showOnScreen("scissors", "rock", LOSE);
    }
}

function lightUp(choice, outcome) {
    if (outcome == WIN) {
        const chosenButton = document.querySelector(`.${choice}`);
        chosenButton.classList.add("win");
    }
    else if (outcome == TIE) {
        const chosenButton = document.querySelector(`.${choice}`)
        chosenButton.classList.add("tie");
    }
    else {
        const chosenButton = document.querySelector(`.${choice}`)
        chosenButton.classList.add("lose");
    }
}

function clearButton(button) {
    button.classList.remove("win");
    button.classList.remove("tie");
    button.classList.remove("lose");
}

function clearRound() {
    buttons.forEach(clearButton);
    compChoiceText.textContent = `Choose your weapon!`;
    message.textContent = `First to 5 wins!`;   
}

function resetScreen() {
    clearRound();
    playerScore = 0;
    compScore = 0;
    updateScores();
    canvas.classList.remove('active');
    playAgain.classList.remove('active');
}

playAgain.addEventListener("click", resetScreen);

function gameOver(winner) {
    if (winner == "player") {
        message.textContent = "You reached 5 points! You win the game!";
        playAgain.classList.add('active');
        canvas.classList.add('active');
        confetti.render();
    } else {
        message.textContent = "Computer reached 5 points! You lose!";
        playAgain.classList.add('active');
    }
}

function showOnScreen(playerChoice, compChoice, outcome) {
    // clear previous choices
    clearTimeout(timeout);
    buttons.forEach(clearButton); 

    lightUp(playerChoice, outcome);
    lightUp(compChoice, -outcome);

    // capitalise playerChoice and compChoice 
    playerChoice = playerChoice[0].toUpperCase() + playerChoice.slice(1);
    compChoice = compChoice[0].toUpperCase() + compChoice.slice(1);

    compChoiceText.textContent = `I pick ${compChoice}!`;
    updateScores();
    if (outcome == WIN) {
        message.textContent = `${playerChoice} beats ${compChoice}! You win the round!`;
    } else if (outcome == LOSE) {
        message.textContent = `${playerChoice} loses to ${compChoice}! You lose the round!`;
    } else {
        message.textContent = `Both choose ${playerChoice}! You tie the round!`;
    }

    if (playerScore == 5) {
        gameOver("player");
        return;
    }
    if (compScore == 5) {
        gameOver("comp");
        return;
    }

    timeout = setTimeout(clearRound, 3000);
}