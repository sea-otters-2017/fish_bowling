class Turn < ApplicationRecord
  belongs_to :round
  belongs_to :player, class_name: :User
  has_and_belongs_to_many :cards, join_table: "cards_turns"
  has_many :cards_turns

  validates_presence_of :round_id, :player_id, :seconds_remaining

  def last_card
    last_add.card
  end

  def end_turn
    last_card.put_in_bowl
  end

  private

  def last_add
    cards_turns.order("created_at").last
  end

end
