class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'games_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast('games_channel', message: data['message'])
    # ActionCable.server.broadcast('game_channel', message: render_message(data['message']))
  end

  def broadcast(game)
    ActionCable.server.broadcast('games_channel', game.full_state)
  end

  # def broadcast(message)
  #   ActionCable.server.broadcast('game_channel', message)
  # end

  private

  def render_message(message)
    ApplicationController.renderer.render(
      partial: 'messages/message',
      locals: { message: message }
    )
  end
end
