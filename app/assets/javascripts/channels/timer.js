var jsTimer = function(seconds) {
  this.interval;
  this.seconds = seconds;
  this.isPaused = false;
  this.gameName = '';
};

jsTimer.prototype.timerIsDone = function () {
  return this.seconds <= 0;
};

jsTimer.prototype.display = function(){
  if (!this.isPaused) {
    this.seconds--;
    if (this.timerIsDone()) {
      goToNextTurn(this.gameName);
      clearInterval(this.interval);
      this.interval = null;
      return;
    }
    this.updateTime();
  }
};

jsTimer.prototype.updateTime = function() {
  $("#timer").text(this.seconds);
  console.log('seconds', this.seconds)
};

jsTimer.prototype.startTimer = function(){
  this.isPaused = false;
  var that = this;
  if(!this.interval){
    this.interval = setInterval( function(){ that.display(); }, 1000);
  }
}

function createTimer(gameName){
  console.log('gameName', gameName);
  console.log('this', this);

  this.gameTimer || (this.gameTimer = new jsTimer(60));
  this.gameTimer.seconds = 5;
  this.gameTimer.isPaused = true;
  this.gameTimer.gameName = gameName;// ? gameName : "";
  this.gameTimer.startTimer();
};

function goToNextTurn(gameName) {
  console.log("POST TO /games/" + gameName + "/next_turn")
  $.ajax({
    url : "/games/" + gameName + "/next_turn",
    method : "POST"
  });
}
