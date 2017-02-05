class Round < ApplicationRecord
  belongs_to :round_type
  belongs_to :game

  has_many :turns

  def is_over?
    return false if self.turns.empty?
    return false if self.game.bowl_empty?
    true
  end

  def is_over?
    self.is_over
  end

  def finish
    self.update_attribute(:is_over, true)
  end

end
