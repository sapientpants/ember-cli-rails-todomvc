class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
    
    create_table :todos, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :title
      t.boolean :completed

      t.timestamps
    end
  end
end
