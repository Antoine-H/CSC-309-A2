(function() {
	var canvas;
	var context;
	var WIDTH; //Canvas width
	var HEIGHT; //Canvas height

	var posX; //X position of ball
	var posY; //Y position of ball
	var rec_WIDTH = 10; //Width of ball
	var rec_HEIGHT = 10; //Height of ball
	var dx = 1; //X speed of ball
	var dy = 2; //Y speed of ball
	
	var paddleX; //X position of paddle
	var paddleY; //Y position of paddle
	var paddleH = 10; //Height of paddle
	var paddleW = 100; //Width of paddle
	
	var rightDown = false; //Paddle moving right
	var leftDown = false; //Paddle moving left

	var intervalID; //ID value returned by setInterval

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
		
		intervalID = setInterval(draw, 15);
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
	
	function onKeyDown(event) {//Keyboard Handler
		if (event.keyCode == 39) {
			rightDown = true;
		} else if (event.keyCode == 37) {
			leftDown = true;
		}
	}
	
	function onKeyUp(event) {//Keyboard handler
		if (event.keyCode == 39) {
			rightDown = false;
		} else if (event.keyCode == 37) {
			leftDown = false;
		}
	}
	
	function draw() {
		clear();
		rect(posX, posY, rec_WIDTH, rec_HEIGHT); //Draw ball
		
		if (rightDown) {//Move right
			if (paddleX+paddleW < WIDTH+paddleW) {//Prevents the paddle from moving too far
				paddleX += 5;
			}
		} else if (leftDown) {
			if (paddleX+paddleW > 0) {
				paddleX -=5;
			}
		}
		rect(paddleX, paddleY, paddleW, paddleH); //Draw paddle
		
		if ((posX + dx) > (WIDTH-10) || (posX + dx) < 0) {
			dx = -dx;
		}
		if ((posY + dy) < 0) {
			dy = -dy;
		} else if ((posY + dy) > HEIGHT-paddleH-10) {//Could collide with the paddle
			if (posX > paddleX && posX < (paddleX + paddleW)) {//Collision with the paddle
				dy = -dy;
			} else {//paddle wasnt here
				if ((posY + dy) < (HEIGHT-5)) { //We know the game os over at this point. This lets the animation runs untill the bottom bar
					posX += dx;
					posY += dy;
				} else { //Game over
					clearInterval(intervalID);
				}
			}
		}
		
		posX += dx;
		posY += dy;
	}
	
})();
