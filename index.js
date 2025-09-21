const container = document.querySelector('.container');
const customCursor = document.querySelector('.player');

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  customCursor.style.left = (x - 25) + 'px';  // subtract half width
  customCursor.style.top  = (y - 25) + 'px';  // subtract half height
  customCursor.style.display = 'block';
});

container.addEventListener('mouseleave', () => {
  customCursor.style.display = 'none';
});


// SCORE SYSTEM
let score = 0;
let scoreInterval;
const scoreDisplay = document.querySelector("h1");
// Start score timer
container.addEventListener("mouseenter", () => {
  if (scoreInterval) clearInterval(scoreInterval); // ensure old one is cleared
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  scoreInterval = setInterval(() => {
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }, 1000);
});

// Stop score timer
container.addEventListener("mouseleave", () => {
  clearInterval(scoreInterval);
  scoreInterval = null; // reset it
});


// COLLISION DETECTION
function checkCollision() {
  const playerRect = customCursor.getBoundingClientRect();
  const enemies = document.querySelectorAll(".enemy1, .enemy2, .enemy3, .enemy4");

  for (let enemy of enemies) {
    const rect = enemy.getBoundingClientRect();
    if (
      !(playerRect.right < rect.left ||
        playerRect.left > rect.right ||
        playerRect.bottom < rect.top ||
        playerRect.top > rect.bottom)
    ) {
      clearInterval(scoreInterval);
      
      localStorage.setItem("lastScore", score);
      window.location.href = "gameOver.html";

      break;
    }
  }
}

// check collision continuously
setInterval(checkCollision, 100);

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // move player
  customCursor.style.left = (x - 25) + "px";
  customCursor.style.top  = (y - 25) + "px";
  customCursor.style.display = "block";

  // get updated positions
  const playerRect = customCursor.getBoundingClientRect();

  // check if player is outside container
  if (
    playerRect.left < rect.left ||
    playerRect.top < rect.top ||
    playerRect.right > rect.right ||
    playerRect.bottom > rect.bottom
  ) {
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    container.classList.add("fault");
  } else {
    container.classList.remove("fault");
  }
});
