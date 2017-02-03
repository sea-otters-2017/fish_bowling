class AddTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.string :name,     null: false,  unique: true
      t.integer :score,   null: false,  default: 0
      t.integer :game_id, null: false
    end
  end
end
