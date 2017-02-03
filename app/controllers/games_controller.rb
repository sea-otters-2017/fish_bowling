class GamesController < ApplicationController
  before_action :authenticate_user!

  def create
    @game = Game.new(game_params)
    @game.creator = current_user
    if @game.save
      redirect_to @game
    else
      redirect_to root, notice: 'Game name has been taken'
    end
  end

  def show
    @game = Game.find(params[:id])
  end

  private
  def game_params
    params.require(:game).permit(:name)
  end

end
