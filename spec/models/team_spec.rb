require 'rails_helper'

RSpec.describe Team, type: :model do
  it { expect(subject).to belong_to :game }
  it { expect(subject).to have_and_belong_to_many :players }

  it { expect(subject).to validate_presence_of :name }

  it 'increases score' do
    expect{subject.increase_score}.to change{subject.score}.by (+ 1)
  end

  it 'lists its players' do
    user = FactoryGirl.create(:user)
    subject.players << user
    expect(subject.players_list).to be_an Array
    expect(subject.players_list[0][:id]).to eq user.id
  end
end
