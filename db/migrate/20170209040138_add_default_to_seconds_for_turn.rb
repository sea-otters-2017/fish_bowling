class AddDefaultToSecondsForTurn < ActiveRecord::Migration[5.0]
  def change
    change_column_default(:turns, :seconds_remaining, 60)
    change_column_null :turns, :seconds_remaining, false
  end
end
