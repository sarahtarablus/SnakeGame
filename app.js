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
let point = -2
let snakeNeedsToGrow = false


let currPositionsHead = [];
let previousPositions = [];

let nextPosition = []

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
  
  body: [new Snake(20, 150, 10)],
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
  snake.body.forEach((part) => {
    part.drawSnake();
  })
}

window.onload = () => {
  createSnakeHead()
  createSnakeBody()
  createApple()
}

/*const snakeGrows = (x, y) => {
  if(snakeNeedsToGrow === true){
    let part = snake.body.shift()
       snake.body.push(part);
    new Snake(x, y, 10)
  }
}*/



const updateCurrentPosition = () => {
  currPositionsHead.push([snakeHead.x, snakeHead.y])
  snake.currentPositionHead = currPositionsHead[currPositionsHead.length - 1]
  snake.prevPositionHead = currPositionsHead[currPositionsHead.length - 2];
  snake.nextPrevPosition = currPositionsHead[currPositionsHead.length + point];
  if(Array.isArray(snake.prevPositionHead) && Array.isArray(snake.nextPrevPosition) ){
    snake.body[0].x = snake.prevPositionHead[0]
    snake.body[0].y = snake.prevPositionHead[1]
    if(snakeNeedsToGrow === true){
      if(Array.isArray(snake.nextPrevPosition)){
          snake.body.push(new Snake(snake.nextPrevPosition[0], snake.nextPrevPosition[1], 10))
          if(snake.body.length > (pointsCount)){
            snake.body.shift()
       }
     }
    }
  }

  
  
   // for(let i = currPositionsHead.length - 3;i < currPositionsHead.length - 2 ; i++ ){
     //let positionX = currPositionsHead[currPositionsHead.length + point][1]
  //snake.nextPrevPosition = (currPositionsHead[currPositionsHead.length - 3])
   
     //}
    //}
     //console.log(currPositionsHead[currPositionsHead.length - 2] + 1)
     //if(pointsCount > 0){
       
      //  console.log(currPositionsHead[currPositionsHead.length - 2])
     // }
  
  //let positions = [currPositionsHead[currPositionsHead.length - 3]
  //currPositionsHead.filter(item => positions)
     
  //})
  
  //}
  //console.log('a', previousPositions)

  //snakeCopy.currentPositionHead = snake.prevPositionHead;
  //console.log( snake.currentPositionHead)
  
 
}



const snakeMovement = () => {
  ctx.clearRect(0, 0, displayWidth, displayHeight);
  createSnakeHead()
  createSnakeBody()
  createApple()
  updateCurrentPosition(); 
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


 
const moveSnake = (e) => {
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
  point--
  console.log(point)
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
    snakeNeedsToGrow = true
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

