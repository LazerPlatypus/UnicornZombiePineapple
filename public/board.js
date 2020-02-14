var BOARD_CANVAS_CONTEXT = null;
var zombies = [];

drawBoard();

function drawBoard() {
    var canvas = document.getElementById('gameCanvas');
    if (canvas.getContext) {
        BOARD_CANVAS_CONTEXT = canvas.getContext('2d');
    }
    var ctx = BOARD_CANVAS_CONTEXT;
    var img = new Image;
    img.src = "/boardBackground.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

}

function clearBoard() {
    var ctx = document.getElementById('gameCanvas').getContext('2d')
    var canvas = document.getElementById('gameCanvas');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function updateBoard() {
    clearBoard();
    drawBoard();

    zombies.forEach(updatingZombies);

}

function updatingZombies(item) {
    item.draw();
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
        img.onload = function() {
            ctx.drawImage(img, xPos, yPos, zombieW, zombieH);
        }
    }

}

zombies.push(new Zombie(50, 50));
