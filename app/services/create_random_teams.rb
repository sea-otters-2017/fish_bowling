class CreateRandomTeams
  TEAM_NAMES = [  'Sea Lions',
                  'Porpoises',
                  'Sea Otters',
                  'Rock Lobsters',
                  'Penguins',
                  'Crabs',
                  'Sharks',
                  'Orcas',
                  'Starfish',
                  'Flounders',
                  'Mermaids',
                  'Algae',
                  'Plankton',
                  'Coral',
                  'Sea Turtles',
                  'Eels',
                  'Submarines',
                  'Sea Sponges',
                  'Squids',
                  'Manatees',
                  'Belugas',
                  'Dolphins',
                  'Octopi']
  def initialize(game)
    @game = game
  end

  def call
    shuffled_teams = random_teams
    team1 = Team.new(name: shuffled_teams.first)
    team2 = Team.new(name: shuffled_teams.last)
    @game.teams << [team1, team2]
    @game.participants.shuffle.each.with_index do |player, index|
      team1.players << player if index.odd?
      team2.players << player if index.even?
    end
  end

  private

  def random_teams
    TEAM_NAMES.shuffle
  end

end
