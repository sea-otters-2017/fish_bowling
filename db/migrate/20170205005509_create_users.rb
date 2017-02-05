class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :display_name, null: false
      t.string :email, null: false
      t.string :password_digest
      t.timestamps
    end
    add_index :users, :display_name, unique: true
    add_index :users, :email, unique: true
  end
end
