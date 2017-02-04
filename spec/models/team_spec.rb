require 'rails_helper'

RSpec.describe Team, type: :model do
  it { expect(subject).to belong_to :game }
  it { expect(subject).to have_and_belong_to_many :players }

  it { expect(subject).to validate_presence_of :name }
end
