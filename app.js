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
let startingXApple = gameDisplay.width/2;
let startingYApple = gameDisplay.height/2;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let clickCount = null;
let randomX = null;
let randomY = null;

const apple = {
  color: 'red',
  radius: 5,
  drawStartingApple: function(startingXApple, startingYApple){
    x = startingXApple
    y = startingYApple
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}

const generateRandomX = () => {
  randomX = (Math.random() * 500) + 1
  return randomX;
}

const generateRandomY = () => {
  randomY = (Math.random() * 350) + 1
  return randomY;
}


const snake = {
  color: 'black',
  radius: 10,
  drawSnake: function (startingX, startingY) {
    x = startingX
    y = startingY
    ctx.beginPath();
    ctx.arc(x, y, snake.radius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

}

const loadBothFunctions = () => {
  snake.drawSnake(startingX, startingY), apple.drawStartingApple(startingXApple, startingYApple);
}

window.onload = loadBothFunctions;

const gameOverIfSnakeHitsTheWall = (interval) => {
  if(currentX + dx > gameDisplay.width - snake.radius || currentX + dx < snake.radius){
    alert('GAME OVER');
    document.location.reload();
    clearInterval(interval);
  }
  if(currentY + dy > gameDisplay.height - snake.radius || currentY + dy < snake.radius){
    alert('GAME OVER');
    document.location.reload();
    clearInterval(interval);
  }  
}

const rightArrow = (startingX, startingY) => {
    
}

const moveSnake = (e) => {
 if(clickCount === null){
  if(e.keyCode === 39){
    rightPressed = true;
    const rightInt = setInterval(() => {
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    snake.drawSnake(startingX, startingY);
    apple.drawStartingApple(startingXApple, startingYApple) 
    currentX = startingX += dx;
    currentY = startingY;  
    if(upPressed === true || downPressed === true){
      clearInterval(rightInt);
      rightPressed = false;
    }
    snakeEatsTheApple;
    gameOverIfSnakeHitsTheWall(rightInt);
  }, 10);

  }else if(e.keyCode === 38){
      upPressed = true;
      const upInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      snake.drawSnake(startingX, startingY);
      apple.drawStartingApple (startingXApple, startingYApple)
      currentX = startingX;
      currentY = startingY += dy;
      if(rightPressed === true || leftPressed === true || downPressed === true){
        clearInterval(upInt);
        upPressed = false;
      }
      gameOverIfSnakeHitsTheWall(upInt);
      }, 10);
      
   }else if(e.keyCode === 40){
    downPressed = true;
    const downInt = setInterval(() => {
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    snake.drawSnake(startingX, startingY);
    apple.drawStartingApple(startingXApple, startingYApple);
    currentX = startingX;
    currentY = startingY += -dy;
    if(upPressed === true || leftPressed === true || rightPressed === true){
      clearInterval(downInt);
      downPressed = false;
    }
    gameOverIfSnakeHitsTheWall(downInt);
    }, 10);
   
   }
}else{
    if(e.keyCode === 39){
      rightPressed = true;
      const rightInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      snake.drawSnake(startingX, startingY);
      apple.drawStartingApple(startingXApple, startingYApple) 
      currentX += dx;
      currentY = currentY;  
      if(upPressed === true || downPressed === true){
        clearInterval(rightInt);
        rightPressed = false;
      }
      snakeEatsTheApple;
      gameOverIfSnakeHitsTheWall(rightInt);
    }, 10);

    }else if(e.keyCode === 38){
      upPressed = true;
      const upInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      snake.drawSnake(currentX, currentY);
      apple.drawStartingApple(generateRandomX(), generateRandomY());
      currentY += dy;
      if(rightPressed === true || leftPressed === true || downPressed === true){
        clearInterval(upInt);
        upPressed = false;
       }
       gameOverIfSnakeHitsTheWall(upInt);
     }, 10);
    
    }else if(e.keyCode === 40){
      downPressed = true;
      const downInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      snake.drawSnake(currentX, currentY);
      apple.drawStartingApple(generateRandomX(), generateRandomY());
      currentY += - dy;
      if(rightPressed === true || leftPressed === true || upPressed === true){
        clearInterval(downInt);
        downPressed = false;
        }
        gameOverIfSnakeHitsTheWall(downInt);
      }, 10);
     
     }else if(e.keyCode === 37){
        leftPressed = true;
        const leftInt = setInterval(() => {
        ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
        snake.drawSnake(currentX, currentY);
        apple.drawStartingApple(generateRandomX(), generateRandomY());
        currentX += -dx;
        if(rightPressed === true || downPressed === true || upPressed === true){
          clearInterval(leftInt);
          leftPressed = false;
          }
          gameOverIfSnakeHitsTheWall(leftInt);
        }, 10); 
      }      
    }
  }


document.addEventListener('keydown', moveSnake);

  
const snakeEatsTheApple = () => {
  if(snake.radius === apple.radius){
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
  }
}










