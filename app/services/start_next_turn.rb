class StartNextTurn
  def initialize(game)
    @game = game
  end

  def call
    @round = @game.current_round
    @cluegiver = @game.get_cluegiver
    @card = @game.random_card
    @turn = @round.turns.create(player: @cluegiver)
    @turn.cards << @card
  end

end
