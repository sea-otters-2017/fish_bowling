class CreateJoinTableCardTurn < ActiveRecord::Migration[5.0]
  def change
    create_join_table :cards, :turns do |t|
      t.integer :card_id, null: false
      t.integer :turn_id, null: false

      t.timestamps null: false
    end
  end
end
