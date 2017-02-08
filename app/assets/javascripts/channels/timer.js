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

function createTimer(gameState){
  this.gameTimer || (this.gameTimer = new jsTimer(60));
  this.gameTimer.seconds = 5;
  this.gameTimer.isPaused = true;
  this.gameTimer.gameName = gameState.game.name;// ? gameName : "";
  this.gameTimer.startTimer();
};

function goToNextTurn(gameState) {
  var userdata = $("#live[data-userid]").data()
  var user_id = !!userdata ? userdata.userid : null;
  var isCluegiver = (user_id === gameState.cluegiver.id);
  if (isCluegiver) {
    $.ajax({
      url : "/games/" + gameState.game.name + "/next_turn",
      method : "POST"
    });
  }
}
