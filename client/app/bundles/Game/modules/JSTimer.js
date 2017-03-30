var JSTimer = function(seconds) {
  this.interval;
  this.seconds = seconds;
  this.isPaused = false;
  this.gameState = {};
};

JSTimer.prototype.timerIsDone = function () {
  return this.seconds <= 0;
};

JSTimer.prototype.display = function(){
  if (!this.isPaused) {
    this.seconds--;
    if (this.timerIsDone()) {
      // Go To Next Turn
      goToNextTurn(this.gameState);
      return;
    }
    this.updateTime();
  }
};

JSTimer.prototype.updateTime = function() {
  $("#timer").text(this.seconds ? '00:'+doubleDigitify(this.seconds) : 'GO');
};

JSTimer.prototype.startTimer = function(){
  this.isPaused = false;
  var that = this;
  if(!this.interval){
    this.interval = setInterval( function(){ that.display(); }, 1000);
  }
}

function pauseTimer(gameData){
  this.gameTimer.isPaused = true;
  $("#timer").text('00:'+doubleDigitify(gameData.last_turn.seconds_remaining))
}

function doubleDigitify(number) {
  return number < 10 ? "0" + parseInt(number, 10) : number;
}

module.exports = JSTimer;
