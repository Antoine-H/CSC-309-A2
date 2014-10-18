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

	var intervalID; //ID value returned by setInterval

	window.onload = init;
	
	function init() {
		$("#new_game").bind("click", game_init);
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
	
	function draw() {
		clear();
	  	rect(posX, posY, rec_WIDTH, rec_HEIGHT); //Draw ball
	 	rect(paddleX, paddleY, paddleW, paddleH); //Draw paddle

	  	if (posX + dx > WIDTH || posX + dx < 0)
	    		dx = -dx;
	  	if (posY + dy > HEIGHT || posY + dy < 0)
	    		dy = -dy;
	 
	  	posX += dx;
	  	posY += dy;
	}
})();
