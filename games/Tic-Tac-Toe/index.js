const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const clickSound = new Audio("hit.mp3");
clickSound.preload = "auto";

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Create board
function createBoard() {
    board.innerHTML = "";
    gameState.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.setAttribute("data-index", index);
        div.innerText = cell;
        div.addEventListener("click", handleClick);
        board.appendChild(div);
    });
}

function handleClick(e) {
    const index = e.target.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    
}

function checkWinner() {
    let won = false;

    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            won = true;
            break;
        }
    }

    if (won) {
        statusText.innerText = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
    } else if (!gameState.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
    }
}

function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.innerText = "";
    createBoard();
}


createBoard();

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

playClick()
