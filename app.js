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


const moveRight = () => {
  ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
  snake.drawSnake();
  apple.drawApple();
  if(clickCount === null){
    currentX = snake.x += dx;
    currentY = snake.y;
  }else{
    currentX = nextSnake.x += dx;
    currentY = nextSnake.y;
  } 
}

const moveLeft = () => {
  ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
  snake.drawSnake();
  apple.drawApple();
  if(clickCount === null){
    currentX = snake.x += -dx;
    currentY = snake.y;
  }else{
    currentX = nextSnake.x += -dx;
    currentY = nextSnake.y;
  }
} 

const moveUp = () => {
  ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
  snake.drawSnake();
  apple.drawApple ();
  if(clickCount === null){
    currentX = snake.x;
    currentY = snake.y += -dy;
  }else{
    currentX = nextSnake.x;
    currentY = nextSnake.y += -dy;
  }
}

const moveDown = () => {
  ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
  snake.drawSnake();
  apple.drawApple();
  if(clickCount === null){
    currentX = snake.x;
    currentY = snake.y += dy;
  }else{
    currentX = nextSnake.x;
    currentY = nextSnake.y += dy;
  }  
}

const moveSnake = (e) => {
  if(e.keyCode === 39){
    rightPressed = true
    const rightInt = setInterval(() => {
      moveRight()
      gameOverIfSnakeHitsTheWall(rightInt);
      if(upPressed === true || leftPressed === true || downPressed === true){
      clearInterval(rightInt);
      rightPressed = false;
      }
    },150);
  }else if(e.keyCode === 37){
    leftPressed = true
    const leftInt = setInterval(() => {
      moveLeft()
      gameOverIfSnakeHitsTheWall(leftInt);
      if(rightPressed === true || upPressed === true || downPressed === true){
      clearInterval(leftInt);
      leftPressed = false;
      }
    },150)
  }else if(e.keyCode === 38){
    upPressed = true
    const upInt = setInterval(() => {
      moveUp()
      gameOverIfSnakeHitsTheWall(upInt);
      if(rightPressed === true || leftPressed === true || downPressed === true){
      clearInterval(upInt);
      upPressed = false;
      }
    },150);
  }else if(e.keyCode === 40){
    downPressed = true
    const downInt = setInterval(() => {
      moveDown()
      gameOverIfSnakeHitsTheWall(downInt);
      if(rightPressed === true || leftPressed === true || upPressed === true){
      clearInterval(downInt);
      downPressed = false;
      }
    },150);
  }
}

document.addEventListener('keydown', moveSnake);

  
const snakeEatsTheApple = () => {
  if(snake.radius === apple.radius){
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
  }
}










