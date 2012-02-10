class UpdateProposal < ActiveRecord::Migration
  def change
    change_table :proposals do |t|
      t.change :title, :string, :limit => 256
      t.string :name, :limit => 256
      t.string :email, :limit => 256
      t.string :twitter, :limit => 20
      t.string :key, :limit => 128
      t.text :notes
    end
  end
end
