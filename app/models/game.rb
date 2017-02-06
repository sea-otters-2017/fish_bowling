class Game < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :cards
  belongs_to :creator, class_name: User
  has_many :rounds
  has_many :teams
  has_many :turns, through: :rounds
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
    next_turn_team.players.shuffle.min_by do |player|
      count_turns(player)
    end
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

  def random_card
    self.cards.where(in_bowl: true).sample
  end

  def bowl_empty?
    self.cards.all? do |card|
      !card.in_bowl?
    end
  end

  def last_turn_team
    return self.teams.sample if last_player.nil?
    last_player.teams.where(game: self).first
  end

  def reset_cards
    self.cards.each do |card|
      card.put_in_bowl
    end
  end

  def full_state
    { game: self,
      is_over: is_over?,
      current_round: {type: current_round.round_type.name},
      creator: {id: creator.id, display_name: creator.display_name},
      team_1: {name: teams.first.name, players: teams.first.players_list},
      team_2: {name: teams.last.name, players: teams.last.players_list},
      turn: last_turn#,
      # card: {concept: last_turn.card.concept, id: last_turn.card.id}
    }

  def ready?
    return false if self.is_over? || !self.cards_added? || !self.minimum_players?
    return true
  end

  private

  def initialize_rounds
    RoundType.create_round_types
    3.times do |i|
      self.rounds << Round.new(round_type: RoundType.all[i])
    end
  end

  def next_turn_team
    self.teams.where.not(name: last_turn_team.name).first
  end

  def last_turn
    self.turns.order("created_at").last || Turn.new
  end

  def last_player
    last_turn.player
  end

  def count_turns(player)
    self.turns.where(player: player).count
  end

end
