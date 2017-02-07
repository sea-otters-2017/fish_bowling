class Card < ApplicationRecord
  belongs_to :author, class_name: User
  belongs_to :game
  has_and_belongs_to_many :turns, join_table: "cards_turns"

  validates_presence_of :concept, :game_id, :author_id
  validates_inclusion_of :in_bowl, in: [true, false]

  def remove_from_bowl
    self.in_bowl = false
    self.save
  end

  def put_in_bowl
    self.in_bowl = true
    self.save
  end
end
