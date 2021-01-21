const gameDisplay = document.getElementById('game-display');
const ctx  = gameDisplay.getContext('2d');
const score = document.getElementById('score');


let appleX =  Math.floor((Math.random() * (500 - 2) + 1));
let appleY =  Math.floor((Math.random() * (340 -2) + 1));


let currentX = null
let currentY = null;
let dx = 8;
let dy = -8;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let clickCount = null;
let appleEaten = false;
let pointsCount = 0;
let snakeNeedsToGrow = false;
let a = 20 


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
const attachSnake = new Snake(200, 120, 10, 10);


class Apple {
  constructor(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius; 
    this.color = color;
  }
  get apple() {
    return this.drawApple();
  }
  drawApple () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  } 
}

const apple = new Apple(appleX, appleY, 10, 'red');



window.onload = () => {
  snake.drawSnake();
  apple.drawApple();
}

const gameOverIfSnakeHitsTheWall = (interval) => {
 if(snake.x + dx > gameDisplay.width || snake.x + 
  dx < 0){
    clearInterval(interval);
     
  }
 if(snake.y + dy > gameDisplay.height  || snake.y +  dy < 0){
    clearInterval(interval);
    
  } 
}

const createMovement = () => {
   ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
   snake.drawSnake();
   apple.drawApple();
   //attachSnake();
}


const moveRight = () => {
  createMovement();
  if(clickCount === null){
    currentX = snake.x += dx;
    currentY = snake.y;  
  }else{
    currentX = nextSnake.x += dx;
    currentY = nextSnake.y;
  } 
}

const moveLeft = () => {
  createMovement();
  if(clickCount === null){
    currentX = snake.x += -dx;
    currentY = snake.y;
  }else{
    currentX = nextSnake.x += -dx;
    currentY = nextSnake.y;
  }
} 

const moveUp = () => {
  createMovement();
  if(clickCount === null){
    currentX = snake.x;
    currentY = snake.y += dy;
  }else{
    currentX = nextSnake.x;
    currentY = nextSnake.y += dy;
  }
}

const moveDown = () => {
  createMovement();
  if(clickCount === null){
    currentX = snake.x;
    currentY = snake.y += -dy;
  }else{
    currentX = nextSnake.x;
    currentY = nextSnake.y += -dy;
  }  
}

const moveSnake = (e) => {
  if(e.keyCode === 39){
    rightPressed = true
    const rightInt = setInterval(() => {
      moveRight()
      newApple()
      gameOverIfSnakeHitsTheWall(rightInt);
      snakeEatsTheApple()
     
      if(upPressed === true || downPressed === true){
      clearInterval(rightInt);
      rightPressed = false;
      }
    },100);
  }else if(e.keyCode === 37){
    leftPressed = true
    const leftInt = setInterval(() => {
      moveLeft()
      newApple()
      gameOverIfSnakeHitsTheWall(leftInt);
      snakeEatsTheApple()
      
      if(upPressed === true || downPressed === true){
      clearInterval(leftInt);
      leftPressed = false;
      }
    },100)
  }else if(e.keyCode === 38){
    upPressed = true
    const upInt = setInterval(() => {
      moveUp()
      newApple()
      gameOverIfSnakeHitsTheWall(upInt);
      snakeEatsTheApple()
    
      if(rightPressed === true || leftPressed === true){
      clearInterval(upInt);
      upPressed = false;
      }
    },100);
  }else if(e.keyCode === 40){
    downPressed = true
    const downInt = setInterval(() => {
      moveDown()
      newApple()
      gameOverIfSnakeHitsTheWall(downInt);
      snakeEatsTheApple()
      
      if(rightPressed === true || leftPressed === true){
      clearInterval(downInt);
      downPressed = false;
      }
    },100);
  }
}

document.addEventListener('keydown', moveSnake);

  
const snakeEatsTheApple = () => {
  let x = snake.x - apple.x;
  let y = snake.y - apple.y;
  let distance = Math.sqrt(x * x + y * y);
 
  if(distance < snake.radius + (apple.radius/2)){
    apple.x = -30;
    apple.y = -30;
    pointsCount++
    appleEaten = true;
    score.textContent = `Score :  ${pointsCount}`;
    snakeNeedsToGrow = true;
  } 
  snakeGrows()
}

const increaseACount = () => {
   if(pointsCount > 1){
     a = Number(20 * pointsCount)
   }
}


const snakeGrows = () => {
  let x;
  let y;
  
  if(snakeNeedsToGrow === true){
    if(rightPressed === true){
        x = currentX - a
        y = currentY
        new Snake(x, y, 10, 10).drawSnake()
    }else if(leftPressed === true){
        x = currentX + a
        y = currentY
        new Snake(x, y, 10, 10).drawSnake()
    }else if(upPressed === true){
        x = currentX 
        y = currentY + a
        new Snake(x, y, 10, 10).drawSnake()
    }else if(downPressed === true){
        x = currentX 
        y = currentY - a 
        new Snake(x, y, 10, 10).drawSnake()
    }
  }
}


const newApple = () => {
  if(appleEaten === true){
    appleEaten = false;
    apple.x = Math.floor((Math.random() * (500 - 1) + 1));
    apple.y = Math.floor((Math.random() * (340 - 1) + 1));
  } 
}

const btn = document.getElementById('play-again-btn');

const playAgain = () => {
  document.location.reload(); 
  pointsCount = 0;
}

btn.addEventListener('click', playAgain);










