const gameDisplay = document.getElementById('game-display');
const ctx  = gameDisplay.getContext('2d');


let squareWidth = 20;
let squareHeight = 20;

let appleX =  Math.floor((Math.random() * 500 + 1) / 10) * 10;
let appleY =  Math.floor((Math.random() * 340 + 1) / 10) * 10;

let currentX = null
let currentY = null;
let dx = 5;
let dy = 5;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let clickCount = null;


class Snake {
  constructor(x, y, radius, position){
   this.x = x;
   this.y = y;
   this.radius = radius;
  }
  get snake() {
    return this.drawSnake();
  }
  drawSnake () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
}

const snake = new Snake(gameDisplay.width/10, gameDisplay.height/2, 10);
const nextSnake = new Snake(currentX, currentY, 10, 10);

class Apple {
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius; 
  }
  get apple() {
    return this.drawApple();
  }
  drawApple () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  } 
}

const apple = new Apple(appleX, appleY, 10);
//const nextApple = new Apple(generateRandomX(), generateRandomY(), 10);


window.onload = () => {
  snake.drawSnake();
  apple.drawApple();
}

const gameOverIfSnakeHitsTheWall = (interval) => {
 if(snake.x + dx > gameDisplay.width - snake.radius || snake.x + 
  dx < snake.radius){
    alert('GAME OVER');
    document.location.reload();
    clearInterval(interval);
  }
 if(snake.y + dy > gameDisplay.height - snake.radius || snake.y +  dy < snake.radius){
    alert('GAME OVER');
    document.location.reload();
    clearInterval(interval);
  }  
}
 
const moveSnake = (e) => {
 if(clickCount === null){
  if(e.keyCode === 39){
    rightPressed = true;
    const rightInt = setInterval(() => {
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    snake.drawSnake();
    apple.drawApple();
    currentX = snake.x += dx;
    currentY = snake.y;  
    if(upPressed === true || downPressed === true){
      clearInterval(rightInt);
      rightPressed = false;
    }
   
    gameOverIfSnakeHitsTheWall(rightInt);
  }, 150);
  }else if(e.keyCode === 37){
    leftPressed = true;
    const leftInt = setInterval(() => {
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    snake.drawSnake();
    apple.drawApple();
    currentX = snake.x += -dx;
    currentY = snake.y;
    if(rightPressed === true || downPressed === true || upPressed === true){
      clearInterval(leftInt);
      leftPressed = false;
      }
      gameOverIfSnakeHitsTheWall(leftInt);
    }, 150); 
  }else if(e.keyCode === 38){
    upPressed = true;
    const upInt = setInterval(() => {
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    snake.drawSnake();
    apple.drawApple ();
    currentX = snake.x;
    currentY = snake.y += -dy;
    if(rightPressed === true || leftPressed === true || downPressed === true){
      clearInterval(upInt);
      upPressed = false;
    }
    gameOverIfSnakeHitsTheWall(upInt);
    }, 150);
      
   }else if(e.keyCode === 40){
    downPressed = true;
    const downInt = setInterval(() => {
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
    snake.drawSnake();
    apple.drawApple();
    currentX = snake.x;
    currentY = snake.y += dy;
    if(upPressed === true || leftPressed === true || rightPressed === true){
      clearInterval(downInt);
      downPressed = false;
    }
    gameOverIfSnakeHitsTheWall(downInt);
    }, 150); 
  }
}else{
    if(e.keyCode === 39){
      rightPressed = true;
      const rightInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      nextSnake.drawSnake();
      apple.drawApple();
      currentX = nextSnake.x += dx;
      currentY = nextSnake.y;   
      if(upPressed === true || downPressed === true){
        clearInterval(rightInt);
        rightPressed = false;
      }
      snakeEatsTheApple;
      gameOverIfSnakeHitsTheWall(rightInt);
    }, 150);

    }else if(e.keyCode === 38){
      upPressed = true;
      const upInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      nextSnake.drawSnake();
      apple.drawApple();
      currentX = nextSnake.x;
      currentY = nextSnake.y += -dy; 
      if(rightPressed === true || leftPressed === true || downPressed === true){
        clearInterval(upInt);
        upPressed = false;
       }
       gameOverIfSnakeHitsTheWall(upInt);
     }, 150);
    
    }else if(e.keyCode === 40){
      downPressed = true;
      const downInt = setInterval(() => {
      ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
      nextSnake.drawSnake();
      apple.drawApple();
      currentX = nextSnake.x;
      currentY = nextSnake.y += dy;
      if(rightPressed === true || leftPressed === true || upPressed === true){
        clearInterval(downInt);
        downPressed = false;
        }
        gameOverIfSnakeHitsTheWall(downInt);
      }, 150);
     
     }else if(e.keyCode === 37){
        leftPressed = true;
        const leftInt = setInterval(() => {
        ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
        nextSnake.drawSnake();
        apple.drawApple();
        currentX = nextSnake.x += -dx;
        currentY = nextSnake.y;
        if(rightPressed === true || downPressed === true || upPressed === true){
          clearInterval(leftInt);
          leftPressed = false;
          }
          gameOverIfSnakeHitsTheWall(leftInt);
        }, 150); 
      }      
    }
  }


document.addEventListener('keydown', moveSnake);

  
const snakeEatsTheApple = () => {
  if(snake.radius === apple.radius){
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
  }
}










