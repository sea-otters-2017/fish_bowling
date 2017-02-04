require 'rails_helper'

RSpec.describe Card, type: :model do
  it { expect(subject).to belong_to :author }
  it { expect(subject).to belong_to :game }

  it { expect(subject).to validate_presence_of :concept }
  it { expect(subject).to validate_presence_of :game_id }
  it { expect(subject).to validate_presence_of :author_id }
  it { expect(subject).to validate_presence_of :in_bowl }
end
