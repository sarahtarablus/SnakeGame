const gameDisplay = document.getElementById('game-display');
const ctx  = gameDisplay.getContext('2d');
const score = document.getElementById('score');

let displayWidth = gameDisplay.width;
let displayHeight = gameDisplay.height;

let dx = 10;
let dy = 10;

let isRightPressed = false;
let isLeftPressed = false;
let isUpPressed = false;
let isDownPressed = false;
let pointsCount = null;
let isAppleEaten = false;
let isGameOver = false;
let currentX = null;
let currentY = null;
let direction = null;
let snakeNeedsToGrow = false


let currPositionsHead = [];
let currentPositionHead = null;

let randomAppleX =  (Math.floor((Math.random() * (390 /10))) *10) + 10;
let randomAppleY =  (Math.floor((Math.random() * (290 /10))) *10) + 10;


class Snake {
  constructor(x, y, radius){
   this.x = x;
   this.y = y;
   this.radius = radius;
  }
  drawSnake () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
}

class Apple {
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius; 
   
  }
  drawApple () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  } 
}

const apple = new Apple(randomAppleX, randomAppleY, 10);

const snake = {
  head: [new Snake(40, 150, 10)],
  
  body: [new Snake(30, 150, 10)],
  currentPositionHead: [],
  prevPositionHead: [],
  nextPrevPositions: [],
  direction: null
}
let snakeHead = snake.head[0];
let snakeDirection = snake.direction;

const createApple = () => {
  apple.drawApple();
}

const createSnakeHead = () => {
  snakeHead.drawSnake();
}

const createSnakeBody = () => {
  for(let i = 0; i < snake.body.length; i++){
  snake.body[i].drawSnake()
  }
  //console.log(snake.body.length)
}

window.onload = () => {
  createSnakeHead()
  createSnakeBody()
  createApple()
}


const updateCurrentPosition = () => {
  currPositionsHead.push([snakeHead.x, snakeHead.y])
  snake.currentPositionHead = currPositionsHead[currPositionsHead.length - 1]
  snake.prevPositionHead = currPositionsHead[currPositionsHead.length - 2];
 
  if(snake.prevPositionHead){
    snake.body.push(new Snake(snake.prevPositionHead[0], snake.prevPositionHead[1], 10))
    if(snake.body.length > (pointsCount + 1)){
      snake.body.shift()
    }
  }
}


const snakeMovement = () => {
  updateCurrentPosition(); 
  ctx.clearRect(0, 0, displayWidth, displayHeight);
  createSnakeHead()
  createSnakeBody()
  createApple()
}


const right = () => {
  currentX = snakeHead.x += dx;
  currentY = snakeHead.y 
}

const left = () => {
  currentX = snakeHead.x += -dx;
  currentY = snakeHead.y
}

const up = () => {
  currentX = snakeHead.x
  currentY = snakeHead.y += -dy 
}

const down = () => {
  currentX = snakeHead.x
  currentY = snakeHead.y += dy 
}

const clearIntervalsRightLeft = (interval) => {
  if(isUpPressed === true || isDownPressed === true){
    clearInterval(interval) 
 }
}

const clearIntervalsUpDown = (interval) => {
  if(isRightPressed === true || isLeftPressed === true){
    clearInterval(interval) 
 }
}
 
const moveSnake = (e) => {
  e.preventDefault()
  if(isGameOver === false){
  if(e.keyCode === 39){
    isRightPressed = true;
    const rightInt = setInterval(() => {
      snakeMovement()
      right()
      gameOverIfSnakeHitsTheWall(rightInt)
      //gameOverIfSnakeHitsHimself(rightInt)
      snakeEatsTheApple()
      clearIntervalsRightLeft(rightInt)
      isRightPressed = false;
   }, 100)  
  }else if(e.keyCode === 37){
    isLeftPressed = true;
    const leftInt = setInterval(() => {
      snakeMovement()
      left()
      gameOverIfSnakeHitsTheWall(leftInt)
      //gameOverIfSnakeHitsHimself(leftInt)
      snakeEatsTheApple()
      clearIntervalsRightLeft(leftInt)
      isLeftPressed = false;
   }, 100)  
  }else if(e.keyCode === 38){
    isUpPressed = true;
    const upInt = setInterval(() => {
      snakeMovement()
      up()
      gameOverIfSnakeHitsTheWall(upInt)
      //gameOverIfSnakeHitsHimself(upInt)
      snakeEatsTheApple()
      clearIntervalsUpDown(upInt)
      isUpPressed = false;
   }, 100)   
  }else if(e.keyCode === 40){
    isDownPressed = true;
    const downInt = setInterval(() => {
      snakeMovement()
      down()
      gameOverIfSnakeHitsTheWall(downInt)
      //gameOverIfSnakeHitsHimself(downInt)
      snakeEatsTheApple()
      clearIntervalsUpDown(downInt)
      isDownPressed = false;
   }, 100)   
  }
}
}



document.addEventListener('keydown', moveSnake);

const changeScoreTextContent = () => {
  score.textContent = 'GAME OVER!' 
  isGameOver = true;
}

const gameOverIfSnakeHitsTheWall = (interval) => {
  if(snakeHead.x + dx > (displayWidth - 5)+ snakeHead.radius || snakeHead.x + dx < (5 + snakeHead.radius)){
     clearInterval(interval);
     changeScoreTextContent();
  }
  if(snakeHead.y + dy > (displayHeight - 5) + snakeHead.radius  || snakeHead.y + dy  < (5 + snakeHead.radius)){
     clearInterval(interval);
     changeScoreTextContent();
   } 
 }

 const gameOverIfSnakeHitsHimself = (interval) => {
   for(let i = 1; i < snake.body.length; i++){
    let x = snakeHead.x - snake.body[i - 1].x
    let y = snakeHead.y - snake.body[i - 1].y
    let distance = Math.sqrt(x * x + y * y)

    if(distance < snakeHead.radius + (snake.body[i].radius/2)){
      clearInterval(interval);
      changeScoreTextContent();
    }
   }
  
 }

const updatePoints = () => {
  pointsCount++
  isAppleEaten = true;
  snakeNeedsToGrow = true;
  score.textContent = `Score :  ${pointsCount}`;
}

const snakeEatsTheApple = () => {
  let x = snakeHead.x - apple.x;
  let y = snakeHead.y - apple.y;
  let distance = Math.sqrt(x * x + y * y);
 
  if(distance < snakeHead.radius + (apple.radius/2)){
    apple.x = -30;
    apple.y = -30;
    updatePoints()
    newApple()
  } 
}

const newPlacementForApple = () => {
  apple.x = (Math.floor((Math.random() * (290 /10))) *10) + 10;
  apple.y = (Math.floor((Math.random() * (290 /10))) *10) + 10;
}

const newApple = () => {
  if(isAppleEaten === true){
    isAppleEaten = false;
    newPlacementForApple();
  } 
}

const btn = document.getElementById('play-again-btn');

const playAgain = () => {
  document.location.reload(); 
  pointsCount = 0;
}

btn.addEventListener('click', playAgain);

