User.delete_all
Team.delete_all
Game.delete_all
Round.delete_all
Card.delete_all
RoundType.delete_all
Turn.delete_all

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
jordan = User.create!(display_name: 'jordan',
                    email: 'jordan@email.com',
                    password: 'password' )
demo = User.create!(display_name: 'demo',
                    email: 'demo@email.com',
                    password: 'password' )

DBC_CARDS = ['Stu',
             'Jordan',
             'Cyberspace',
             'The Information Superhighway',
             'Asynchronous',
             'RSpec',
             'TDD',
             'Otters',
             'Czar',
             'Agile workflow',
             'Commit messages',
             'GitHub',
             '500 Internal Server Error',
             'Engineering Empathy',
             'Star Wars',
             'Kanto region',
             'Gong',
             'Dogtags',
             'Karaoke',
             'The King of Kran',
             'Lacey',
             'Careers',
             'Cold Outreach',
             'Full-stack'].shuffle

50.times do |time|
  game = Game.new(name: "Demo#{time + 1}")
  game.creator = demo
  game.participants << [kim, katherine, justin, pat, jordan, demo]
  game.save!
  game.participants.each_with_index do |participant, index|
    4.times do |i|
      card = participant.cards.new(concept: DBC_CARDS[i + index])
      game.cards << card
    end
  end
end
