require 'rails_helper'

RSpec.describe Turn, type: :model do
  it { expect(subject).to belong_to :round }
  it { expect(subject).to belong_to :player }
end
