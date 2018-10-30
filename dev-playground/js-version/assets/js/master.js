// set the score
let scoreOption = getParameterByName('score');
document.querySelector('#sb--win-score').textContent = scoreOption;
// Get the score to play to
const playingTo = document.querySelector('#sb--win-score').innerHTML;
// Update score in overtime
const overtimeUpdate = document.querySelector('#sb--win-score');
// Convert the score to an integer
const maxScore = Math.trunc(playingTo);
// Left side
const leftHalf = document.querySelector('#sb--left');
const leftScore = document.querySelector('#sb--left .score');
// Right side
const rightHalf = document.querySelector('#sb--right');
const rightScore = document.querySelector('#sb--right .score');

/** Class representing a team. */
class PingPongTeam{
	/**
 * Create a team.
 * @param {number} startScore - The initial start score.
 * @param {string} startContainer - The container for the side.
 * @param {string} scoreOutput - The container for the score.
 */
	constructor( startScore, scoreContainer, scoreOutput ){
		this.score = startScore;
		this.container = scoreContainer;
		this.display = scoreOutput;
	}
	/**
 * Increase the score.
 */
	increaseScore(){
		if(this.container.classList.contains('winner')){
			return;
		}else{
			this.score++;
			this.display.textContent = this.score;
			winnerCheck();
		}
	}
	/**
 * Decrease the score.
 */
	decreaseScore(){
		if(this.score > 0){
			this.score--;
			this.display.textContent = this.score;
			winnerCheck();
		}
	}
}

const left = new PingPongTeam( 0, leftHalf, leftScore );
const right = new PingPongTeam( 0, rightHalf, rightScore );

function winnerCheck(){
	overtimeCheck();
	if (left.score >= maxScore && left.score >= (right.score + 2)){
		leftHalf.classList.add('winner');
	}else if (right.score >= maxScore && right.score >= (left.score + 2)){
		rightHalf.classList.add('winner');
	}else{
		leftHalf.classList.remove('winner');
		rightHalf.classList.remove('winner');
	}
}

function overtimeCheck(){
	if ((left.score >= maxScore - 1 || right.score >= maxScore - 1) && left.score === right.score) {
		overtimeUpdate.textContent = right.score + 2;
	}else if (left.score >= maxScore - 1 || right.score >= maxScore - 1) {
		if ((left.score === right.score + 1) || (right.score === left.score + 1)) {
			overtimeUpdate.textContent = Math.max(left.score, right.score) + 1;
		}else if (left.score === right.score + 2 || right.score === left.score + 2){
			if (left.score < maxScore - 1 || right.score < maxScore - 1) {
				overtimeUpdate.textContent = maxScore;
			}else{
				overtimeUpdate.textContent = Math.max(left.score, right.score)
			}
		}
	}
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function reset(){
	window.location.href = 'index.html';
}

// Key press events for testing
window.addEventListener("keydown", function(event){
  if (event.preventDefaulted){
    return; // Do nothing if event already handled
  }
  switch(event.code) {
  	case "Digit1":
      left.increaseScore();
      break;
  	case "Digit4":
      right.increaseScore();
     break;
    case "Digit2":
      left.decreaseScore();
      break;
  	case "Digit5":
      right.decreaseScore();
     	break;
		case "Digit0":
    	reset();
      break;
  }
});
