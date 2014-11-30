var initTime = 11000; // game time in ms
var counter = "";


function startTimer(time) {
	if(!time) {
		currentTime = 11000;
		counter = setInterval(timer, 100);
	} else if (time === -1) {
		clearInterval(counter);
		console.log('kill it with fire');
	} else if (time === -2) {
		clearInterval(counter);
		console.log('pause game timer');
	} else {
		currentTime = time;
		counter = setInterval(timer, 100);
	}	
}

function timer() {
	currentTime = currentTime - 100;
	
	$('.timed').html( currentTime );

	// if currentTime < 4
	// make blocks more red
	// else 
	// make darker
	
	if(currentTime <= 0) {
		console.log('game over');
		startTimer(-1);
		
		endGame();
	}
}

