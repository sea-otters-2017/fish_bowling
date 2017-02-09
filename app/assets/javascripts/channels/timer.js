var jsTimer = function(seconds) {
  this.interval;
  this.seconds = seconds;
  this.isPaused = false;
  this.gameState = {};
};

jsTimer.prototype.timerIsDone = function () {
  return this.seconds <= 0;
};

jsTimer.prototype.display = function(){
  if (!this.isPaused) {
    this.seconds--;
    if (this.timerIsDone()) {
      goToNextTurn(this.gameState);
      clearInterval(this.interval);
      this.interval = null;
      return;
    }
    this.updateTime();
  }
};

jsTimer.prototype.updateTime = function() {
  $("#timer").text(this.seconds ? this.seconds : 'GO');
};

jsTimer.prototype.startTimer = function(){
  this.isPaused = false;
  var that = this;
  if(!this.interval){
    this.interval = setInterval( function(){ that.display(); }, 1000);
  }
}

function pauseTimer(gameData){
  this.gameTimer.isPaused = true;
  $("#timer").text(gameData.last_turn.seconds_remaining)
}


function createTimer(gameData, seconds){
  if(gameData.game.is_paused && this.gameTimer){ return this.gameTimer.isPaused = true; }
  this.gameTimer || (this.gameTimer = new jsTimer(60));
  this.gameTimer.seconds = seconds;
  this.gameTimer.isPaused = true;
  this.gameTimer.gameState = gameData;
  this.gameTimer.startTimer();
};
