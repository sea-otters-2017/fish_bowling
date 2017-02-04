require 'rails_helper'

RSpec.describe Round, type: :model do
  it { expect(subject).to belong_to :game }
  it { expect(subject).to belong_to :round_type }
  it { expect(subject).to have_many :turns }
end
