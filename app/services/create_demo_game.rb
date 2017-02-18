class CreateDemoGame
  DEMO_CARDS = [  'MLK',
                  'French Toat',
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
    game.participants.each_with_index do |participant, index|
      4.times do |i|
        card = participant.cards.new(concept: cards.pop)
        game.cards << card
      end
    end
  end

  private

  def random_teams
    TEAM_NAMES.shuffle
  end

  def katherine
    User.find(2)
  end

  def justin
    User.find(3)
  end

  def pat
    User.find(4)
  end

end
