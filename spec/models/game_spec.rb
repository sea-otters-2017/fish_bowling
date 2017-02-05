require 'rails_helper'

RSpec.describe Game, type: :model do
  let(:game){ FactoryGirl.create(:game) }
  let(:round){ FactoryGirl.create(:round, game: game) }
  subject { FactoryGirl.create(:game) }

  it { expect(subject).to belong_to :creator }
  it { expect(subject).to have_many :rounds }
  it { expect(subject).to have_many :teams }
  it { expect(subject).to have_and_belong_to_many :participants }

  it { expect(subject).to validate_presence_of :name }

  it 'reports the current round' do
    expect(game.rounds.first).to be_a Round
  end
end
