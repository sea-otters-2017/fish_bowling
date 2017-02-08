// subscription = App.game
// consumer = subscription.consumer
// connection = consumer.connection
// connection.subscriptions

// On click for start new or join
// var gameName = event.target.value()
function createSubscription(name) {
  App.cable.subscriptions.create({channel: 'GamesChannel', name: name}, {
    connected: function() {
      // Called when the subscription is ready for use on the server
      console.log('Player connected')
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
      console.log('Player disconnected')
    },

    received: function(data) {
      switch(data['action']) {
        case 'updateGame':
          renderGamePage(data.gameState);
          break;
        case 'updateLive':
          renderMain(data['response']);
          break;
        case 'newPlayer':
          appendNewPlayer(data['player'])
          break;
        case 'showTeams':
          renderMain(data['response'])
          break;
        case 'updateGameDisplay':
          updateGameDisplay(data)
          break;
      }
    },

    setGameName: function(gameName) {
      this.gameName = gameName
    }
  }
}
App['game' + gameName].setGameName(gameName)

function addEventListeners(){
  addNewGameListener();
  addStartListener();
  addActionListener();
}

function addNewGameListener(){
  $('#new_game').on('submit', function(event) {
    event.preventDefault()
    var name = $('#new_game').serialize()
    console.log(name)
    App.cable.subscriptions.create({channel: 'GamesChannel', name: name}, {
  // received: function(data) {
    // Use this.gameName
    // $("[data-chatroom='" + this.chatroomId + "']").removeClass('hidden')

    // return $("[data-chatroom='" + this.chatroomId + "']").append(data.message);

  // },

  setGameName: function(gameName) {
    this.gameName = gameName
  }
}
App['game' + gameName].setGameName(gameName)
    $.ajax({
      url: '/games',
      method: 'POST',
      data: name // {game: {name: name} }
    })
  })
}

function addStartListener(){
  $('main').on('click', '.start-round-link', function(event) {
    event.preventDefault();
    var link = $('.start-round-link').attr('href');
    $.get(link);
  })
}
