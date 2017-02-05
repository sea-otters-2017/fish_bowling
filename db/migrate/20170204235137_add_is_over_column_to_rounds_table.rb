class AddIsOverColumnToRoundsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :rounds, :is_over, :boolean, default: false
  end
end
