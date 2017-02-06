class CardsController < ApplicationController
  include SessionsHelper
  before_action :set_game, only: [:create]

  def create
    @card = Card.new(card_params)
    @card.author = session_user
    @card.game = @game
    if @card.save
      redirect_to @game
      return
    else
      redirect_to @game, notice: 'card did not save'
    end
  end

  private

  def card_params
    params.require(:card).permit(:concept)
  end

  def set_game
    @game = Game.find(params[:game_id])
  end

end
