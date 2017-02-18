class GamesController < ApplicationController
  include SessionsHelper
  before_action :authenticate_user!
  before_action :set_game
  before_action :set_seconds_remaining, only: [:pass, :win_card, :pause, :unpause, :next_turn]

  def create
    if game_params[:name].downcase == 'demo'
      @game = CreateDemoGame.new(session_user).call
      redirect_to @game and return
    end
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
    if request.xhr?
      render json: @game_state and return
    else
      render :live and return
    end
  end

  def join
    return redirect_to root_path, notice: "'#{params[:name]}' does not exist" unless @game
    if (!@game.teams.empty? && !@game.is_over?)
      return redirect_to root_path, notice: "'#{params[:name]}' is in progress"
    end
    if !@game.participants.include?(current_user)
      @game.participants << current_user
    end
    redirect_to @game
  end

  def start
    return flash[:notice] = "you are NOT the creator of '#{@game.name}'" unless @game.creator == current_user
    CreateRandomTeams.new(@game).call if @game.teams.empty?
    redirect_to @game
  end

  def start_round
    state = @game.full_state
    ActionCable.server.broadcast("game_#{params['name']}", { action: :beforeRound, gameState: state })
    sleep 10
    @game.update_attribute(:is_paused, false)
    @game.reset_cards
    next_turn
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

  def next_turn
    StartNextTurn.new(@game).call
    state = @game.full_state
    ActionCable.server.broadcast( "game_#{params['name']}", { action: :setCountDown, gameState: state })
    sleep 5
    show
  end

  def pause
    @game.update_attribute(:is_paused, true)
    show
  end

  def unpause
    @game.update_attribute(:is_paused, false)
    show
  end

  def buzz
    ActionCable.server.broadcast( "game_#{params['name']}", { action: :buzz })
  end

  private

  def broadcast_game
    state = @game.full_state
    if !@game.turns.empty? && !@game.is_over?
      ActionCable.server.broadcast( "game_#{params['name']}", { action: :setTimer, gameState: state })
    end
    ActionCable.server.broadcast( "game_#{params['name']}", { action: :updateGame, gameState: state })
    state
  end

  def game_params
    params.require(:game).permit(:name)
  end

  def set_game
    @game = Game.find_by(name: params[:name])
  end

  def set_seconds_remaining
    @seconds_remaining = params[:timeLeft]
    @game.last_turn.update_attribute(:seconds_remaining, @seconds_remaining)
    @game.save
  end

end
