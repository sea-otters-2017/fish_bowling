function jsTimer(seconds) {
  updateTime();

  function display(){
    seconds--;
    if (timerIsDone()) {
      clearInterval(timer);
      goToNextTurn();
      return
    };
    updateTime();
  }

  function updateTime() {
    doubleDigitSeconds();
    $('#timer').text(`00:${seconds}`)
  }

  function doubleDigitSeconds() {
    seconds = seconds < '10' ? "0" + seconds : seconds
  }

  function timerIsDone() {
    return seconds < "00";
  }

  var gameName = gameState.game.name;

  function goToNextTurn() {
    $.post(`/games/${gameName}/next_turn`)
  }

  var timer = setInterval(display, 1000);
}
