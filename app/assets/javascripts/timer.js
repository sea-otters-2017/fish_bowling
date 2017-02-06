
function countdown(time) {
  var minutes = time['minutes'] || 0
  var seconds = time['seconds'] || 60

  function tick() {
    var timer = document.getElementById('timer')
    var current_minutes

    if (seconds === 0) {
      current_minutes = minutes - 1
      if (current_minutes >= 0) {
        seconds = 60
      }
    } else {
      current_minutes = minutes
    }

    seconds--
    $(timer).html(String(current_minutes) + ':' + (seconds < 10 ? '0' : '') + String(seconds))

    if (seconds > 0) {
      setTimeout(tick, 1000)
    } else if(minutes > 1) {
      countdown(minutes - 1)
    } else {
      alert("Time's Up!")
      $(timer).html('')
    }
  }
  tick();
}
