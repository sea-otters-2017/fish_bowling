FactoryGirl.define do
  factory :turn do
    association :player, factory: :user
    association :round, factory: :round
    seconds_remaining 60
  end
end
