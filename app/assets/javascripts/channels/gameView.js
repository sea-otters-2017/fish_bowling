function renderGamePage(gameState, count_down = false) {
  var team1 = gameState.teams[0];
  var team2 = gameState.teams[1];
  var userdata = $("#live[data-userid]").data()
  var user_id = !!userdata ? userdata.userid : null;
  var isCluegiver = (user_id === gameState.cluegiver.id);
  var cluegiver = gameState.cluegiver['display_name']
  var isCreator = (user_id === gameState.creator.id);
  var thisPlayer = gameState.participants.find(function(player) {
    return player.id === user_id
  })

  // Universal View

  function getTitleHTML(){
    return `
      <h3 class="game-name">${gameState.game.name}</h3>
      <div id='round-container'>
        <p>Current Round: ${gameState.current_round.type}</p>
      </div>
    `;
  };

  // Waiting-to-Start-Game View

  function getWaitingHTML(){
    if(gameState.game_started){ return "" }

    var allPlayers = ''

    gameState.participants.forEach(function(participant){
      allPlayers += `<li class='player-name'>${participant.display_name}</li>`
    })

    function cardsForm(){
      if (!thisPlayer || thisPlayer.cards_count < 4) {
        return `
          <div id='create-card-form'>
            <form id="new_card" class="action-form" action="/cards" accept-charset="UTF-8" method="post">
              <input type="text" placeholder="Enter card" name="card[concept]" id="card_concept" />
              <input type="hidden" name="game_id" id="game_id" value="${gameState.game.id}" />
              <div class="actions-container">
                <button class="btn waves-effect cyan accent-1, z-depth-4" type="submit" name="action">ADD CARD
                </button>
              </div>
            </form>
          </div>
        `;
      } else {
        return ''
      }
    }

    return `
      <div class='waiting-game'>
        <h4 class="participants">Participants</h4>
        <ul class='player-names-list'>
          ${allPlayers}
        </ul>
          ${cardsForm()}
        ${startGameFormHTML()}
      </div>
    `;
  }

  function startGameFormHTML(){
    var innerHTML;

    if(isCreator && gameState.ready) {
      innerHTML = `
        <form id="start-game" class="action-form" action="/games/${gameState.game.name}/start" method="post">
          <input button class="btn waves-effect waves-light btn-large teal z-depth-" type="submit" value="Start Game!">
        </form>
      `
    } else if (!isCreator && gameState.ready) {
      innerHTML = `<span>Waiting for ${gameState.creator.display_name} to push start...</span>`

    } else if(gameState.participants.length < 4) {
      var missingNo = 4 - gameState.participants.length;
      innerHTML = `<span>Waiting for ${missingNo} more player(s)...</span>`

    } else if (!gameState.has_cards) {
      innerHTML = '<span>Waiting for all players to add 4 cards...</span>'
    }
    return `
      <div class='game-ready-status'>
        ${innerHTML}
      </div>
    `
  }

  // Waiting-to-Round-Game View

  function getTeamsHTML(){
    if(!gameState.game_started || gameState.round_started){ return "" }

    var team1Players = ''
    var team2Players = ''

    team1.players.forEach(function(player) {
      team1Players += ('<li>' + player.display_name + '</li>')
    })

    team2.players.forEach(function(player) {
      team2Players += ('<li>' + player.display_name + '</li>')
    })

    return `
      <h4 class="banner">Teams:</h4>
      <div class="team-1">
        <h5 id="team-name">${team1.name}</h5>
        <ul>
          <div class="team-players">${team1Players}</div>
        </ul>
      </div>

      <div class="team-2">
        <h5 id="team-name">${team2.name}</h5>
        <ul>
          <div class="team-players">${team2Players}</div>
        </ul>
      </div>
    `;
  }

  function startTurnFormHTML(){
    return `
      <div class="countdown-display">${gameState.cluegiver['display_name']} is up in 5 seconds</div>

    `
  }

  function startRoundFormHTML(){
    if(!isCreator){ return "" }
    if(!gameState.game_started || gameState.round_started){ return "" }
    return `
      <form class="action-form" action="/games/${gameState.game.name}/start_round" method="post">
        <input class="btn btn-round waves-effect waves-light, z-depth-4, btn-large teal" type="submit" value="START ROUND">
      </form>
    `
  }

  // Cluegiver View

  function getCluegiverHTML() {
    if(!gameState.round_started || !isCluegiver){ return "" }
    return `
      <div id="cluegiver-container" class="card darken-1">
        ${getUnpausedButtons()}
        ${getPausedButton()}
      </div>
    `;
  }

  function getUnpausedButtons(){
    if(gameState.game.is_paused){ return "" }
    return `
    <h1 id="card-concept">${gameState.card}</h1>
      <div class="actions">
        <form class="game-form" action="/games/${gameState.game.name}/pass" method="post">
          <input class="waves-effect waves-light btn-large red" type="submit" value="pass">
        </form>
        <form class="game-form" action="/games/${gameState.game.name}/win_card" method="post">
          <input class="waves-effect waves-light btn-large teal" type="submit" value="got it!">
        </form>
        <form class="game-form" action="/games/${gameState.game.name}/pause" method="post">
          <input class="waves-effect waves-light btn-large orange" type="submit" value="pause">
        </form>
      </div>`;
  }

  function getPausedButton(){
    if(!gameState.game.is_paused){ return "" }
    return `
      <div class="actions center">
        <form class="game-form" action="/games/${gameState.game.name}/unpause" method="post">
        <input class="waves-effect waves-light btn-large orange" type="submit" value="unpause">
        </form>
      </div>
    `;
  }


  // Observer View

  function getObserverHTML() {
    if(!gameState.round_started || isCluegiver){ return "" }
    return `
      <div id="observer-container" class="card darken-1">
        <h1>${gameState.cluegiver.display_name}'s turn</h1>
          <form class="game-form buzzer" action="/games/${gameState.game.name}/buzz" method="post">
            <input class="myButton" type="submit" value='BUZZ'>
          </form>
      </div>
    `;
  }
  // Results View

  function showResults() {
    var winningTeam = team1.score > team2.score ? team1 : team2;
    var losingTeam = gameState.teams.find(function(team) { return team != winningTeam });

    return `
      <div class='results-container'>
        <div class='winners'>
          <h4>${winningTeam.name} win!</h4>
          <h5>${winningTeam.score} - ${losingTeam.score}</h5>
        </div>
        <div class='losers'>
          <h5>Maybe next time, ${losingTeam.name}!</h5>
        </div>
      </div>
    `
  }

  function nextTurnButton() {
    if(gameState.game.is_paused){ return "" }
    if(!isCreator || !gameState.round_started){ return "" }
    return `
    <div class='next-container'>
    <form class="game-form" action="/games/${gameState.game.name}/next_turn" method="post">
      <input class="waves-effect waves-light btn-large green" type="submit" value="NEXT TURN">
    </form>
    </div>
    `
  }

  var gameHTML;

  if(!gameState.round_started){
    $('#timer').hide();
  } else {
    $('#timer').show();
    $('.navbar-brand').hide();
  }

  if(gameState.is_over){
    gameHTML = showResults();
    $('#timer').remove();
    $('.navbar-brand').show();
  }
  else if (count_down) {
    gameHTML = `
      ${getTitleHTML()}
      ${startTurnFormHTML()}
    `
  }
  else {
    gameHTML = `
      ${getTitleHTML()}
      ${getWaitingHTML()}
      ${getTeamsHTML()}
      ${startRoundFormHTML()}
      ${getCluegiverHTML()}
      ${getObserverHTML()}
      ${nextTurnButton()}
    `
  }

  if(gameState.between_round) {

  }

  $('#live').html(gameHTML);
}
