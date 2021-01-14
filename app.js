const gameDisplay = document.getElementById('game-display');
const ctx  = gameDisplay.getContext('2d');

let x = gameDisplay.width/2;
let y = gameDisplay.height - 30;
let dx = 0.6;
let dy = -0.6;

function createTheSnake () {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function moveSnake () {
  ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
  createTheSnake();
  x += dx;
  y += dy;
}

setInterval(moveSnake, 10);



