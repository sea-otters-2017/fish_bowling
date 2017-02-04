class CardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game, only: [:create]

  def create
    @card = Card.new(card_params)
    @card.author = current_user
    @card.game = @game
    if @card.save
      if current_user.cards_from(@game).count < 4
        flash[:notice] = "you must add #{ 4 - current_user.cards_from(@game).count } cards"
      end
      redirect_to @game
      return
    else
      redirect_to root_path, notice: 'Game has been created'
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
