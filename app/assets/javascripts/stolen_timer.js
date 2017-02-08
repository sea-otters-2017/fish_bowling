function jsTimer(seconds) {
  updateTime();

  function display(){
    seconds--;
    if (timerIsDone()) {
      clearInterval(timer);
      return
    };
    updateTime();
  }

  function updateTime() {
    doubleDigitSeconds();
    console.log(`00 : ${seconds}`)
  }

  function doubleDigitSeconds() {
    seconds = seconds < '10' ? "0" + seconds : seconds
  }

  function timerIsDone() {
    return seconds < "00";
  }

  var timer = setInterval(display, 1000);
}
