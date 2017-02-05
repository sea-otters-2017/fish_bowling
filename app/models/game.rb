class Game < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  belongs_to :creator, class_name: User
  has_many :rounds
  has_many :teams
  has_and_belongs_to_many :participants,
                          join_table: "games_participants",
                          class_name: User,
                          association_foreign_key: 'participant_id'

  after_create :initialize_rounds


  def to_param
    name
  end

  def is_over?
    self.rounds.all? { |round| round.is_over? }
  end

  def current_round
    return nil if self.is_over?
    self.rounds.each do |round|
      return round unless round.is_over?
    end
  end

  def get_cluegiver
    last_turn_team
    # Iterate through all players on both teams
    # return player that will be the next cluegiver
      # from the team opposing that which last
      # chosen randomly from the players with the fewest rounds that game
  end

  def minimum_players?
    self.participants.count >= 4
  end

  def unfinished_players
    self.participants.select do |participant|
      participant.cards_from(self).count < 4
    end
  end

  def cards_added?
    self.unfinished_players.count == 0
  end

  def bowl_empty?
    self.cards.all? do |card|
      !card.in_bowl?
    end
  end

  private

  def initialize_rounds
    RoundType.create_round_types
    3.times do |i|
      self.rounds << Round.new(round_type: RoundType.all[i])
    end
  end

  def next_turn_team
    return game.teams.sample if last_turn_team.nil?
    return self.teams.where.not(name: last_turn_team.name).first
  end

  def last_turn_team
    self.current_round.last_turn.player.teams.where(game: self).first
  end

end
