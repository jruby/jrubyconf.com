class AddWithdrawFlag < ActiveRecord::Migration
  def change
    change_table :proposals do |t|
      t.boolean :withdraw
    end
  end
end
