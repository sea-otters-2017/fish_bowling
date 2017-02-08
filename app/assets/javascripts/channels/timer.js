var jsTimer = function(seconds) {
  this.interval;
  this.seconds = seconds;
  this.isPaused = false;
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

function createTimer(gameName = ''){
  this.gameTimer || (this.gameTimer = new jsTimer(60));
  this.gameTimer.seconds = 3;
  this.gameTimer.isPaused = true;
  this.gameTimer.gameName = gameName;
  this.gameTimer.startTimer();
};

function goToNextTurn(gameName) {
  $.ajax( {
    url : "/games/" + gameName + "/next_turn",
    method : "POST"
  }).done(console.log('I worked!'));
}

// (function() {
//   this.gameTimer || (this.gameTimer = new jsTimer(60));
//   this.gameTimer.seconds = 10;
//   this.gameTimer.isPaused = true;
//   this.gameTimer.startTimer();
// }).call(this);





// function JSTimer(gameName) {
//   this
//   function displayTime(){
//     if(timeUpdated()){
//       $('#timer').removeClass('updated');
//       return;
//     } else {
//       $('#timer p').text($('#timer p').text() - 1);
//       if (timerIsDone()) {
//         clearInterval(timer);
//         goToNextTurn();
//         return;
//       };
//     }
//   }
//
//   function timeUpdated(){
//     $('#timer').hasClass('updated');
//   }
//
//   function timerIsDone() {
//     return $('#timer p').text() <= 0;
//   }
//
//
//   if(!endTimer){
//     var timer = setInterval(displayTime, 1000);
//   }
// }
//
// jsTimer.prototype.resetTimer = function() {
//   if (this.seconds < 0) {
//     this.seconds = 59;
//   }
// };
