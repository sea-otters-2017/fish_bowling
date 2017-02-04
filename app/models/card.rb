class Card < ApplicationRecord
  belongs_to :author, class_name: User
  belongs_to :game

  validates_presence_of :concept, :game_id, :author_id, :in_bowl
end
