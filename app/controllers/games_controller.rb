class GamesController < ApplicationController
  include SessionsHelper
  before_action :authenticate_user!
  before_action :set_game

  def create
    @game = Game.new(game_params)
    @game.creator = session_user
    if @game.save
      @game.participants << @game.creator
      redirect_to @game
    else
      redirect_to root_path, notice: "'#{@game.name}' has already been created!"
    end
  end

  def show
    @game_state = broadcast_game
    respond_to do |format|
      format.html {
        render :live
      }
      format.json {
        render json: @game_state
      }
     end
  end

  def join
    return redirect_to root_path, notice: "'#{params[:name]}' does not exist" unless @game
    return redirect_to root_path, notice: "'#{params[:name]}' is in progress" unless @game.teams.empty?
    if !@game.participants.include?(current_user)
      @game.participants << current_user
    end
    redirect_to game_path(@game)
  end

  def start
    return flash[:notice] = "you are NOT the creator of '#{@game.name}'" unless @game.creator == current_user
    CreateRandomTeams.new(@game).call if @game.teams.empty?
    redirect_to @game
  end

  def start_round
    @game.reset_cards
    end_turn
   end

  def pass
    PassCard.new(@game).call
    show
  end

  def win_card
    WinCard.new(@game).call
    if @game.bowl_empty?
      @game.current_round.finish
      return start_round unless @game.is_over?
      return show
    end
    pass
  end

  def end_turn
    StartNextTurn.new(@game).call
    show
  end

  def pause
  end

  private

  def broadcast_game
    state = @game.full_state
    ActionCable.server.broadcast( 'games_channel', { action: :updateGame, gameState: state })
    state
  end

  def game_params
    params.require(:game).permit(:name)
  end

  def set_game
    @game = Game.find_by(name: params[:name])
  end

end
