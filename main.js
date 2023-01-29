const WIN = 1, TIE = 0, LOSE = -1;

const buttons = document.querySelector('.icons').querySelectorAll('button');
const playerScoreText = document.querySelector('.player');
const compScoreText = document.querySelector('.computer');
const message = document.querySelector('.message');

console.log(buttons);

let playerScore = 0;
let compScore = 0;


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
    console.log(compChoice);
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
        compScore;
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

function showOnScreen(playerChoice, compChoice, outcome) {
    buttons.forEach(clearButton);
    lightUp(playerChoice, outcome);
    lightUp(compChoice, -outcome);

    // capitalise playerChoice and compChoice 
    playerChoice = playerChoice[0].toUpperCase() + playerChoice.slice(1);
    compChoice = compChoice[0].toUpperCase() + compChoice.slice(1);
    if (outcome == WIN) {
        playerScoreText.textContent = `Player score: ${playerScore}`;
        message.textContent = `${playerChoice} beats ${compChoice}! You win the round!`;
    } else if (outcome == LOSE) {
        compScoreText.textContent = `Computer score: ${compScore}`;
        message.textContent = `${playerChoice} loses to ${compChoice}! You lose the round!`;
    } else {
        message.textContent = `Both choose ${playerChoice}! You tie the round!`;
    }
}
