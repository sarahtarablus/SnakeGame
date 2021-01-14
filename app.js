const gameDisplay = document.getElementById('game-display');
const ctx  = gameDisplay.getContext('2d');

let x = gameDisplay.width - 450 ;
let y = gameDisplay.height/2;
let dx = 0.6;
let dy = -0.6;
let borderRadius = 10;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

function createTheSnake () {
  ctx.beginPath();
  ctx.arc(x, y, borderRadius, 0, Math.PI*2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener('keydown', moveSnake)


function moveSnake(e) {
 const idInterval = setInterval(() => {
  if(e.keyCode === 39){
    rightPressed = true;
    console.log(e.keyCode)
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    createTheSnake();
    x += dx;
    if(e.keyCode === 38){
      upPressed = true;
      rightPressed = false;
      leftPressed = false;
      downPressed = false;
    }
  }else if(e.keyCode === 38){
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    createTheSnake();
    y += dy;
  }else if(e.keyCode === 37){
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    createTheSnake();
    x += -dx;  
  }else if(e.keyCode === 40){
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    createTheSnake();
    y += -dy; 
  }
 }, 10)
}

function gameOverIfSnakeHitsTheWall () {
  if(x + dx > gameDisplay.width || x + dx < ballRadius || y + dy > gameDisplay.height || y + dy < ballRadius){
    clearInterval(idInterval);
  } 
}





//setInterval(moveSnake, 10);



