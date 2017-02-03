class Game < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  belongs_to :creator, class_name: User
  has_many :teams

  def all_players
    self.teams.where(name: 'all players').first.players
  end

  def to_param
    name
  end

end
