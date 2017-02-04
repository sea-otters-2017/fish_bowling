class Card < ApplicationRecord
  belongs_to :author, class_name: User
  belongs_to :game
end
