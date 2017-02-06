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
    // console.log('data', JSON.stringify(data, null, 2))
    // console.log('id', data.id)
    switch(data['action']) {
      case 'newPlayer':
        appendNewPlayer(data['player'])
        if (countPlayers() >= 4) {
          showStartGameLink()
        }
        updatePlayersCount()
        break;
      case 'showTeams':
        showTeams(data['response'])
        break;
      case 'updateGameDisplay':
        updateGameDisplay(data)
        break;
    }
    $('body').append(data['message'])
  },

  speak: function(message) {
    this.perform('speak', { message: message })
  }
});

$(document).on('turbolinks:load', function() {
  createNewGame();
  startNewRound();
  passCard();
  winCard();
});

function createNewGame(){
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

/*
function addCard() {
  // bind a submit listener to add card form
  // serialize data
  // clear form
  // save to db
  // update dom
  // broadcast
}
*/

function startNewRound(){
  $('main').on('click', '.start-round-link', function(event) {
    event.preventDefault();
    var link = $('.start-round-link').attr('href');
    $.get(link);
  })
}

function passCard(){
  $('main').on('click', '#pass-button', function(event) {
    event.preventDefault();
    var link = $('#pass-button').attr('href');
    $.get(link);
  })
}

function winCard(){
  $('main').on('click', '#win-button', function(event) {
    event.preventDefault();
    var link = $('#win-button').attr('href');
    var concept = $('#card-concept').text();
    $.get(link, {card_concept: concept});
  })
}

function appendNewPlayer(playerName) {
  $('.player-names-list').append('<li class="player-name">' + playerName + '</li>')
}

function showStartGameLink() {
  $('#start-game-link').removeClass('hidden')
}

function countPlayers() {
  return $('.player-names-list li').length
}

function updatePlayersCount() {
  var missing = 4 - countPlayers();
  if (missing > 0) {
    var missingPlayers = 'Waiting for ' + missing + ' more player(s)...';
    $('#waiting-for-players').text(missingPlayers)
  } else {
    $('#waiting-for-players').text('')
  }
}

function showTeams(response) {
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
