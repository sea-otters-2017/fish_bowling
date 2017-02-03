class GamesController < ApplicationController
  before_action :authenticate_user!

  def create
    @game = Game.new(game_params)
    @game.creator = current_user
    if @game.save
      @game.participants << @game.creator
      redirect_to @game
    else
      redirect_to root_path, notice: 'Game has been created'
    end
  end

  def show
    @game = Game.find_by(name: params[:name])
  end

  private
  def game_params
    params.require(:game).permit(:name)
  end

end
