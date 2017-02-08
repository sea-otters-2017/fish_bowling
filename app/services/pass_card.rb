class PassCard
  def initialize(game)
    @game = game
  end

  def call
    @card = @game.random_card
    @turn = @game.current_round.last_turn
    @turn.cards << @card
  end

end
