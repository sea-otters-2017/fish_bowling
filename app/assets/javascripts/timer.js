 $(document).ready(function() {

  function countdown(minutes, seconds) {
    var minutes = minutes || 1
    var seconds = seconds || 60

    function tick() {
      var timer_div = $('#timer')
      var current_minutes = minutes - 1
      seconds--
      timer_div.html(String(current_minutes) + ':' + (seconds < 10 ? '0' : '') + String(seconds))

      if (seconds > 0) {
        setTimeout(tick, 1000)
      } else if(minutes > 1) {
        countdown(minutes - 1)
      } else {
        alert("Time's up!")
      }
    }
    tick();
  }

  countdown(1)

  $('#start-game').on('click', function(event) {
    countdown(1)
  })
});

