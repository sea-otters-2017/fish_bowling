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
    $('#next-turn-button').click()
  }

  var timer = setInterval(display, 1000);
}
