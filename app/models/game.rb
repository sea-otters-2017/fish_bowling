class Game < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  belongs_to :creator, class_name: User
  has_many :teams
  has_and_belongs_to_many :participants,
                          join_table: "games_participants",
                          class_name: User,
                          association_foreign_key: 'participant_id'

  # after_save :initialize_all_players, on: :create

  def all_players
    self.teams.where(name: 'all players').first.players
  end

  def to_param
    name
  end

end
