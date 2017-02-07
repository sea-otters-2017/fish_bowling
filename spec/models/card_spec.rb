require 'rails_helper'

RSpec.describe Card, type: :model do
  it { expect(subject).to belong_to :author }
  it { expect(subject).to belong_to :game }

  it { expect(subject).to validate_presence_of :concept }
  it { expect(subject).to validate_presence_of :game_id }
  it { expect(subject).to validate_presence_of :author_id }

  it 'can be put into and removed from bowl, checked with in_bowl' do
    card = FactoryGirl.create(:card)
    card.remove_from_bowl
    expect(card.in_bowl).to be false
    card.put_in_bowl
    expect(card.in_bowl).to be true
  end
end
