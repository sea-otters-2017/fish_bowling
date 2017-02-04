require 'rails_helper'

RSpec.describe RoundType, type: :model do
  it { expect(subject).to have_many :rounds }

  it 'creates three unique rounds' do
    RoundType.create_round_types
    expect(RoundType.first.name).to eq 'Taboo'
    expect(RoundType.last.description).to eq 'Act out the concept without saying any words or making any noises'
  end
end
