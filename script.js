const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

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

function displayMessage(msg) {
    message.innerText = msg;
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.style.backgroundColor = currentPlayer === 'X' ? '#ff6347' : '#87cefa';

    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayMessage(`Player ${currentPlayer} wins!`);
        isGameActive = false;
        triggerConfetti();
        return;
    }

    if (!gameState.includes('')) {
        displayMessage('Game is a draw!');
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayMessage(`Now it's ${currentPlayer}'s turn`);
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    message.innerText = 'First hitter will be X';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#61dafb';
    });
}

function triggerConfetti() {
    // Basic confetti effect using particles.js or a similar library
    const confettiSettings = { target: 'confetti-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}

document.addEventListener('DOMContentLoaded', () => {
    displayMessage('First hitter will be X');
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
