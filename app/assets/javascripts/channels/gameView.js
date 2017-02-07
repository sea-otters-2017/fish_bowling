
function renderGamePage(gameState) {
  console.log('renderGamePage(', gameState, ')');

  var cardHTML = `<h1>${gameState.card}</h1>`;

  var startRoundFormHTML = `
    <form class="action-form" action="/games/${gameState.game.name}/start_round" method="post">
      <input class="waves-effect waves-light btn-large teal" type="submit" value="START ROUND">
    </form>
  `
  var team1 = gameState.teams[0]
  var team2 = gameState.teams[1]

  var team1Players = ''
  var team2Players = ''

  team1.players.forEach(function(player) {
    team1Players += ('<li>' + player.display_name + '</li>')
  })

  team2.players.forEach(function(player) {
    team2Players += ('<li>' + player.display_name + '</li>')
  })

  var teamsHTML = `<h4>Teams:</h4>
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

  var waitingGameHTML =  `
    <div class='waiting-game'>
      <ul class='player-names-list'>
        <li class='player-name'>PLAYER_1</li>
        <li class='player-name'>PLAYER_2</li>
      </ul>
      <div id='create-card-form'>
        <form class="new_card" id="new_card" action="/cards" accept-charset="UTF-8" method="post">
          <input type="text" name="card[concept]" id="card_concept" />
          <input type="hidden" name="game_id" id="game_id" value="132" />
          <input type="submit" name="commit" value="Add Card" data-disable-with="Add Card" />
        </form>
      </div>
      <a id="start-game" data-method="get" href="/games/asd/start">start game</a>
    </div>
  `;

  var cluegiverButtonsHTML =  `<div class="actions">
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

  var gameHTML = `
  <div id="game-${gameState.game.id}">
  ${waitingGameHTML}
    <div>
      <div id='timer' class="fbCountdown" data-start-time='TBD' data-run-time='60' ></div>
    </div>
    <p>Current Round: ${gameState.current_round.type}</p>

    <div id="cluegiver-turn-${"CLUEGIVE-TBD"}" class="cluegiver-view">
      <h1>${gameState.game.name}</h1>
    </div>

    ${cardHTML}
    ${cluegiverButtonsHTML}

    <div class="observer-view">
      <h1>${gameState.cluegiver}s Turn</h1>
    </div>
  </div>

  ${teamsHTML}
  ${startRoundFormHTML}

  `
  $('#live').html(gameHTML)
}
