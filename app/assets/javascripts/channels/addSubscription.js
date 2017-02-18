function addSubscription(name) {
  if (App.cable.subscriptions['subscriptions'].length > 0) {
    App.cable.subscriptions.remove(App.cable.subscriptions['subscriptions'][0])
  }

  App['game_' + name] = App.cable.subscriptions.create({channel: 'GamesChannel', name: name}, {
    connected: function() {
      console.log('Player connected')
    },

    disconnected: function() {
      console.log('Player disconnected')
    },

    received: function(data) {
      switch(data['action']) {
        case 'updateGame':
          renderGamePage(data.gameState);
          break;
        case 'setTimer':
          createTimer(data.gameState, data.gameState.last_turn.seconds_remaining || 60);
          break;
        case 'setCountDown':
          renderGamePage(data.gameState, 'nextTurn');
          break;
        case 'buzz':
          $('#toot').trigger('play')
          break;
        case 'beforeRound':
          renderGamePage(data.gameState, 'nextRound')
          break;
      }
    },

    setGameName: function(gameName) {
      this.gameName = gameName
    }
  })
  App['game_' + name].setGameName(name)
}
