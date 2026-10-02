const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const xScoreCard = document.getElementById("xScoreCard");
const oScoreCard = document.getElementById("oScoreCard");

const restartButton = document.getElementById("restart");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let scores = {
    X: 0,
    O: 0
};

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Update active player display
function updateTurnDisplay() {
    xScoreCard.classList.toggle(
        "active", currentPlayer === "X" && gameActive
    );

    oScoreCard.classList.toggle(
        "active", currentPlayer === "O" && gameActive
    );
}

// Check whether a player has won
function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            return combination;
        }
    }

    return null;
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = Number(cell.dataset.index);

    if (!gameActive || board[index] !== "") {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.disabled = true;

    const winningLine = checkWinner();

    if (winningLine) {
        gameActive = false;

        scores[currentPlayer]++;

        xScoreText.textContent = scores.X;
        oScoreText.textContent = scores.O;

        winningLine.forEach(index => {
            cells[index].classList.add("winner");
        });

        statusText.textContent =
            `Player ${currentPlayer} wins! 🎉`;

        updateTurnDisplay();
        return;
    }

    // Check for draw
    if (board.every(value => value !== "")) {
        gameActive = false;
        statusText.textContent = "It's a draw! 🤝";
        updateTurnDisplay();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s turn`;

    updateTurnDisplay();
}

// Restart the current round
function restartRound() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("x", "o", "winner");
    });

    statusText.textContent = "Player X's turn";

    updateTurnDisplay();
}

// Reset scores and restart
function resetScores() {
    scores.X = 0;
    scores.O = 0;

    xScoreText.textContent = 0;
    oScoreText.textContent = 0;

    restartRound();
}

// Add click events
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartRound);
resetButton.addEventListener("click", resetScores);

updateTurnDisplay(); ki 
