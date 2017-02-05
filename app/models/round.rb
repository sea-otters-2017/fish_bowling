class Round < ApplicationRecord
  belongs_to :round_type
  belongs_to :game

  has_many :turns

  def is_over?
    self.is_over
  end

  def finish
    self.update_attribute(:is_over, true)
  end

  def last_turn
    self.turns.order("created_at").last || Turn.new
  end

end
