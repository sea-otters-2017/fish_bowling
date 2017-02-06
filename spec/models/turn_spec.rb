require 'rails_helper'

RSpec.describe Turn, type: :model do
  it { expect(subject).to belong_to :round }
  it { expect(subject).to belong_to :player }

  it { expect(subject).to validate_presence_of :round_id }
  it { expect(subject).to validate_presence_of :player_id }
end
