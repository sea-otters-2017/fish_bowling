require 'rails_helper'

RSpec.describe Round, type: :model do
  let(:round) { FactoryGirl.create(:round) }
  let!(:old_turn) { FactoryGirl.create(:turn) }
  let(:new_turn) { FactoryGirl.create(:turn) }

  it { expect(subject).to belong_to :game }
  it { expect(subject).to belong_to :round_type }
  it { expect(subject).to have_many :turns }

  it 'returns the most recent turn' do
    round.turns << new_turn
    round.turns << old_turn
    expect(round.last_turn).to eq new_turn
  end
end
