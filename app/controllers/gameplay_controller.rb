class GameplayController < ApplicationController
  def index
    state = Game.last.full_state
    @game_props = { action: :setTimer, gameState: state }
  end
end
