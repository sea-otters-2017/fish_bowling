class CreateTurns < ActiveRecord::Migration[5.0]
  def change
    create_table :turns do |t|
      t.integer :player_id
      t.integer :round_id
      t.integer :seconds_remaining
      t.integer :cards_won

      t.timestamps
    end
  end
end
