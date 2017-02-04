require 'rails_helper'

RSpec.describe RoundType, type: :model do
  it { expect(subject).to have_many :rounds }
end
