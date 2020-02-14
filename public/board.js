var BOARD_CANVAS_CONTEXT = null;
drawBoard();

function drawBoard() { 
    var canvas = document.getElementById('gameCanvas');
	if (canvas.getContext) { 
		BOARD_CANVAS_CONTEXT = canvas.getContext('2d');
	}
    var ctx = BOARD_CANVAS_CONTEXT;
    var img = new Image;
    img.src = "/boardBackground.png";
    img.onload = function() {
        ctx.drawImage(img,0,0,canvas.width, canvas.height);
    }
}

