$( document ).ready(function() {
  App.game = App.cable.subscriptions.create("GamesChannel", {
    connected: function() {
      // Called when the subscription is ready for use on the server
      console.log('Player connected')
      // this.perform('speak', { message: 'Hello world' })
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
      console.log('Player disconnected')
    },

    received: function(message) {
      // Called when there's incoming data on the websocket for this channel
      alert(message['message'])
      console.log(message['message'])
      $('body').append(message['message'])
    },

    speak: function(message) {
      this.perform('speak', { message: message })
    }
  });

  $('#new_game').on('submit', function(event) {
    event.preventDefault()
    alert('Listening on new game')
    var name = $('#new_game').serialize()
    $.ajax({
      url: '/games',
      method: 'POST',
      data: {game: {name: name} }
    })
  })
});

