FactoryGirl.define do
  factory :card do
    sequence(:concept) {|n| "concept_#{n}" }
    association :author, factory: :user
    association :game, factory: :game
  end
end

=begin
require 'factory_girl_rails'
FactoryGirl.create(:card)
=end
