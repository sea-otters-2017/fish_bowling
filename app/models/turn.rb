class Turn < ApplicationRecord
  belongs_to :round
  belongs_to :player, class_name: :User

  validates_presence_of :round_id, :player_id
end
