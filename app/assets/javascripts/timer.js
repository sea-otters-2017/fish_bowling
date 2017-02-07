function Timer() {
  // this.minutes = time['minutes'] || 1
  // this.seconds = time['seconds'] || 0
  this.minutes = 1
  this.seconds = 0
}

Timer.prototype.countdown = function(message) {
  var seconds = this.seconds
  var minutes = this.minutes

  function tick() {
    var timer_target = document.getElementById('timer')

    if (seconds === 0) {
      minutes--
      if (minutes >= 0) {
        seconds = 60
      }
    }

    seconds--

    console.log('minutes', minutes)
    console.log('seconds', seconds)

    $(timer_target).html(String(minutes) + ':' + (seconds < 10 ? '0' : '') + String(seconds))

    if (seconds > 0) {
      setTimeout(this.countdown, 1000)
    } else if(minutes > 0) {
      countdown()
    } else {
      $(timer).html('')
      if (message) {
        alert_message(message)
      }
    }
  }
  tick()
}

Timer.prototype.clear_message = function() {
  var alert_target = document.getElementById('alert-target')
  $(alert_target).html('')
}


Timer.prototype.alert_message = function(message) {
  var alert_target = document.getElementById('alert-target')
  $(alert_target).html(message)
  setTimeout(clear_message, 5000)
}


// function countdown(time, message) {
  // var minutes = time['minutes'] || 0
  // var seconds = time['seconds'] || 0

  // function tick() {
  //   var timer_target = document.getElementById('timer')

  //   if (seconds === 0) {
  //     minutes--
  //     if (minutes >= 0) {
  //       seconds = 60
  //     }
  //   }

  //   seconds--

  //   $(timer_target).html(String(minutes) + ':' + (seconds < 10 ? '0' : '') + String(seconds))

  //   if (seconds > 0) {
  //     setTimeout(tick, 1000)
  //   } else if(minutes > 0) {
  //     countdown({ minutes: minutes })
  //   } else {
  //     $(timer).html('')
  //     if (message) {
  //       alert_message(message)
  //     }
  //   }
  // }
  // tick();
// }






