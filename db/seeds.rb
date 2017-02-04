# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.delete_all
Game.delete_all
Team.delete_all

# RoundType.create!(name: 'Taboo', description: 'Describe the concept without saying any of the words on the card')
# RoundType.create!(name: 'Password', description: 'Convey the concept by only saying ONE WORD!')
# RoundType.create!(name: 'Charades', description: 'Act out the concept without saying any words or making any noises')

20.times do |n|
  user = User.create!(  display_name: Faker::GameOfThrones.character,
                        email: Faker::Internet.email,
                        password: 'password' )
end

5.times do |n|
  game = Game.new(  name: "#{Faker::StarWars.droid}#{rand(100..999)}" )
  game.creator = User.all.sample
  game.save!
  5.times do
    user = User.all.sample
    if !game.participants.exists?(user)
      game.participants << user
    end
  end
end

# Otter Game

kim = User.create!( display_name: 'kim',
                    email: 'kim@email.com',
                    password: 'password' )
katherine = User.create!( display_name: 'katherine',
                    email: 'katherine@email.com',
                    password: 'password' )
justin = User.create!( display_name: 'justin',
                    email: 'justin@email.com',
                    password: 'password' )
pat = User.create!( display_name: 'pat',
                    email: 'pat@email.com',
                    password: 'password' )

game = Game.new(name: 'Otters')
game.creator = pat
game.participants << [kim, katherine, justin, pat]
game.save
