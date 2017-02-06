class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'games_channel'
  end

  def unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast('games_channel', message: data['message'])
  end

  def broadcast(data)
    ActionCable.server.broadcast('games_channel', data)
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(
      partial: 'messages/message',
      locals: { message: message }
    )
  end
end
