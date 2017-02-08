App.game = App.cable.subscriptions.create("GamesChannel", {
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
  }
});

$(document).on('turbolinks:load', function() {
  addEventListeners();
});

function addEventListeners(){
  // addNewGameListener();
  addStartRoundListener();
  addActionListener();
}
//
// function addNewGameListener(){
//   $('#new_game').on('submit', function(event) {
//     event.preventDefault()
//     var data = $('#new_game').serialize()
//     $.ajax({
//       url: '/games',
//       method: 'POST',
//       data: data
//     })
//   })
// }

function addStartRoundListener(){
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
