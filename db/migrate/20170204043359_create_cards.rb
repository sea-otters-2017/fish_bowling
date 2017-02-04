class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.string :concept,   null: false
      t.integer :game_id, null: false
      t.integer :author_id, null: false
      t.boolean :in_bowl, default: true, null: false

      t.timestamps null: false
    end
  end
end
