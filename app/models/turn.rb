class Turn < ApplicationRecord
  belongs_to :round
  belongs_to :player, class_name: :User

end
