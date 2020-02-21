var zombies = [];
var walls = [];
var pineapples = [];
var unicorn;
var canvas;
var ctx;
var moveCounter = 0;
var numOfMovesUntilNewZombie = 10;
const types = {
    WALL : 1,
    PINEAPPLE : 2,
    UNICORN: 3,
    ZOMBIE: 4
}
var components = [];
var score = 0;
menu();

class Button{
    constructor(func, x, y, w, h, text){
        var obj = this;
        this.eventListener = canvas.addEventListener("click", function (e) {            // Handle Click on Canvas
            obj.clickEvent(e);
        });
        var fillStyleBtn = 'rgba(255,255,255,255)';
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = fillStyleBtn;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ctx.closePath();

        ctx.font = "48px serif";
        ctx.textAlign = "center";
        ctx.fillStyle = '#000000';
        ctx.fillText(Text, canvas.width / 2, y+45);
        ctx.font = "38px serif";
    
        ctx.fillText(text, canvas.width / 2, 165);
    }
}

function menu() {
    var option1 = {
        x: 150,
        y: 120,
        width: 390,
        height: 70
    };
    var option2 = {
        x: 150,
        y: 210,
        width: 390,
        height: 70
    };
    var option3 = {
        x: 150,
        y: 300,
        width: 390,
        height: 70
    };

    var BOARD_CANVAS_CONTEXT = null;
    var canvas = document.getElementById('gameCanvas');
    if (canvas.getContext) {
        BOARD_CANVAS_CONTEXT = canvas.getContext('2d');
    }
    var ctx = BOARD_CANVAS_CONTEXT;

    this.canvas = canvas;
    this.ctx = ctx;

    //background
    ctx.fillStyle = "rgba(225,225,225,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //first option
    var fillStyleBtn = 'rgba(255,255,255,255)';
    ctx.beginPath();
    ctx.rect(150, 120, 390, 70);
    ctx.fillStyle = fillStyleBtn;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();

    // //second option
    // var fillStyleBtn = 'rgba(255,255,255,255)';
    // ctx.beginPath();
    // ctx.rect(150, 210, 390, 70);
    // ctx.fillStyle = fillStyleBtn;
    // ctx.fill();
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = '#000000';
    // ctx.stroke();
    // ctx.closePath();

    // //third option
    // var fillStyleBtn = 'rgba(255,255,255,255)';
    // ctx.beginPath();
    // ctx.rect(150, 300, 390, 70);
    // ctx.fillStyle = fillStyleBtn;
    // ctx.fill();
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = '#000000';
    // ctx.stroke();
    // ctx.closePath();

    //this is for the text
    ctx.font = "48px serif";
    ctx.textAlign = "center";
    ctx.fillStyle = '#000000';
    ctx.fillText("Menu", canvas.width / 2, 70);
    ctx.font = "38px serif";

    ctx.fillText("Play Solo Game", canvas.width / 2, 165);
    //ctx.fillText("Start Multiplayer Game", canvas.width / 2, 255);
    //ctx.fillText("Join Multiplayer Game", canvas.width / 2, 345);


    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }



    canvas.addEventListener('click', 
    function (evt){
            var mousePos = getMousePos(canvas, evt);
            // debugger;
            if (isInside(mousePos, option1)) {
                clearCanvas();
                // score = 0;
                // zombies = [];
                // walls = [];
                // pineapples = [];
                drawGameBoard();
            } else if (isInside(mousePos, option2)) {
                //start multiplayer
                //clearCanvas();
                //drawGameBoard();
            } else if (isInside(mousePos, option3)) {
                //join multiplayer
                //muliplayer
            } else {
            }
        }
    , false);

    function isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    }
}

