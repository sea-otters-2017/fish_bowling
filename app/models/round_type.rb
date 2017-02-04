class RoundType < ApplicationRecord
  has_many :rounds

  ALL_TYPES = {'Taboo' => 'Describe the concept without saying any of the words on the card',
               'Password' => 'Convey the concept by only saying ONE WORD!',
               'Charades' => 'Act out the concept without saying any words or making any noises'}

  def self.create_round_types
    ALL_TYPES.each_pair do |name, description|
      RoundType.find_or_create_by(name: name, description: description)
    end
  end
end
