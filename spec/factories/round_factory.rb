FactoryGirl.define do
  factory :round do
    association :game, factory: :game
    association :round_type, factory: :round_type
  end
end

=begin
require 'factory_girl_rails'
FactoryGirl.create(:round)
=end
