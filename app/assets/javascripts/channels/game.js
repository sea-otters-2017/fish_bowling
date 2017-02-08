$(document).on('turbolinks:load', function() {
  addEventListeners();
});

function addEventListeners(){
  addActionListener();
  addSubscriptionListener()
}

function addSubscriptionListener() {
  $('main').on('submit', '.subscription-form', function(event) {
    event.preventDefault();
    var name = $(event.target).find('input[type=text]').val()
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
          case 'buzz':
            break;
        }
      },

      setGameName: function(gameName) {
        this.gameName = gameName
      }
    })
    App['game_' + name].setGameName(name)
  })
}

function addActionListener(){
  $('main').on('submit', '.action-form', function(event) {
    event.preventDefault();
    var $form = $(this);
    $.ajax( {
      url : $form.attr('action'),
      method : "POST",
      data : $form.serialize()
    });
  })
}

function setTimer(gameName){
  $('#timer').addClass('updated');
  jsTimer(gameName);
}
