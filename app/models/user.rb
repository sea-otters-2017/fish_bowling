class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :games, foreign_key: :creator_id
  has_and_belongs_to_many :teams,
                          join_table: "players_teams", 
                          foreign_key: :player_id
end
