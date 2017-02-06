
function countdown(time) {
  var minutes = time['minutes'] || 0
  var seconds = time['seconds'] || 0

  function tick() {
    var timer_target = document.getElementById('timer')

    if (seconds === 0) {
      minutes--
      if (minutes >= 0) {
        seconds = 60
      }
    }

    seconds--

    $(timer_target).html(String(minutes) + ':' + (seconds < 10 ? '0' : '') + String(seconds))

    if (seconds > 0) {
      setTimeout(tick, 1000)
    } else if(minutes > 0) {
      countdown({ minutes: minutes })
    } else {
      alert("Time's Up!")
      $(timer).html('')
    }
  }
  tick();
}
