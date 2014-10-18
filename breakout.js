(function() {
	var canvas;
	var context;
	var posX;
	var posY;
	var WIDTH;
	var HEIGHT;
	var rec_WIDTH = 10;
	var rec_HEIGHT = 10;
	var dx = 1;
	var dy = 2;
	
	window.onload = init;
	
	function init() {
		$("#new_game").bind("click", game_init);
	}
	
	function game_init() {
		canvas = $("#canvas");
		context = canvas[0].getContext("2d");
		
		WIDTH = canvas.width();
		HEIGHT = canvas.height();
		
		posX = WIDTH * 0.5; //Initial X position
		posY = HEIGHT * 0.5; //Initial Y position
		
		return setInterval(draw, 15);
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
	  	rect(posX, posY, rec_WIDTH, rec_HEIGHT);
	 
	  	if (posX + dx > WIDTH || posX + dx < 0)
	    		dx = -dx;
	  	if (posY + dy > HEIGHT || posY + dy < 0)
	    		dy = -dy;
	 
	  	posX += dx;
	  	posY += dy;
	}
})();
