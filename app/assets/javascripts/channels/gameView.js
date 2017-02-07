
function renderGamePage(gameState) {
  console.log('renderGamePage(', gameState, ')');

  var cardHTML = `<h1>${gameState.card}</h1>`;

  var startRoundFormHTML = `
    <form class="action-form" action="/games/${gameState.game.name}/start_round" method="post">
      <input class="waves-effect waves-light btn-large teal" type="submit" value="START ROUND">
    </form>
  `

  var teamsHTML = `<h4>Teams:</h4>
  <div>
    <h5>TEAM NAME</h5>
    <ul>
      <li>NAME_1</li>
      <li>NAME_2</li>
    </ul>
  </div>
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

  ${teamsHTML}
  ${startRoundFormHTML}

  `
  $('#live').html(gameHTML)
}
