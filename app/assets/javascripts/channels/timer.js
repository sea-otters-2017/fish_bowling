function jsTimer(gameName) {
  var endTimer = false;

  function displayTime(){
    if(timeUpdated()){
      $('#timer').removeClass('updated');
      return;
    } else {
      $('#timer p').text($('#timer p').text() - 1);
      if (timerIsDone()) {
        clearInterval(timer);
        goToNextTurn();
        return;
      };
    }
  }

  function timeUpdated(){
    $('#timer').hasClass('updated');
  }

  function timerIsDone() {
    return $('#timer p').text() <= 0;
  }

  function goToNextTurn() {
    $.post(`/games/${gameName}/next_turn`);
  }

  if(!endTimer){
    var timer = setInterval(displayTime, 1000);
  }
}
