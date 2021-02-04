const DEBUG = true;

const gameDisplay = document.getElementById('game-display');
const ctx  = gameDisplay.getContext('2d');
const score = document.getElementById('score');

let displayWidth = gameDisplay.width;
let displayHeight = gameDisplay.height;

let dx = 5;
let dy = 5;

let isRightPressed = false;
let isLeftPressed = false;
let isUpPressed = false;
let isDownPressed = false;
let pointsCount = null;
let isAppleEaten = false;
let isGameOver = false;
let currentX = null;
let currentY = null;
let currPositionsHead = [];

let rightClick = null;
let leftClick = null;
let upClick = null;
let downClick = null;
let timing = 100;

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


const getRandomAppleX = () => {
  let randomAppleX =  (Math.floor((Math.random() * (390 /10))) *10) + 10;
  if(randomAppleX === 0 || randomAppleX === 10 || randomAppleX === 390){
     randomAppleX = (Math.floor((Math.random() * (390 /10))) *10) + 10
  }
  return randomAppleX;
}

const getRandomAppleY = () => {
  let randomAppleY =  (Math.floor((Math.random() * (290 /10))) *10) + 10;
  if(randomAppleY === 0 || randomAppleY === 10 || randomAppleY === 290){
     randomAppleY = (Math.floor((Math.random() * (290 /10))) *10) + 10
  }
  return randomAppleY;
}


const apple = new Apple (getRandomAppleX(), getRandomAppleY(), 5);

const snake = {
  head: [new Snake(40, 140, 5)],
  
  body: [new Snake(30, 140, 5)],
  currentPositionHead: [],
  prevPositionHead: [],
  direction: null
}

let snakeHead = snake.head[0];
let snakeDirection = snake.direction;


const applePlacement = () => {
  for(let i = 0; i < snake.body.length; i++){
  if(apple.x === snakeHead.x || apple.x === snake.body[i].x && apple.y === snakeHead.y || apple.y === snake.body[i].y){
    apple.x = getRandomAppleX()
    apple.y = getRandomAppleY()
  }
 } 
}

applePlacement()


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
    snake.body.push(new Snake(snake.prevPositionHead[0], snake.prevPositionHead[1], 5))
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




const rightInterval = () => {
  const rightInt = setInterval(() => {  
    snakeMovement()
    right()
    gameOverIfSnakeHitsTheWallLeftRight(rightInt)
    gameOverIfSnakeHitsTheWallUpDown(rightInt)
    gameOverIfSnakeHitsHimself()
    snakeEatsTheApple()
    clearIntervalsRightLeft(rightInt)
    isRightPressed = false; 
  }, timing) 
}



const leftInterval = () => {
  const leftInt = setInterval(() => {     
    snakeMovement()
    left()
    gameOverIfSnakeHitsTheWallLeftRight(leftInt)
    gameOverIfSnakeHitsTheWallUpDown(leftInt)
    gameOverIfSnakeHitsHimself()
    snakeEatsTheApple()
    clearIntervalsRightLeft(leftInt)
    isLeftPressed = false;
 }, timing) 
}



const upInterval = () => {
  const upInt = setInterval(() => {
    snakeMovement()
    up()
    gameOverIfSnakeHitsTheWallLeftRight(upInt)
    gameOverIfSnakeHitsTheWallUpDown(upInt)
    gameOverIfSnakeHitsHimself()
    snakeEatsTheApple()
    clearIntervalsUpDown(upInt)
    isUpPressed = false;
 }, timing) 
}



const downInterval = () => {
  const downInt = setInterval(() => {
    snakeMovement()
    down()
    gameOverIfSnakeHitsTheWallLeftRight(downInt)
    gameOverIfSnakeHitsTheWallUpDown(downInt)
    gameOverIfSnakeHitsHimself()
    snakeEatsTheApple()
    clearIntervalsUpDown(downInt)
    isDownPressed = false;
 }, timing) 
}



const moveSnakeRight = (e) => {
  if(isGameOver === false){
    if(e.keyCode === 39){
      rightClick++
      leftClick = 1;
      upClick = null;
      downClick = null; 
    moveRight()
  }
 }
}

const moveRight = () => {
  if(rightClick === 1){
    isRightPressed = true;
    rightInterval()
   }
}



const moveSnakeLeft = (e) => {
  if(isGameOver === false){
    if(e.keyCode === 37){
      leftClick++
      rightClick = 1;
      upClick = null;
      downClick = null;
     moveLeft()
    }
   }
  }

const moveLeft = () => {
  if(leftClick === 1){
    isLeftPressed = true;
    leftInterval()
  }
}


const moveSnakeUp = (e) => {
  if(isGameOver === false){
    if(e.keyCode === 38){
      upClick++
      downClick = 1;
      rightClick = null;
      leftClick = null;
     moveUp()
   }
 }
}

const moveUp = () => {
  if(upClick === 1){
    isUpPressed = true;
    upInterval()
  }
}


const moveSnakeDown = (e) => {
  if(isGameOver === false){
    if(e.keyCode === 40){
      downClick++
      upClick = 1;
      rightClick = null;
      leftClick = null;
    moveDown()
  }
 }
}

const moveDown = () => {
  if(downClick === 1){
    isDownPressed = true;
    downInterval()
  }
}

document.addEventListener('keydown', moveSnakeRight);
document.addEventListener('keydown', moveSnakeLeft);
document.addEventListener('keydown', moveSnakeUp);
document.addEventListener('keydown', moveSnakeDown);



const scoreTextContent = (message) => {
  score.textContent = message
}

const changeScoreTextContent = () => {
  scoreTextContent('GAME OVER!')
  isGameOver = true;
}


const gameOverIfSnakeHitsTheWallLeftRight = (interval) => {
  if(snakeHead.x + dx > displayWidth - (snakeHead.radius) || snakeHead.x + dx <  snakeHead.radius){
     clearInterval(interval);
     changeScoreTextContent();
  }
}

const gameOverIfSnakeHitsTheWallUpDown = (interval) => {
  if(snakeHead.y + dy > displayHeight - (snakeHead.radius)  || snakeHead.y + dy  <  snakeHead.radius){
     clearInterval(interval);
     changeScoreTextContent();
   } 
 }


const updatePoints = () => {
  pointsCount++
  isAppleEaten = true;
  scoreTextContent(`Score :  ${pointsCount}`) ;
}

if(DEBUG === true){
 dx = 10
 dy = 10
}


const getDistance = (x1, y1, x2, y2) => {
   let x = x2 - x1;
   let y = y2 - y1;
   let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
   return distance
}



const changeAppleCordinates = () => {
  apple.x = -30;
  apple.y = -30;
}



const snakeEatsTheApple = () => {
   if(getDistance(apple.x, apple.y, snakeHead.x, snakeHead.y) < (apple.radius + snakeHead.radius)){
    changeAppleCordinates()
    updatePoints()
    newApple()
   }
}



const gameOverIfSnakeHitsHimself = () => {
      for(let i = 0; i < snake.body.length; i++){
    if(getDistance( snake.body[i].x, snake.body[i].y, snakeHead.x, snakeHead.y) < (snake.body[i].radius + snakeHead.radius)){
      console.log('game over')
    //clearInterval(interval)
    //changeScoreTextContent();
   }
 }
}



const newPlacementForApple = () => {
  apple.x = getRandomAppleX();
  apple.y = getRandomAppleY();
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

