var zombies = [];
var canvas;
var ctx;

menu();

function menu() {
    var option1 = {
        x: 150,
        y: 120,
        width: 190,
        height: 70
    };
    var option2 = {
        x: 150,
        y: 210,
        width: 190,
        height: 70
    };
    var option3 = {
        x: 150,
        y: 300,
        width: 190,
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

    //second option
    var fillStyleBtn = 'rgba(255,255,255,255)';
    ctx.beginPath();
    ctx.rect(150, 210, 390, 70);
    ctx.fillStyle = fillStyleBtn;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();

    //third option
    var fillStyleBtn = 'rgba(255,255,255,255)';
    ctx.beginPath();
    ctx.rect(150, 300, 390, 70);
    ctx.fillStyle = fillStyleBtn;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();

    //this is for the text
    ctx.font = "48px serif";
    ctx.textAlign = "center";
    ctx.fillStyle = '#000000';
    ctx.fillText("Menu", canvas.width / 2, 70);
    ctx.font = "38px serif";
    ctx.fillText("Play Solo Game", canvas.width / 2, 165);
    ctx.fillText("Start Multiplayer Game", canvas.width / 2, 255);
    ctx.fillText("Join Multiplayer Game", canvas.width / 2, 345);


    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    canvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        // debugger;
        if (isInside(mousePos, option1)) {
            clearCanvas();
            drawGameBoard();
        } else if (isInside(mousePos, option2)) {
            clearCanvas();
            drawGameBoard();
        } else if (isInside(mousePos, option3)) {
            alert('do something here to type in the code');
        } else {
            alert('clicked outside rect');
        }
    }, false);

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
    canvas.removeEventListener
}

function drawGameBoard() {
    var img = new Image;
    img.src = "/boardBackground.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function updateBoard() {
    clearCanvas();
    drawGameBoard();

    zombies.forEach(function (item) { item.draw() });

}

class Zombie {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.zombieHeight = 40;
        this.zombieWidth = 40;
    }

    draw() {
        var ctx = document.getElementById('gameCanvas').getContext('2d')
        var img = new Image;
        var xPos = this.x;
        var yPos = this.y;
        var zombieH = this.zombieHeight;
        var zombieW = this.zombieWidth;

        img.src = "/tempZombie.jpg";
        img.onload = function () {
            ctx.drawImage(img, xPos, yPos, zombieW, zombieH);
        }
    }
}