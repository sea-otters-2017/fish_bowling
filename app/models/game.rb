class Game < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  belongs_to :creator, class_name: :User
end
