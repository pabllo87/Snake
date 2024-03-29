function checkSupported(){
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        start();        
    } else {
        alert ("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
}

function start(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //The current position of Snake's head, as xy coordinates
    currentPosition = {'x':50, 'y':50};
    //Sets the grid dimensions as one value
    gridSize = 10;
    snakeBody = [];
    snakeLength = 3;    
    updateScore();
    makeFoodItem();
    drawSnake();   
    
    
    direction = 'right';
    play();
    
}

//This is function to draw squere on current position
function drawSnake(){
    if (snakeBody.some(hasEatenItself)){
        gameOver();
        return false;
    }
    
    snakeBody.push([currentPosition['x'], currentPosition['y']]);
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
    
    if (snakeBody.length > snakeLength){
        var itemToRemove = snakeBody.shift();
        ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
    }
    
    if (currentPosition['x'] == suggestedPoint[0] && currentPosition['y'] == suggestedPoint[1]){
        makeFoodItem();
        snakeLength += 1;
        updateScore();
    }
}

function hasEatenItself(element, index, array){
    return (element[0] == currentPosition['x'] && element[1] == currentPosition['y']);
}

function pause(){
    clearInterval(interval);
    allowPressKey = false;
}

function play(){
    interval = setInterval(moveSnake, 100);
    allowPressKey = true;
}

function restart(){
    pause();
    start();
}

function gameOver(){
    var score = (snakeLength - 3)*10;
    pause();
    alert("Game Over, Your score was "+ score);
    ctx.clearRect(0,0,canvas.width, canvas,height);
    document.getElementById('play_menu').style.display='none';
    document.getElementById('restart_menu').style.display='block';
}

function updateScore(){
    var score = (snakeLength - 3)*10
    document.getElementById('score').innerText = score;
}

function wichWayToGo(axisType){
    if (axisType == 'x'){
        a = (currentPosition['x'] > canvas.width / 2) ? moveLeft() : moveRight();
    } else {
        a = (currentPosition['y'] > canvas.height / 2) ? moveUp() : moveDown();
    }
}
//Function make a food for snake
function makeFoodItem(){
    suggestedPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
    if (snakeBody.some(hasPoint)){
        makeFoodItem();
    } else {
        ctx.fillStyle = "rgb(10,100,0)";
        ctx.fillRect(suggestedPoint[0], suggestedPoint[1], gridSize, gridSize);
    }
}

function hasPoint(element, index, array){
    return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
}

//Position function
function leftPosition(){
    return currentPosition['x'] - gridSize;
}

function rightPosition(){
    return currentPosition['x'] + gridSize;
}

function upPosition(){
    return currentPosition['y'] - gridSize;
}

function downPosition(){
    return currentPosition['y'] + gridSize;
}
//Move function
function moveUp(){
    if (upPosition() >= 0){
        executeMove('up', 'y', upPosition());
    } else {
        wichWayToGo('x');
    }
}

function moveDown(){
    if (downPosition() < canvas.height){
        executeMove('down', 'y', downPosition());
    }  else {
        wichWayToGo('x');
    }
}

function moveLeft(){
    if (leftPosition() >= 0){
        executeMove('left', 'x', leftPosition());
    }  else {
        wichWayToGo('y');
    }
}

function moveRight(){
    if (rightPosition() < canvas.width){
        executeMove('right', 'x', rightPosition());
    }  else {
        wichWayToGo('y');
    }
}

function executeMove(dirValue, axisType, axisValue){
    direction = dirValue;
    currentPosition[axisType] = axisValue;
    drawSnake();
}

document.onkeydown = function(event) {
    if (!allowPressKey){
        return null;
    }
    var keyCode;
    
    if(event == null)
    {
        keyCode = window.event.keyCode;
    }
    else
    {
        keyCode = event.keyCode;
    }
    
    switch(keyCode)
    {
        //left
        case 37:
            //action when pressing left key
            //call function to move left
            //do not turn around
            if (direction != "right"){
                moveLeft();    
            }
            break;
    
        //up
        case 38:
            //action when pressing up key
            if (direction != "down"){
                moveUp();
            }
            break;
    
        //right
        case 39:
            //action when pressing right key
            if (direction != "left"){
                moveRight();
            }
            break;
    
        //down
        case 40:
            //action when pressing down key
            if (direction != "up"){
                moveDown();
            }
            break;
        
        default:
            break;
    }
}
//this is move snake in loop
function moveSnake(){
    switch(direction){
        case 'up':
            moveUp();
            break;
        case 'down':
            moveDown();
            break;
        case 'left':
            moveLeft();
            break;
        case 'right':
            moveRight();
            break;
    }
}