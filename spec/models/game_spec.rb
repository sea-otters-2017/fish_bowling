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
    round.finish
    expect(subject.current_round).not_to eq round
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

  context 'cards in the bowl' do
    it 'has no #cards_added?' do
      subject.participants << FactoryGirl.create(:user)
      expect(subject.cards_added?).to be false
    end

    it 'has #cards_added?' do
      4.times {subject.cards << FactoryGirl.create(:card, author: FactoryGirl.create(:user)) }
      expect(subject.cards_added?).to be true
    end

    it 'returns a random card from the bowl' do
      subject.cards << FactoryGirl.create(:card)
      expect(subject.random_card).to be_a Card
    end
    
    it 'knows if its bowl is empty and resets cards' do
      subject.cards << FactoryGirl.create(:card, in_bowl: false)
      expect(subject.bowl_empty?).to be true
      subject.reset_cards
      expect(subject.bowl_empty?).to be false
    end
  end

  it 'lists an array of players who haven\'t added cards yet' do
    4.times { subject.participants << FactoryGirl.create(:user) }
    expect(subject.unfinished_players).to be_an Array
  end

  it 'has a full_state object' do
    CreateRandomTeams.new(subject).call
    expect(subject.full_state).to be_a Hash
  end
end
