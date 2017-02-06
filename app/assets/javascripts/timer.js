function clear_message() {
  var alert_target = document.getElementById('alert-target')
  $(alert_target).html('')
}


function alert_message(message) {
  var alert_target = document.getElementById('alert-target')
  $(alert_target).html(message)
  setTimeout(clear_message, 5000)
}


function countdown(time, message) {
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
      $(timer).html('')
      if (message) {
        alert_message(message)
      }
    }
  }
  tick();
}
