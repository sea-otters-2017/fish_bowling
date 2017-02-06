class AddDefaultValueToTurns < ActiveRecord::Migration[5.0]
  def change
    change_column_default :turns, :seconds_remaining, :default => 59
    change_column_default :turns, :cards_won, :default => 0
  end
end
