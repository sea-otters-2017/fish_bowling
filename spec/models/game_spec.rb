require 'rails_helper'

RSpec.describe Game, type: :model do
  subject { FactoryGirl.create(:game) }

  it { expect(subject).to belong_to :creator }
  it { expect(subject).to have_many :rounds }
  it { expect(subject).to have_many :teams }
  it { expect(subject).to have_and_belong_to_many :participants }

  it { expect(subject).to validate_presence_of :name }

  it 'reports the current round' do
    round = subject.rounds.first
    expect(subject.current_round).to eq round
    # round.finish
    # expect(subject.current_round).not_to eq round
  end

  it 'is not ready with no players or cards' do
    expect(subject.ready?).to be false
  end

  it '4 is the minimum number of players' do
    4.times { subject.participants << FactoryGirl.create(:user) }
    expect(subject.minimum_players?).to be true
  end

  it 'returns a cluegiver' do
    4.times { subject.participants << FactoryGirl.create(:user) }
    CreateRandomTeams.new(subject).call
    expect(subject.get_cluegiver).to be_a User
  end

  it 'returns a random card from the bowl' do
    subject.cards << FactoryGirl.create(:card)
    expect(subject.random_card).to be_a Card
  end
end
