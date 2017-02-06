 $(document).ready(function() {

  function countdown(minutes) {
    var seconds = 60

    function tick() {
      var timer_div = document.getElementById('timer')
      var current_minutes = minutes - 1
      seconds--
      timer_div.innerHTML = current_minutes.toString() + ':' + (seconds < 10 ? '0' : '') + String(seconds - 1)
      // $(timer_div).html(String(current_minutes) + ':' + (seconds < 10 ? '0' : '') + String(seconds))

      if (seconds > 0) {
        setTimeout(tick, 1000)
      } else if(minutes > 1) {
        countdown(minutes - 1)
      } else {
        alert("Time's up!")
        // $(timer_div).html('')
      }
    }
    console.log('Calling tick')
    tick();
  }

      // countdown(1)

  $('#start-round').on('click', function(event) {
    event.preventDefault()
    alert("listening on start round")
    countdown(1)
    console.log('Countdown finished')
  })
});

