(function() {
"use strict";

	var score = 0;
	var stepIndex = 0;
	var time = 0;
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
	
	var step = function () {
		return "<div class='step' data-index='" + stepIndex +  "'>" + stepOrdered() + "</div>";
	};
	
	
	var stepInit = function () {
		
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
		
		$('#game').prepend( step() );
		$('#game').prepend( step() );
		$('#game').prepend( step() );
		$('#game').prepend( step() );
	};

	var stepUp = function() {
		$('#game').prepend( step() );
		$('.step:last').remove();
		score++;
	};
	
	$('.game').on('click', function(el, i) {
		console.log( $(el)[0].target );
		
		
		if ( $(el)[0].target.classList.contains('correct')) {
			console.log('stepup');
			stepUp();
		} else {
			console.log('failed game');
		}
	});
	
	gameInit();
	
}());