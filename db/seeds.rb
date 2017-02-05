User.delete_all
Team.delete_all
Game.delete_all
Round.delete_all
RoundType.delete_all
Turn.delete_all

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

Turn.create!(player: pat, round: game.rounds.first)
Turn.create!(player: kim, round: game.rounds.first)
Turn.create!(player: katherine, round: game.rounds.first)
Turn.create!(player: justin, round: game.rounds.first)
