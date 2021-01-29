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

let currPositionHead = [];
//let prevPosition = null;
//let currPosition = null;



//let displayX = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290];

//let displayY = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290];

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
  body: [
         new Snake(30, 150, 10),
        ],
  currentPositionHead: [],
  prevPositionHead: [],
  direction: null
}
let snakeHead = snake.head[0];
let snakeDirection = snake.direction;



const createApple = () => {
  apple.drawApple();
}

const createSnakeHead = () => {
  snakeHead.drawSnake()
}

const createSnakeBody = () => {
  snake.body.forEach((piece) => {
    piece.drawSnake();
  })
}


window.onload = () => {
  createSnakeHead()
  createSnakeBody()
  createApple()
}

const updateCurrentPosition = () => {
  currPositionHead.push([snakeHead.x ,snakeHead.y])
  snake.currentPositionHead = currPositionHead[currPositionHead.length - 1];
  snake.prevPositionHead = currPositionHead[currPositionHead.length - 2];
  //console.log('curr' + snake.prevPositionHead)
}
updateCurrentPosition()
console.log('curr' + snake.prevPositionHead)


const snakeMovement = () => {
  ctx.clearRect(0, 0, displayWidth, displayHeight);
  createSnakeHead()
  createSnakeBody()
  createApple()
  updateCurrentPosition(); 
  //console.log('current' + currPosition)
  //console.log('prev' + prevPosition)
}
updateCurrentPosition()

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


 
const moveSnake = (e) => {
  console.log(snakeDirection)
  if(isGameOver === false){
  if(e.keyCode === 39){
    isRightPressed = true;
    snakeDirection = 'right';

    const rightInt = setInterval(() => {
      snakeMovement()
      right()
      gameOverIfSnakeHitsTheWall(rightInt)
      snakeEatsTheApple()
    if(snakeDirection === 'up' || snakeDirection === 'down'){
      clearInterval(rightInt)
      isRightPressed = false;
    }
   }, 100)  
  }else if(e.keyCode === 37){
    snakeDirection = 'left';
   
    isLeftPressed = true;
    const leftInt = setInterval(() => {
      snakeMovement()
      left()
      gameOverIfSnakeHitsTheWall(leftInt)
      snakeEatsTheApple()
    if(snakeDirection === 'up' || snakeDirection === 'down'){
      clearInterval(leftInt)
      isLeftPressed = false;
    }
   }, 100)  
  }else if(e.keyCode === 38){
    snakeDirection = 'up';
   
    isUpPressed = true;
    const upInt = setInterval(() => {
      snakeMovement()
      up()
      gameOverIfSnakeHitsTheWall(upInt)
      snakeEatsTheApple()
    if(snakeDirection === 'left' || snakeDirection === 'right'){
      clearInterval(upInt)
      isUpPressed = false;
    } 
   }, 100)   
  }else if(e.keyCode === 40){
    snakeDirection = 'down';
   
    isDownPressed = true;
    const downInt = setInterval(() => {
      snakeMovement()
      down()
      gameOverIfSnakeHitsTheWall(downInt)
      snakeEatsTheApple()
    if(snakeDirection === 'left' || snakeDirection === 'right'){
      clearInterval(downInt)
      isDownPressed = false;
    } 
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


