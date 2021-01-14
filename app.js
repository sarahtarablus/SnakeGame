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



function moveSnake(e) {
   
      if(e.keyCode === 39){
        rightPressed = true;
        const rightInt = setInterval(() => {
        ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
        drawSnake(startingX, startingY);
        currentX = startingX += dx;
        currentY = startingY;
        if(upPressed === true ){
          clearInterval(rightInt);
        }
        console.log('current-X' + currentX);
        console.log('current-Y' + currentY);
      }, 10);
     }else if(e.keyCode === 38){
        upPressed = true;
        const upInt = setInterval(() => {
        ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
        drawSnake(currentX, currentY);
        currentX = currentX;
        currentY += dy;
        
        if(downPressed === true ){
          clearInterval(upInt);
        }
        console.log('current-X' + currentX);
        console.log('current-Y' + currentY);
      }, 10);
     }
  } 
    //gameOverIfSnakeHitsTheWall()
    
    
    
    /*if(!upPressed){
      upPressed = true;
      if(e.keyCode === 38){
        drawSnake(currentX, currentY);
        //moveSnake();
        clearInterval(interval);
        //currentX = x;
        currentY = y += dy;
      }
    }
    
    
  } 

const interval = setInterval(snake, 10);
*/


/*function keyDownHandler (e) {
  
  if(!rightPressed){
    rightPressed = true;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    if(e.keyCode === 39){
      setInterval(() => {
      snake();
      x += dx;
      }, 10)
     
    }
  }else if(!upPressed){
    upPressed = true;
    rightPressed = false;
    leftPressed = false;
    downPressed = false;
    if(e.keyCode === 38){
      setInterval(() => {
        snake();
        y += dy;
      }, 10)
    }  
  }else if(!leftPressed){
    leftPressed = true;
    upPressed = false;
    downPressed = false;
    rightPressed = false;
    if(e.keyCode === 37){
      setInterval(() => {
        snake();
        x += -dx;
        }, 10)
       
    }  
  }else if(!downPressed){
    downPressed = true;
    leftPressed = false;
    upPressed = false;
    rightPressed = false;
    if(e.keyCode === 40){
      setInterval(() => {
        snake();
        y += -dy;
      }, 10)   
    }
  
 }
 console.log(e.keyCode)
}





function gameOverIfSnakeHitsTheWall () {
  if(x + dx > gameDisplay.width || x + dx < ballRadius || y + dy > gameDisplay.height || y + dy < ballRadius){
    console.log('GAME OVER')
    return false;
  } 
 
}
//gameOverIfSnakeHitsTheWall()
*/





//setInterval(moveSnake, 10);



