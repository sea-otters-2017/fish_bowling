$(document).on('turbolinks:load', function() {
  addEventListeners();
});

function preventDoubleClick(clickable) {
  if ($(clickable).hasClass('clicked')) return
  $(clickable).addClass('clicked')
  setTimeout(function() { $(clickable).removeClass('clicked'); }, 1000)
}

function addEventListeners(){
  createActionListener();
  gameActionListener();
  addSubscriptionListener();
}

function addSubscriptionListener() {
  $('main').on('submit', '.subscription-form', function(event) {
    event.preventDefault();
    var name = $(event.target).find('input[type=text]').val()

    if (App.cable.subscriptions['subscriptions'].length > 1) {
      App.cable.subscriptions.remove(App.cable.subscriptions['subscriptions'][1])
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
          case 'buzz':
            $('#toot').trigger('play')
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

function createActionListener(){
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

function gameActionListener(){
  $('main').on('submit', '.game-form', function(event) {
    event.preventDefault();
    var timeLeft = gameTimer.seconds;
    console.log('gameTimer.seconds',gameTimer.seconds)
    var $form = $(this);
    preventDoubleClick(event.target)
    $.ajax( {
      url : $form.attr('action'),
      method : "POST",
      data : {timeLeft: timeLeft}
    });
  })
}

function goToNextTurn(gameState) {
  var userdata = $("#live[data-userid]").data()
  var user_id = !!userdata ? userdata.userid : null;
  var isCreator = (user_id === gameState.creator.id);
  var timeLeft = gameTimer.seconds;
  if (isCreator) {
    $.ajax({
      url : "/games/" + gameState.game.name + "/next_turn",
      method : "POST",
      data : {timeLeft: timeLeft}
    });
  }
}
