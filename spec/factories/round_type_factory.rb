FactoryGirl.define do
  factory :round_type do
    sequence(:name) {|n| "name_#{n}" }
    sequence(:description) {|n| "description_#{n}: This is a description of name_#{n}" }
  end
end

=begin
require 'factory_girl_rails'
FactoryGirl.create(:round_type)
=end
