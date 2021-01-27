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


let displayX = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290];

let displayY = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290];

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
  body: [new Snake(displayX[4], displayY[15], 10),
         new Snake(displayX[3], displayX[15], 10)]
}
let snakeHead = snake.body[0];



const createApple = () => {
  apple.drawApple();
}

const createSnake = () => {
  snake.body.forEach((piece) => {
    piece.drawSnake();
  })
}

const createSnakeAndApple = () => {
  createSnake();
  createApple();
}

window.onload = () => {
  createSnakeAndApple();
}

const snakeMovement = () => {
  ctx.clearRect(0, 0, displayWidth, displayHeight);
  createSnakeAndApple();  
}

const right = () => {
  snakeHead.x += dx;
  snakeHead.y = snakeHead.y
  snake.body[1].x = snakeHead.x - 10
  snake.body[1].y = snakeHead.y
}

const left = () => {
  snakeHead.x += -dx;
  snakeHead.y = snakeHead.y
  snake.body[1].x = snakeHead.x + 10
  snake.body[1].y = snakeHead.y
}

const up = () => {
  snakeHead.x = snakeHead.x
  snakeHead.y += -dy 
  snake.body[1].x = snakeHead.x 
  snake.body[1].y = snakeHead.y - 10
}

const down = () => {
  snakeHead.x = snakeHead.x
  snakeHead.y += dy 
  snake.body[1].x = snakeHead.x 
  snake.body[1].y = snakeHead.y + 10
}
 
const moveSnake = (e) => {
  if(isGameOver === false){
  if(e.keyCode === 39){
    isRightPressed = true;
    const rightInt = setInterval(() => {
      snakeMovement()
      right()
      gameOverIfSnakeHitsTheWall(rightInt)
      snakeEatsTheApple()
    if(isUpPressed === true || isDownPressed === true){
      clearInterval(rightInt)
      isRightPressed = false;
    }
   }, 100)  
  }else if(e.keyCode === 37){
    isLeftPressed = true;
    const leftInt = setInterval(() => {
      snakeMovement()
      left()
      gameOverIfSnakeHitsTheWall(leftInt)
      snakeEatsTheApple()
    if(isUpPressed === true || isDownPressed === true){
      clearInterval(leftInt)
      isLeftPressed = false;
    }
   }, 100)  
  }else if(e.keyCode === 38){
    isUpPressed = true;
    const upInt = setInterval(() => {
      snakeMovement()
      up()
      gameOverIfSnakeHitsTheWall(upInt)
      snakeEatsTheApple()
    if(isRightPressed === true || isLeftPressed === true){
      clearInterval(upInt)
      isUpPressed = false;
    } 
   }, 100)   
  }else if(e.keyCode === 40){
    isDownPressed = true;
    const downInt = setInterval(() => {
      snakeMovement()
      down()
      gameOverIfSnakeHitsTheWall(downInt)
      snakeEatsTheApple()
    if(isRightPressed === true || isLeftPressed === true){
      clearInterval(downInt)
      isDownPressed = false;
    } 
   }, 100)   
  }
}
}

document.addEventListener('keydown', moveSnake);

const gameOverIfSnakeHitsTheWall = (interval) => {
  if(snakeHead.x + dx > (displayWidth - 5)+ snakeHead.radius || snakeHead.x + dx < (5 + snakeHead.radius)){
     clearInterval(interval);
     score.textContent = 'GAME OVER!' 
     isGameOver = true;
  }
  if(snakeHead.y + dy > (displayHeight - 5) + snakeHead.radius  || snakeHead.y + dy  < (5 + snakeHead.radius)){
     clearInterval(interval);
     score.textContent = 'GAME OVER!'
     isGameOver = true;
   } 
 }

 const updatePoints = () => {
  pointsCount++
  isAppleEaten = true;
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
    snakeNeedsToGrow = true;
  } 
  //snakeGrows()
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

const getPositionOfSnakeBodyLastPiece = () => {
  let x = snake.body[1].x
  let y = snake.body[1].y
  console.log(x , y)
}

getPositionOfSnakeBodyLastPiece()

/*const snakeGrows = () => {
  if(snakeNeedsToGrow = true){
    snake.body.push(new Snake(snakeHead.x - 20, sneakHead.y))
  }
}*/


const btn = document.getElementById('play-again-btn');

const playAgain = () => {
  document.location.reload(); 
  pointsCount = 0;
}

btn.addEventListener('click', playAgain);


