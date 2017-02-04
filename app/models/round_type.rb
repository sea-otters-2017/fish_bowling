class RoundType < ApplicationRecord
  has_many :rounds

  ALL_TYPES = {'Taboo' => 'Describe the concept without saying any of the words on the card',
               'Password' => 'Convey the concept by only saying ONE WORD!',
               'Charades' => 'Act out the concept without saying any words or making any noises'}
end
