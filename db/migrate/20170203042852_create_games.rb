class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.string :name,   null: false, unique: true
      t.integer :creator_id, null: false

      t.timestamps null: false
    end
    add_index :games, :name, unique: true
  end
end
