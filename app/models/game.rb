class Game < ActiveRecord::Base
  before_validation :normalize_name, on: :create
  
  validates :name, presence: true, uniqueness: true
  belongs_to :creator, class_name: User
  has_many :teams
end
