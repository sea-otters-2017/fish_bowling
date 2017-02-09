class AddIsPausedToGames < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :is_paused, :boolean, default: true 
  end
end
