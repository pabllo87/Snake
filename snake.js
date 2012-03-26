function checkSupported(){
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        //The current position of Snake's head, as xy coordinates
        this.currentPosition = {'x':50, 'y':50};
        //Sets the grid dimensions as one value
        this.gridSize = 10;
        start();        
    } else {
        alert ("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
}

function start(){
    //This sets the fill color to red
    ctx.fillStyle = "rgb(200,0,0)";
    
    //This sets some variables for demonstration purposes
    var x = 50;
    var y = 50;
    var width = 10;
    var height = 10;
    
    // This draws a squere with the parameters from the variables set above
    ctx.fillRect(x, y, width, height);
}

document.onkeydown = function(event) {
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
            //set new position, and draw squere at that position.
            currentPosition['x'] = currentPosition['x'] - gridSize;
            ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
            break;
    
        //up
        case 38:
            //action when pressing up key
            currentPosition['y'] = currentPosition['y'] - gridSize;
            ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
            break;
    
        //right
        case 39:
            //action when pressing right key
            currentPosition['x'] = currentPosition['x'] + gridSize;
            ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
            break;
    
        //down
        case 40:
            //action when pressing down key
            currentPosition['y'] = currentPosition['y'] + gridSize;
            ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
            break;
        
        default:
            break;
    }
}