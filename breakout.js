(function(){
  window.onload = init;
	
	var canvas;
	var context;

	var posX;
	var posY;
	var width;
	var height;
	var dx = 2;
	var dy = 4;

	function init() {
	    $("#new_game").bind("click", game_init);
	}
	 
	function game_init() {

	    canvas = $("#canvas");
	    context = canvas[0].getContext("2d");
	    width = canvas.width();
	    height = canvas.height();
	    posY = height * 0.5;
	    posX = width * 0.5;

	    return setInterval(draw, 100);
	}
	 
	function draw() {
	    context.clearRect(0, 0, height, width);
	    context.beginPath();
	    context.rect(posX, posY, 10, 10);
	    context.closePath();
	    context.fill();
	    posX += dx;
	    posY += dy;
	}
	
})();
