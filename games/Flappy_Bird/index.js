var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var scoreDisplay = document.getElementById("score");

var velocity = 0;
var gravity = 0.5;
var score = 0;
var gameRunning = false;

// Sound
var jumpSound = new Audio("./assets/jump.mp3");
var hitSound = new Audio("./assets/hit.mp3");
var introSound = new Audio("./assets/intro.mp3");


// Start game
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("game").style.display = "block";
    gameRunning = true;
    introSound.play();
}

// Hole randomizer + difficulty scaling
hole.addEventListener("animationiteration", () => {
    var random = Math.random() * 300;
    hole.style.top = random + "px";

    score++;
    scoreDisplay.innerText = "Score: " + score;

    // Increase difficulty
    if (score % 5 === 0) {
        block.style.animationDuration = (2 - score * 0.05) + "s";
        hole.style.animationDuration = (2 - score * 0.05) + "s";
    }
});

// Game loop
setInterval(function () {
    if (!gameRunning) return;

    var characterTop = parseFloat(getComputedStyle(character).getPropertyValue("top"));

    velocity += gravity;
    character.style.top = (characterTop + velocity) + "px";

    var blockLeft = parseFloat(getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseFloat(getComputedStyle(hole).getPropertyValue("top"));

    // Collision
    if (
        characterTop > 470 ||
        (blockLeft < 80 && blockLeft > 0 &&
        (characterTop < holeTop || characterTop > holeTop + 130))
    ) {
        gameOver();
    }
}, 20);

// Jump
function jump() {
    if (!gameRunning) return;
    velocity = -8;
    jumpSound.play();
}

// Controls
document.addEventListener("keydown",jump);
document.addEventListener("click", jump);

// Game Over
function gameOver() {
    hitSound.play();
    introSound.pause();
    introSound.currentTime = 0;
    alert("Game Over! Score: " + score);

    // Reset
    character.style.top = "100px";
    velocity = 0;
    score = 0;
    scoreDisplay.innerText = "Score: 0";
    block.style.animationDuration = "2s";
    hole.style.animationDuration = "2s";
    gameRunning = false;

    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("game").style.display = "none";
}
