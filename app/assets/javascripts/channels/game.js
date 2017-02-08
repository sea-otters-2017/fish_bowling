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
  addActionListener();
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
