class CreateDemoGame
  DEMO_CARDS = [  'MLK',
                  'French Toast',
                  'Ronald McDonald',
                  'Frozen',
                  'Overalls',
                  'Ear Muffs',
                  'Mechanical Bull',
                  'Coffee',
                  'Ear Muffs',
                  'Sushi',
                  'Mermaid',
                  'Charlie Brown',
                  'Elevator',
                  'Hippo',
                  'Eiffel Tower',
                  'Peanut Butter and Jelly',
                  'Peter Pan' ]
  def initialize(creator)
    @creator = creator
  end

  def call
    game = Game.new(name: "Demo#{Time.now.to_i}")
    game.creator = @creator
    game.participants << [katherine, justin, pat, @creator]
    game.save!
    cards = DEMO_CARDS.shuffle
    [katherine, justin, pat].each do |participant|
      4.times do
        card = participant.cards.new(concept: cards.pop)
        game.cards << card
      end
    end
    return game
  end

  private

  def random_teams
    TEAM_NAMES.shuffle
  end

  def katherine
    User.find_by(email: 'katherine@email.com')
  end

  def justin
    User.find_by(email: 'justin@email.com')
  end

  def pat
    User.find_by(email: 'pat@email.com')
  end

end
