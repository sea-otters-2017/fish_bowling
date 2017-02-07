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

  received: function(message) {
    switch(message['action']) {
      case 'newPlayer':
        appendNewPlayer(message['player'])
        break;
      case 'showTeams':
        showTeams(message['response'])
        break;
      case 'updateGameDisplay':
        updateGameDisplay(message)
        break;
    }
    // $('body').append(message['message'])
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

$(document).on('click', '#pause-button', function(event) {
  event.preventDefault()
  alert("Listening on pause")
  var text = $(event.target).text()
  if (text === 'Pause') {
    $(event.target).text('PLAY')
    pauseTimer()
  } else {
    $(event.target).text('PLAY')
    resumeTimer()
  }
})

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

  // countdown({minutes: 0, seconds: 5}, "GO!!")
  // setTimeout(function(){countdown({minutes: 1, seconds: 0}, "Time's up!")}, 8000);
  var timer = new Timer()
  timer.countdown()
}
