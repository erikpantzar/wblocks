
var storedHiScore = localStorage.getItem('hiscore');

function setHightScore() {
	console.log('in func: ' + storedHiScore);
	
	if(!storedHiScore) {
		localStorage.setItem('hiscore', score);
		console.log('new record (there was none before)');
		printHighScore( score );
	}
	
	if ( score > storedHiScore ) {
		localStorage.setItem('hiscore', score);
		console.log('new record');
		printHighScore( score );
	} else {
		console.log('No record beat');
		printHighScore( storedHiScore );
	}		
	
}

function printHighScore( scored ) {
	$('.hiscore').html( scored );
}