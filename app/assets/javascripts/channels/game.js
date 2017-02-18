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
    var name = $(event.target).find('input[type=text]').val();
    addSubscription(name);
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
  $('#timer').hide();
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
