const snakeBoard = document.querySelector(".board");
const snakeScoreBoard = document.getElementById("scoreBoard");
const snakeHiScoreBoard = document.getElementById("hiScoreBoard");
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let lastPaintTime = 0;
let speed = 5;
let inputDir = {x:0,y:0};
let snakeArr = [
    {x:13,y:15}
]
let food = {x:6,y:8};
let score = 0;
let highScoreVal =0;





//game loop
function mainFn(ctime){
    musicSound.play();
    window.requestAnimationFrame(mainFn);
    if(((ctime - lastPaintTime)/1000)<1/speed){
       return;
    }
    if(score >30){
        speed = 20;
    }
    else if(score>25){
        speed = 15;
    }
    else if(score>15){
        speed = 10;
    }
    else if(score > 8){
        speed = 7;
    }
    else{
        speed = 5;
    }


    lastPaintTime = ctime;
    gameFunction();
}
//
function isCollision(){
    for(let i =1; i<snakeArr.length ; i++){
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            return true;
        }
    }
    if(snakeArr[0].x === 18 || snakeArr[0].x === 0 || snakeArr[0].y === 0 || snakeArr[0].y === 18){
        return true;
    }
    return false;
}
function checkFoodOnSnake(){
    let foodIndex = snakeArr.find((el)=>{
       return (el.x === food.x && el.y === food.y) 
    })
    if(foodIndex === undefined){
        return false;
    }
    else{
        return true;
    }
}
function gameFunction(){
    //collision of snake
   if(isCollision()){
    gameOverSound.play();
    musicSound.pause();
    snakeArr = [
        {x:9,y:9}
    ]
    food = {x:5,y:9};
    inputDir = {x:0, y :0};
    score = 0;
    snakeScoreBoard.innerHTML = `Score: ${score}`
    alert("Game over press any key to continue");
    
   }
   //when snake eat food logic
   if(snakeArr[0].x===food.x && snakeArr[0].y === food.y){
    foodSound.play();
    snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y});
    food = {x : Math.round(2 + 14 * Math.random()),y : Math.round(2 + 14 * Math.random())};
    while(checkFoodOnSnake()){
        food = {x : Math.round(2 + 14 * Math.random()),y : Math.round(2 + 14 * Math.random())};
    }
    score++;
    snakeScoreBoard.innerHTML = `Score : ${score}`;
    if(highScoreVal<score){
      highScoreVal = score;
      localStorage.setItem("hiScore",JSON.stringify(highScoreVal)); 
      snakeHiScoreBoard.innerHTML = `High Score : ${highScoreVal}` ;
      
    }
   }
   //snake movement logic
   for(let i = snakeArr.length-2; i>=0 ; i--){
    snakeArr[i+1] = {...snakeArr[i]};
   }
   snakeArr[0] = {x : snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y};
   //displaying the game
   snakeBoard.innerHTML = "";
   snakeArr.forEach((el,index)=>{
    let snake = document.createElement('div');
   
      snake.style.gridRowStart = el.y;
      snake.style.gridColumnStart = el.x;
    if(index === 0){
        snake.classList.add('head');
    }
    else{
        snake.classList.add('snakeBody');
    }
    snakeBoard.appendChild(snake);
   })
   //displaying food
   let snakeFood = document.createElement('div');
   snakeFood.innerHTML = '<i class="fa-sharp fa-solid fa-apple-whole" style="font-size:35px;color : red"></i>'
   snakeFood.style.gridRowStart = food.y;
   snakeFood.style.gridColumnStart = food.x;
   
   snakeBoard.appendChild(snakeFood);
}
let highScore = JSON.parse(localStorage.getItem("hiScore"));
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("hiScore",JSON.stringify(highScoreVal));
}
else{
    highScoreVal = highScore;
    snakeHiScoreBoard.innerHTML = `High Score : ${highScoreVal}`
    
}

window.requestAnimationFrame(mainFn);
window.addEventListener("keydown", e=>{
      inputDir = {x:0,y:0};
      moveSound.play();
      switch(e.key){
        case 'ArrowUp':
            inputDir = {x:0, y:-1};
            break;
        case "ArrowDown" :
            inputDir = {x :0 , y : 1};
            break;
        case "ArrowLeft" :
            inputDir = {x : -1 , y : 0};
            break;
        case "ArrowRight" :
            inputDir = {x :1 , y : 0};
            break;  
        default :
            break;              
      }
})
