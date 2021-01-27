const gameDisplay = document.getElementById('game-display');
const ctx  = gameDisplay.getContext('2d');
const score = document.getElementById('score');


let appleX =  Math.floor((Math.random() * (450 - 20) + 1));
let appleY =  Math.floor((Math.random() * (250 -20) + 1));


let currentX = null;
let currentY = null;
let dx = 10;
let dy = 10;

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


const snake = {
   body: [ new Snake(50, 200, 10),
           new Snake(40, 200, 10)
         ],
   direction: null,

   copyPositions: [ new Snake(50, 200, 10),
                    new Snake(40, 200, 10)
                  ],
}

let headX = snake.body[0].x
let headY = snake.body[0].y
       
const apple = new Apple(appleX, appleY, 10, 'red');

window.onload = () => {
  createSnake();
  apple.drawApple();
}

const createSnake= () => {
   snake.body.forEach((piece) => {
     piece.drawSnake()
   })
  }
 
const createMovement = () => {
   ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height);
   createSnake();
   apple.drawApple();
}

const rightDirection = () => {
  rightPressed = true;
  clickCount === null ? (currentX = headX += dx) : (currentX += dx)
}

const leftDirection = () => {
  leftPressed = true;
  clickCount === null ? (currentX = headX += -dx) : (currentX += -dx)
}

const upDirection = () => {
  upPressed = true;
  clickCount === null ? (currentY = headY += dy) : (currentY += dy)
}

const downDirection = () => {
  downPressed = true;
  clickCount === null ? (currentY = headY += -dy) : (currentY += -dy)
}



const moveSnakeHead = (e) => {
    createMovement();
    //let direction = snake.direction;
    if(e.keyCode === 39){
      const rightInt = setInterval(() => {
        rightDirection()
        if(upPressed === true || downPressed === true){
        clearInterval(rightInt);
        rightPressed = false;
        }
      },100);
    }else if(e.keyCode === 37){
      const leftInt = setInterval(() => {
        leftDirection()
        if(upPressed === true || downPressed === true){
        clearInterval(leftInt);
        leftPressed = false;
        }
      },100)
      
    }else if(e.keyCode === 38){
      const upInt = setInterval(() => {
        upDirection()
        if(rightPressed === true || leftPressed === true){
        clearInterval(upInt);
        upPressed = false;
        }
      },100);
    }else if(e.keyCode === 40){
      const downInt = setInterval(() => {
        downDirection()
        if(rightPressed === true || leftPressed === true){
        clearInterval(downInt);
        downPressed = false;
        }
      },100); 
    }
  }

  

  



const moveSnakeHead = (e) => {
  setInterval(() => {
    directionSnakeHead();
    if(snake.direction === right){
      clickCount === null ? currentX = headX += dx : currentX += dx
    }else if(snake.direction === left){
      clickCount === null ? currentX = headX += -dx : currentX += -dx
    }else if(snake.direction === up){
      clickCount === null ? currentY = headY += dy : currentY += dY
    }else if(snake.direction === down){
      clickCount === null ? currentY = headY += -dy : currentY += -dY
    }
  }, 10)
  
}






const gameOverIfSnakeHitsTheWall = (interval) => {
 
 if(snakeArray[0][0].x + dx > gameDisplay.width || snakeArray[0][0].x + 
  dx < 0){
    clearInterval(interval);
    score.textContent = 'GAME OVER!'
     
  }
 if(snakeArray[0][0].y + dy > gameDisplay.height  || snakeArray[0][0].y + dy  < 0){
    clearInterval(interval);
    score.textContent = 'GAME OVER!'
  } 
}


document.addEventListener('keydown', moveSnakeHead);

  
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
}*/


const snakeGrows = () => {
  let x;
  let y;
  increaseACount();
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
    apple.x = Math.floor((Math.random() * (450 - 20) + 1));
    apple.y = Math.floor((Math.random() * (300 - 20) + 1));
  } 
}

const btn = document.getElementById('play-again-btn');

const playAgain = () => {
  document.location.reload(); 
  pointsCount = 0;
}

btn.addEventListener('click', playAgain);










