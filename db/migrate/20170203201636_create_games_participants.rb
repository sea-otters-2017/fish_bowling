class CreateGamesParticipants < ActiveRecord::Migration[5.0]
  def change
    create_table :games_participants do |t|
      t.integer :game_id, null: false
      t.integer :participant_id, null: false
    end
    add_index :games_participants, [ :game_id, :participant_id ], unique: true
  end
end
