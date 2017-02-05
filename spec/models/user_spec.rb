require 'rails_helper'

RSpec.describe User, type: :model do
  subject { FactoryGirl.create(:user) }

  it { expect(subject).to have_many :cards }
  it { expect(subject).to have_many :created_games }
  it { expect(subject).to have_and_belong_to_many :teams }
  it { expect(subject).to have_and_belong_to_many :games }

  it { expect(subject).to validate_presence_of :display_name }
  it { expect(subject).to validate_presence_of :email }
  it { expect(subject).to validate_presence_of :password_digest }

  it { expect(subject).to validate_uniqueness_of :display_name }
  it { expect(subject).to validate_uniqueness_of :email }
end
