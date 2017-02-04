class Round < ApplicationRecord
  belongs_to :round_type
  belongs_to :game

  has_many :turns
end
