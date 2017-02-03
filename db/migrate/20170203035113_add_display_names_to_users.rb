class AddDisplayNamesToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :display_name, :string, default: "", null: false
    add_index :users, :display_name, unique: true
  end
end
