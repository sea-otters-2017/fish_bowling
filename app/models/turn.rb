class Turn < ApplicationRecord
  belongs_to :round
  belongs_to :player, class_name: :User

  has_one :game, through: :round
end
