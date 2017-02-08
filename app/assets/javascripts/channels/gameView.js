
function renderGamePage(gameState) {
  var team1 = gameState.teams[0];
  var team2 = gameState.teams[1];
  var userdata = $("#live[data-userid]").data()
  var user_id = !!userdata ? userdata.userid : null;
  var isCluegiver = (user_id === gameState.cluegiver.id);
  var isCreator = (user_id === gameState.creator.id);

  // Universal View

  function getTimerHTML(){
    return `
      <div id='timer' class="fbCountdown" data-start-time='TBD' data-run-time='60'>
      <p>00:30</p>
      </div>`;
  };

  function getTitleHTML(){
    return `
    <h3>${gameState.game.name}</h3>
    <div id='round-container'>
    <p>Current Round: ${gameState.current_round.type}</p>
    </div>`;
  };

  // Waiting-to-Start-Game View

  function getWaitingHTML(){
    if(gameState.game_started){ return "" }
    var allPlayers = ''

    gameState.participants.forEach(function(participant){
      allPlayers += `<li class='player-name'>${participant.display_name}</li>`
    })

    return `
      <div class='waiting-game'>
        <h4>Participants</h4>
        <ul class='player-names-list'>
          ${allPlayers}
        </ul>
        <div id='create-card-form'>
          <form id="new_card" class="action-form" action="/cards" accept-charset="UTF-8" method="post">
            <input type="text" name="card[concept]" id="card_concept" />
            <input type="hidden" name="game_id" id="game_id" value="${gameState.game.id}" />
            <input type="submit" name="commit" value="Add Card" data-disable-with="Add Card" />
          </form>
        </div>
        ${startGameFormHTML()}
      </div>
    `;
  }

  function startGameFormHTML(){
    if(!isCreator){ return "" }
    return `
    <form id="start-game" class="action-form" action="/games/${gameState.game.name}/start" method="post">
      <input class="waves-effect waves-light btn-large teal" type="submit" value="Start Game!">
    </form>
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

    return `<h4>Teams:</h4>
    <div>
    <h5>${team1.name}</h5>
    <h5>${team1.score} points</h5>
    <ul>
    ${team1Players}
    </ul>
    <h5>${team2.name}</h5>
    <h5>${team2.score} points</h5>
    <ul>
    ${team2Players}
    </ul>
    </div>
    `;
  }

  function startRoundFormHTML(){
    if(!isCreator){ return "" }
    if(!gameState.game_started || gameState.round_started){ return "" }
    return `
    <form class="action-form" action="/games/${gameState.game.name}/start_round" method="post">
    <input class="waves-effect waves-light btn-large teal" type="submit" value="START ROUND">
    </form>
    `
  }

  // Cluegiver View

  function getCluegiverHTML() {
    if(!gameState.round_started || !isCluegiver){ return "" }
    return `
    <div id="cluegiver-container">
      ${getCardHTML()}
      ${getCluegiverButtonsHTML()}
    </div>
    `;
  }

  function getCardHTML(){
    return `<h1>${gameState.card}</h1>`;
  }

  function getCluegiverButtonsHTML(){
    return `<div class="actions">
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
  };

  // Observer View

  function getObserverHTML() {
    if(!gameState.round_started || isCluegiver){ return "" }
    return `
    <div id="observer-container">
      <h1>${gameState.cluegiver.display_name}s Turn</h1>
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
          <h5>${winningTeam.score}</h5>
        </div>
        <div class='losers'>
          <h5>${losingTeam.name}</h5>
          <h5>${losingTeam.score}</h5>
        </div>
      </div>
    `
  }

  function nextTurnButton() {
    if(!isCreator || !gameState.round_started){ return "" }
    return `
    <form class="action-form" action="/games/${gameState.game.name}/next_turn" method="post">
    <input class="waves-effect waves-light btn-large green" id="next-turn-button" type="submit" value="NEXT TURN">
    </form>
    `
  }

  var gameHTML;
  if(gameState.is_over){
    gameHTML = showResults()
  } else {
    gameHTML = `
      ${getTimerHTML()}
      ${getTitleHTML()}
      ${getWaitingHTML()}
      ${getTeamsHTML()}
      ${startRoundFormHTML()}
      ${getCluegiverHTML()}
      ${getObserverHTML()}
      ${nextTurnButton()}
    `
  }
  $('#live').html(gameHTML)
}
