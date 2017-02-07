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
    console.log('data', JSON.stringify(data, null, 2))
    console.log('id', data.id)
    switch(data['action']) {
      case 'updateGame':
        renderGamePage(data.gameState, currentUser);
        break;
      case 'newPlayer':
        appendNewPlayer(data['player'])
        break;
      case 'showTeams':
        showTeams(data['response'])
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

function renderGamePage(gameState, currentUser) {
  console.log('renderGamePage(', gameState, ')');

  var cardHTML = `
    <h1>${gameState.card}</h1>
  `;

  var buttonHTML =  `<div class="actions">
        <form class="action-form" action="/games/${gameState.game.name}/pass" method="post">
          <input class="waves-effect waves-light btn-large red" type="submit" value="pass">
        </form>

        <form class="action-form" action="/games/${gameState.game.name}/win_card" method="post">
          <input class="waves-effect waves-light btn-large teal" type="submit" value="got it!">
        </form>

        <form class="action-form" action="/games/${gameState.game.name}/pause" method="post">
          <input class="waves-effect waves-light btn-large orange" type="submit" value="pause">
        </form>
      </div>`;

      if(currentUser.display_name == 'THE CLUEGIVER!!!'){
        buttonHTML = '';
      }

  var gameHTML = `
  <div id="game-${gameState.game.id}">

    <div>
      <div id='timer' class="fbCountdown" data-start-time='TBD' data-run-time='60' ></div>
    </div>
    <p>Current Round: ${gameState.current_round.type}</p>

    <div id="cluegiver-turn-${"CLUEGIVE-TBD"}" class="cluegiver-view">
      <h1>${gameState.game.name}</h1>
    </div>

    ${cardHTML}

    ${buttonHTML}

    <div class="observer-view">
      <h1>${gameState.cluegiver}s Turn</h1>
    </div>
  </div>
  `
  $('#live').html(gameHTML)
}
