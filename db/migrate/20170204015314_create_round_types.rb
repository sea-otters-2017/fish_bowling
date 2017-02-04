class CreateRoundTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :round_types do |t|
      t.string :name,        null: false
      t.string :description, null: false
    end
  end
end
