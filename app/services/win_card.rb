class WinCard
  def initialize(game)
    @game = game
  end

  def call
    @game.last_turn_team.increase_score
    @turn = @game.last_turn
    @card = @game.current_card
    @card.remove_from_bowl
  end

end
