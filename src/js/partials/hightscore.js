
var storedHiScore = localStorage.getItem('hiscore');
console.log(storedHiScore);

function setHightScore() {
	console.log('in func: ' + storedHiScore);
	
	if(!storedHiScore) {
		localStorage.setItem('hiscore', score);
		console.log('new record (there was none before)');
	}
	
	if ( score > storedHiScore ) {
		localStorage.setItem('hiscore', score);
		console.log('new record');
	} else {
		console.log('No record beat');
	}		
	printHighScore();
}

function printHighScore() {
	$('.hiscore').html( storedHiScore );
}