function clearCanvas() {
    if (canvas.getContext) {
        var BOARD_CANVAS_CONTEXT = canvas.getContext('2d');
        var ctx = BOARD_CANVAS_CONTEXT;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function drawGameBoard() {
    createWalls();
    drawWalls();
    createUnicorn();
    updateUnicorn();
    createPineapples();
    updatePinapples();
    createZombies();
    updateZombies();
}

function updateBoard() {
    clearCanvas();
    drawWalls();
    updateZombies();
    updateUnicorn();
    updatePinapples();
}

//this is for the walls and pineapples
function component(width, height, type, x, y){
    this.width = width;
    this.height = height;
    this.speedX = 50;
    this.speedY = 50;
    this.type = type;
    this.x = x;
    this.y = y;

    //update the component(do this every frame?)
    this.update = function() {
        var xPos = this.x;
        var yPos = this.y;
        var heightVal = this.height;
        var widthVal = this.width;

        if(this.type == types.WALL){
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }else if(this.type == types.ZOMBIE){
            var img = new Image;
            img.src = "/resources/Zombies/zombie-head.png";
            img.onload = function () {
                ctx.drawImage(img, xPos, yPos, widthVal, heightVal);
            }
        }else if(this.type == types.UNICORN){
            var img = new Image;
            img.src = "/resources/Unicorns/cute-unicorn-cropped.png";
            img.onload = function () {
                ctx.drawImage(img, xPos, yPos, widthVal, heightVal);
            }
        }else if(this.type == types.PINEAPPLE){
            var img = new Image;
            img.src = "/resources/pineapple.png";
            img.onload = function () {
                ctx.drawImage(img, xPos, yPos, widthVal, heightVal);
            }
        }else{
            throw err;
        }
    }

    this.moveRight = function() {
        this.x += this.speedX;
    }

    this.moveLeft = function() {
        this.x -= this.speedX;
    }

    this.moveUp = function() {
        this.y -= this.speedY;
    }

    this.moveDown = function() {
        this.y += this.speedY;
    }

    //this will let us know if it crashed with something else
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width-10);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height-10);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
            crash = false;
        }
        return crash;
   }
}

function createWalls(){

    //outer walls
    var c1 = new component(700,10,types.WALL,0,0);
    var c2 = new component(10,500,types.WALL,0,0);
    var c3 = new component(700,10,types.WALL,0,490);
    var c4 = new component(10,500,types.WALL,690,0);

    components = [c1, c2, c3, c4];
}

function drawWalls() {
    for(const comp of components){
        comp.update();
    }
}

function createZombies() {
    this.zombieHeight = 50;
    this.zombieWidth = 50;

    zombies.push(new component(this.zombieWidth, this.zombieHeight, types.ZOMBIE, 610, 220));
    zombies.push(new component(this.zombieWidth, this.zombieHeight, types.ZOMBIE, 10, 220));

}

function updateZombies() {
    zombies.forEach(function (item) { 
        var randNum = Math.floor(Math.random() * 3);

        
        if (item.crashWith(unicorn)) {
            // The game should end here but I can't figure out a way to end it
            // clearCanvas();
            // menu();

            // return;
        }
        
        if (randNum == 0) {
            randNum = Math.floor(Math.random() * 4);

            switch (randNum) {
                default:
                case 0:
                    item.moveDown();
                    break;
                case 1:
                    item.moveLeft();
                    break;
                case 2:
                    item.moveRight();
                    break;
                case 3:
                    item.moveUp();
                    break;
            }
        } else {
            if (unicorn.x > item.x) {
                item.moveRight()
            } else if (item.x > unicorn.x) {
                item.moveLeft()
            } else if (unicorn.y > item.y) {
                item.moveDown()
            } else if (item.y > unicorn.y) {
                item.moveUp();
            }
        }

        item.update();
    });
}

function createUnicorn() {
    unicorn = new component(50, 50, types.UNICORN, 310, 220)
}

function updateUnicorn() {
    unicorn.update()
}

function createPineapples(){
    pineapples.push(new component(40, 40, types.PINEAPPLE, 10, 10));
    pineapples.push(new component(40, 40, types.PINEAPPLE, 10, 60));
}

function updatePinapples(){
    for(var i = 0 ; i < pineapples.length; i ++){
        if(pineapples[i].crashWith(unicorn)){
            score ++;
            var scoreLabel = document.getElementById('score');
            scoreLabel.innerHTML= "Score: " + score;
            pineapples.splice(i, 1);
        }
        else{
            pineapples[i].update();
        }
    }
}



function moveLeftClicked() {
    unicorn.moveLeft()

    moveCounter += 1;
    if (moveCounter % numOfMovesUntilNewZombie == 0) {
        zombies.push(new component(this.zombieWidth, this.zombieHeight, types.ZOMBIE, 10, 220));
    }

    updateBoard()
}

function moveUpClicked() {
    unicorn.moveUp()

    moveCounter += 1;
    if (moveCounter % numOfMovesUntilNewZombie == 0) {
        zombies.push(new component(this.zombieWidth, this.zombieHeight, types.ZOMBIE, 10, 220));
    }

    updateBoard()
}

function moveRightClicked() {
    unicorn.moveRight()

    moveCounter += 1;
    if (moveCounter % numOfMovesUntilNewZombie == 0) {
        zombies.push(new component(this.zombieWidth, this.zombieHeight, types.ZOMBIE, 10, 220));
    }

    updateBoard()
}

function moveDownClicked() {
    unicorn.moveDown()

    moveCounter += 1;
    if (moveCounter % numOfMovesUntilNewZombie == 0) {
        zombies.push(new component(this.zombieWidth, this.zombieHeight, types.ZOMBIE, 10, 220));
    }

    updateBoard()
}
