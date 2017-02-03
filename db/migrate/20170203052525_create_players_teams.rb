class CreatePlayersTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :players_teams do |t|
      t.integer :player_id, null: false
      t.integer :team_id,   null: false
    end
    add_index :players_teams, [ :player_id, :team_id ], unique: true
  end
end
