var score = 0;
var stepIndex = document.querySelectorAll('.step').length;

var block = {
	default: function () {
		return "<div class='block'></div>";
	},

	correct: function () {
		return "<div class='block correct'></div>";
	},

	init: function() {
		return "<div class='block init'></div>";
	},
};

var step = function (stepIndex) {
	return "<div class='step' data-index='" + stepIndex +  "'>" + stepOrdered() + "</div>";
};


var stepOrdered = function() {
	// roll dice  ( 1-4)
	// if block index = dice roll, set to block.correct();
	var orderedBlocks = "";
	var dice = Math.floor( Math.random() * 4);

	var i = 0;
	while(i<4) {
		if(dice == i) {
			orderedBlocks += block.correct();
		} else {
			orderedBlocks += block.default();
		}
		i++;
	}		
	return orderedBlocks;
};


var gameInit = function() {
	stepIndex = 0;
	score = 0;
	time = 0;

	// reset steps
	// set init block
	// reset time & score

	$('#game').prepend( step(1) );
	$('#game').prepend( step(2) );
	$('#game').prepend( step(3) );
	
	// Startgame listener
	$('[data-index=1]').on('click', function() {
		startTimer();
	});
};


var diffScore = 0;
var scoreUpdate = function() {
	$('.scored').html(score);
	diffScore++;
	
	if( score % 50 === 0 ) { // add time every 50 score
		currentTime = currentTime + initTime;
		console.log('updateing time');
	}
};

var stepUp = function() {
	
	$('#game').prepend( step(score + 4) );
	$('.step:last').remove();
	
	score++;
	scoreUpdate();
};

var endGame = function() {
	console.log('game over: ' + score + '\nTime: ' + currentTime);
	startTimer(-2);
	window.setTimeout(function() {
		showEndGame();	
	},800);	
	
	setHightScore();
};

var showEndGame = function() {
	$('.failed').removeClass('hidden');
	
};

$('.game').on('click', function(el, i) {

	if ( $(el)[0].target.classList.contains('correct')) {
		stepUp();
		$($(el)[0].target).addClass('clicked');
	} else {
		console.log('failed game');
		$($(el)[0].target).addClass('clicked')
			.removeClass('correct');
		endGame();
	}
});

gameInit();