class CardsController < ApplicationController
  include SessionsHelper
  before_action :set_game, only: [:create]

  def create
    @card = Card.new(card_params)
    @card.author = session_user
    @card.game = @game
    if @card.save
      if session_user.cards_from(@game).count < 4
        flash[:notice] = "you must add #{ pluralize(4 - session_user.cards_from(@game).count, 'card') }"
      end
      redirect_to @game
    else
      redirect_to @game, notice:"Card cannot be blank."
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
