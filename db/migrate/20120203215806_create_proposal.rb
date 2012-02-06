class CreateProposal < ActiveRecord::Migration
  def change
    create_table :proposals do |t|
      t.string :title

      t.text :abstract
      t.text :bio

      t.timestamps
    end
  end
end
