FactoryGirl.define do
  factory :turn do
    association :player, factory: :user
    association :round, factory: :round
    seconds_remaining 60
    cards_won 0
  end
end
