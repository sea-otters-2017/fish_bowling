FactoryGirl.define do
  factory :user do
    sequence(:display_name) {|n| "display_name_#{n}" }
    sequence(:email) {|n| "user#{n}@email.com" }
    password "password"
  end
end

=begin
require 'factory_girl_rails'
FactoryGirl.create(:user)
=end
