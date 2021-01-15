const gameDisplay = document.getElementById('game-display');
const ctx  = gameDisplay.getContext('2d');

let x = null;
let y = null;
let currentX = null
let currentY = null;
let startingX = gameDisplay.width/10;
let startingY = gameDisplay.height/2;
let dx = 0.6;
let dy = -0.6;
let ballRadius = 10;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let clickCount = null;


window.onload = drawSnake(startingX, startingY);

function drawSnake (startingX, startingY) {
  x = startingX
  y = startingY
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}


document.addEventListener('keydown', moveSnake);
//document.addEventListener('keyup', keyUpHandler)

/*function keyUpHandler() {
  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
}*/



function moveSnake(e) {
 if(clickCount === null){
    if(e.keyCode === 39){
      rightPressed = true;
      const rightInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      drawSnake(startingX, startingY);
      currentX = startingX += dx;
      currentY = startingY;  
      
      console.log('current-X' + currentX);
      console.log('current-Y' + currentY);
      if(upPressed === true || downPressed === true){
        clearInterval(rightInt);
        rightPressed = false;
      }
    }, 10);
   
    
    }else if(e.keyCode === 38){
      upPressed = true;
      const upInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      drawSnake(startingX, startingY);
      currentX = startingX;
      currentY = startingY += dy;
      if(rightPressed === true || leftPressed === true || downPressed === true){
        clearInterval(upInt);
        upPressed = false;
      }
      }, 10);
      
   }else if(e.keyCode === 40){
    downPressed = true;
    const downInt = setInterval(() => {
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    drawSnake(startingX, startingY);
    currentX = startingX;
    currentY = startingY += -dy;
    if(upPressed === true || leftPressed === true || rightPressed === true){
      clearInterval(downInt);
      downPressed = false;
    }
    }, 10);
   
   }
}else{
    if(e.keyCode === 39){
      rightPressed = true;
      const rightInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      drawSnake(currentX, currentY);
      currentX += dx;
      if(upPressed === true || downPressed === true || leftPressed === true){
        clearInterval(rightInt);
        rightPressed = false;
      }
    }, 10);

    
    
    }else if(e.keyCode === 38){
      upPressed = true;
      const upInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      drawSnake(currentX, currentY);
      currentY += dy;
      if(rightPressed === true || leftPressed === true || downPressed === true){
        clearInterval(upInt);
        upPressed = false;
       }
     }, 10);
    
    }else if(e.keyCode === 40){
      downPressed = true;
      const downInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      drawSnake(currentX, currentY);
      currentY += - dy;
      if(rightPressed === true || leftPressed === true || upPressed === true){
        clearInterval(downInt);
        downPressed = false;
        }
      }, 10);
     
     }else if(e.keyCode === 37){
        leftPressed = true;
        const leftInt = setInterval(() => {
        ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
        drawSnake(currentX, currentY);
        currentX += -dx;
        if(rightPressed === true || downPressed === true || upPressed === true){
          clearInterval(leftInt);
          leftPressed = false;
          }
       }, 10);
       
       }
          
    }
  }
  




function gameOverIfSnakeHitsTheWall () {
  if(currentX + dx > gameDisplay.width - ballRadius || currentX + dx < ballRadius){
    console.log('game over');
    currentX = currentX
  }
    
    
   if(currentY + dy > gameDisplay.height - ballRadius || currentY + dy < ballRadius){
    console.log('GAME OVER');
    currentY = currentY
  } 
 
}








