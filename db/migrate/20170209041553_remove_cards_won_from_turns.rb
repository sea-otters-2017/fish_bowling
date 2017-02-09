class RemoveCardsWonFromTurns < ActiveRecord::Migration[5.0]
  def change
    remove_column :turns, :cards_won
  end
end
