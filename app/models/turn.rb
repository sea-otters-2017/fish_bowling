class Turn < ApplicationRecord
  belongs_to :round
  belongs_to :player, class_name: :User
  has_and_belongs_to_many :cards, join_table: "cards_turns"

  validates_presence_of :round_id, :player_id
end
