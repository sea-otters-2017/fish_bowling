FactoryGirl.define do
  factory :game do
    sequence(:name) {|n| "game_#{n}" }
    association :creator, factory: :user
  end
end

=begin
require 'factory_girl_rails'
FactoryGirl.create(:game)
=end
