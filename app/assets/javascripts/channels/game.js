// $( document ).ready(function() {
App.game = App.cable.subscriptions.create("GamesChannel", {
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
  }
});

$(document).on('turbolinks:load', function() {
  addEventListeners();
});

function addEventListeners(){
  addNewGameListener();
  addStartListener();
  addActionListener();
}

function addNewGameListener(){
  $('#new_game').on('submit', function(event) {
    event.preventDefault()
    var name = $('#new_game').serialize()
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

function appendNewPlayer(playerName) {
  $('.player-names-list').append('<li class="player-name">' + playerName + '</li>')
}

function renderMain(response) {
  $('main').html(response)
}

function updateGameDisplay(message) {
  $('main').html(message['response'])
  var userId = $('[data-userId]').data().userid;
  var cluegiverId = message.cluegiver_id;
  if (userId === cluegiverId){
    $('.cluegiver-view').show();
  } else {
    $('.observer-view').show();
  }
  countdown({minutes: 1, seconds: 0});
  console.log(message['game_state'])
}
