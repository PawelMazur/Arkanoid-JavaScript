var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score = 0;
var lives = 3;
var stage = 1;

var paddleWidth = 100;
var paddleHeight = 15;

var pressKeyRight = false;
var pressKeyLeft = false;

var paddleX = canvas.width / 2;
var paddleY = canvas.height - 50;

var ballX = canvas.width / 2;
var ballY = canvas.height - 100;

var ballRadius = 10;


var brickColumn = 4;
var brickRow = 10;

var brickWidth = 50;
var brickHeight = 20;

var offSetBrickLeft = 10;
var offSetBrickTop = 50;

var ballMoveX = 2;
var ballMoveY = 2;

var bricks = [];
for (var i = 0; i < brickRow; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickColumn; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}

var value1;
var value2;
var value3;


document.addEventListener("keydown", function keyDownListener(e) {
    if (e.keyCode == 39) {
        pressKeyRight = true;
        console.log("pressed Button Right  : " + paddleX);
    } else if (e.keyCode == 37) {
        pressKeyLeft = true;
        console.log("press Button Left: " + paddleX);
    }
}, false);

document.addEventListener("keyup", function keyUpListener(e) {
    if (e.keyCode == 39) {
        pressKeyRight = false;
    } else if (e.keyCode == 37) {
        pressKeyLeft = false;
    }
}, false);

document.addEventListener("touchstart", function keyTouchStart(e) {
    if (e.width < canvas.width / 2) {
        pressKeyLeft = true;
    } else if (e.width > canvas.width / 2) {
        pressKeyRight = true;
    }

}, false);

document.addEventListener("touchend", function keyTouchEnd(e) {
    pressKeyLeft = false;
    pressKeyRight = false;
}), false;

function drawMap() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPaddle();
    drawBall();
    //drawBrick();
    drawBricks();
    //drawBricksInTraingleRight();
    if (pressKeyRight && paddleX < canvas.width - paddleWidth) {
        paddleX += 2;
    }
    if (pressKeyLeft && paddleX > 0) {
        paddleX -= 2;
    }

    // if (ballY > canvas.height - ballRadius || ballY < ballRadius) {
    //     ballMoveY = -ballMoveY;
    // }
    if (ballY > canvas.height - ballRadius){
        lives--;
        //alert("You lives : " + lives);
        
    }

    if ( ballY < 0 + ballRadius) {
        ballMoveY = -ballMoveY;
    }

    if (ballX > canvas.width - ballRadius || ballX <  ballRadius) {
        ballMoveX = -ballMoveX;
    }

    if ((paddleX < ballX + ballRadius && ballX - ballRadius < paddleX + paddleWidth)
        && (paddleY < ballY + ballRadius && ballY - ballRadius < paddleY + paddleHeight)) {
        ballMoveY = -ballMoveY;
    }
    collisionBricks();
    
    nextStage();

    ballX += ballMoveX;
    ballY += ballMoveY;
    console.log("ballX : " + ballMoveY);
    drawLives();
    drawScore();
}

function drawBrick() {
    ctx.beginPath();
    ctx.rect(20, 20, 50, 20);
    ctx.fillStyle = "#00ff00";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0000ff";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let i = 0; i < brickRow; i++) {
        for (let j = 0; j < brickColumn; j++) {
            if (bricks[i][j].status == 1) {
                let brickX = (i * (brickWidth + offSetBrickLeft));
                let brickY = (j * (brickHeight + offSetBrickTop));
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#00ff00";
                ctx.fill();
                ctx.closePath();
            }
            value1++;
        }
    }
}

function drawBricksInTraingleLeft(){
    for (let i = 0; i < brickRow; i++) {
        for (let j = 0; j < brickColumn - i; j++) {
            if (bricks[i][j].status == 1) {
                let brickX = (i * (brickWidth + offSetBrickLeft));
                let brickY = (j * (brickHeight + offSetBrickTop));
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#00ff00";
                ctx.fill();
                ctx.closePath();
            }
            value2++;
        }
    }
}

function drawBricksInTraingleRight(){
    for (let i = 0; i < brickRow; i++) {
        for (let j = 0; j < brickColumn - i; j++) {
            if (bricks[i][j].status == 1) {
                let brickX = (canvas.width- brickWidth) - (i * (brickWidth + offSetBrickLeft));
                let brickY =  (j * (brickHeight + offSetBrickTop));
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#00ff00";
                ctx.fill();
                ctx.closePath();
            }
            value3++;
        }
    }
}


function nextStage(){
    if (stage == 1){
        drawBricks();
    } if(value1 == 0){
        stage = 2;
        drawBricksInTraingleLeft();
    } if (value2 == 0){
        stage = 3;
        drawBricksInTraingleRight();    
    } if (value3 == 0){
        alert("Finish Game");
    }
}



function collisionBricks() {
    for (let i = 0; i < brickRow; i++) {
        for (let j = 0; j < brickColumn; j++) {
            var collision = bricks[i][j];
            if (collision.status == 1) {
                if ((collision.x < ballX + ballRadius && ballX - ballRadius < collision.x + brickWidth)
                    && (collision.y < ballY + ballRadius && ballY - ballRadius < collision.y + brickHeight)) {
                    ballMoveY = -ballMoveY;
                    collision.status = 0;
                    score++;
                }

                if (stage == 1){
                    value1--;
                } if (stage == 2){
                    value2--;   
                } if (stage == 3){
                    value3--;
                }
            } 
        }
    }
}


function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle ="#000000";
    ctx.fillText("Lives : " + lives, canvas.width - 70, 20);
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score " + score, 8, 20);
}

setInterval(drawMap, 10);