class CreateRandomTeams
  def initialize(game)
    @game = game
  end

  def call
    team1 = Team.new(name: 'Sea Lions')
    team2 = Team.new(name: 'Porpoises')
    @game.teams << [team1, team2]
    @game.participants.shuffle.each.with_index do |player, index|
      team1.players << player if index.odd?
      team2.players << player if index.even?
    end
  end

end

=begin
  game = Game.last
  CreateRandomTeams.new(game).call
=end
