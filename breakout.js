(function() {
	var canvas;
	var context;
	var WIDTH; //Canvas width
	var HEIGHT; //Canvas height
	
	var posX; //X position of ball
	var posY; //Y position of ball
	var rec_WIDTH = 15; //Width of ball
	var rec_HEIGHT = 15; //Height of ball
	var dx = 1; //X speed of ball
	var dy = 2; //Y speed of ball
	
	var paddleX; //X position of paddle
	var paddleY; //Y position of paddle
	var paddleH = 10; //Height of paddle
	var paddleW = 100; //Width of paddle
	var rightDown = false; //Paddle is moving right
	var leftDown = false; //Paddle is moving left
	
	var intervalID; //ID value returned by setInterval
	
	var bricks;
	var rows;
	var cols;
	var brickW;
	var brickH;
	var padding;
	
	var ballcolor = "#ff6357";
	var paddlecolor = "#ff6357";
	var background = "#000000";
	var rowcolor = ["#ff6357", "#ffb757", "#cd7500", "#dddd09", "#00b400", "#00a3da"];
	
	window.onload = init;
	
	function init() {
		$("#new_game").bind("click", game_init);
		$(document).keydown(onKeyDown);
		$(document).keyup(onKeyUp);
	}
	
	function game_init() {
		canvas = $("#canvas");
		context = canvas[0].getContext("2d");
		
		WIDTH = canvas.width();
		HEIGHT = canvas.height();
		
		posX = WIDTH * 0.4; //Initial X position
		posY = HEIGHT * 0.5; //Initial Y position
		
		paddleX = WIDTH / 2; //Initial X position of paddle
		paddleY = HEIGHT - paddleH; //Initial Y position of paddle
		
		bricks_init();
		
		intervalID = setInterval(draw, 10);
	}
	
	function bricks_init() {
		rows = 6;
		cols = 5;
		brickW = (WIDTH/cols) -1;
		brickH = (0.4*HEIGHT/rows);
		padding = 1;
		
		bricks = new Array(rows);
		for (var i=0; i<rows; i++) {
			bricks[i] = new Array(cols);
			for (var j=0; j<cols;j++) {
				bricks[i][j] = 1;
			}
		}
	}
	
	function rect(x, y, w, h) {
		context.beginPath();
		context.rect(x, y, w, h);
		context.closePath();
		context.fill();
	}
	
	function clear() {
		context.clearRect(0, 0, WIDTH, HEIGHT);
	}
	
	function onKeyDown(event) {
		if (event.keyCode == 39) {
			rightDown = true;
		} else if (event.keyCode == 37) {
			leftDown = true;
		}
	}

	function onKeyUp(event) {
		if (event.keyCode == 39) {
			rightDown = false;
		} else if (event.keyCode == 37) {
			leftDown = false;
		}
	}
	
	function draw() {
		clear();
		context.fillStyle = ballcolor;
		rect(posX, posY, rec_WIDTH, rec_HEIGHT); //Draw ball
		
		//Move the paddle left or right. Paddles cannot move too far left or right.
		if (rightDown && paddleX < WIDTH) {
			paddleX += 5;
		} else if (leftDown && paddleX > 0) {
			paddleX -= 5;
		}
		
		//Adjust paddle position to within borders.
		if (paddleX < 0){
			paddleX = 0;
		} else if (paddleX > WIDTH - paddleW) {
			paddleX = WIDTH - paddleW ;
		}
		
		context.fillStyle = paddlecolor;
		rect(paddleX, paddleY, paddleW, paddleH); //Draw paddle
		
		//Draw bricks
		for (var i=0; i<rows; i++) {
			context.fillStyle = rowcolor[i];
			for (var j=0; j<cols; j++) {
				if (bricks[i][j] == 1) {
					rect(j*(brickW+padding) + padding, i*(brickH + padding) + padding, brickW, brickH);
				}
			}
		}
		
		//Bricks collision
		var rowH = brickH + padding;
		var colW = brickW + padding;
		var row = Math.floor(posY/rowH);
		var col = Math.floor(posX/colW);
		
		if (posY < rows * rowH && row >= 0 && col >= 0 && bricks[row][col] == 1) {
			dy = -dy;
			bricks[row][col] = 0;
		}
		
		//Allows ball to bounce off walls and paddle.
		if (posX + dx > WIDTH-rec_WIDTH || posX + dx < 0){
			dx = -dx;
		}
		if (posY + dy < 0){
			dy = -dy;
		} else if (posY + dy > HEIGHT-paddleH-0.5*rec_WIDTH) {
			if (paddleX <= posX+paddleW && posX <= paddleX + paddleW){
				dx = 8 * ((posX-(paddleX+paddleW/2))/paddleW);
				dy = -dy;
			} else{
				clearInterval(intervalID);
				//Game over
			}
		}
		
		posX += dx;
		posY += dy;
		
		//Adjust ball position to within borders.
		if (posX > WIDTH){
			posX = WIDTH - (paddleW/2);
		} else if (posX < 0){
			posX = 0 + (paddleW/2);
		}
		
		if (posY > HEIGHT){
			posY = HEIGHT - (paddleH/2);
		} else if (posY < 0){
			posY = 0 + (paddleH/2);
		}
	}
})();
