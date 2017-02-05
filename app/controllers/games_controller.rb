class GamesController < ApplicationController
  include SessionsHelper
  before_action :set_game, only: [:show, :join, :start, :start_round]

  def create
    @game = Game.new(game_params)
    @game.creator = session_user
    if @game.save
      @game.participants << @game.creator
      redirect_to @game
    else
      redirect_to root_path, notice: 'Game has been created'
    end
  end

  def show
    @game = Game.find_by(name: params[:name])
    response = ApplicationController.render(
      layout: false,
      template: 'games/show',
      assigns: { game: @game, current_user: session_user, start_game_path: "games/#{@game.name}/start"}
    )
    ActionCable.server.broadcast('game_channel', message: response)
  end

  def join
    return redirect_to root_path, notice: 'That game has not been created' unless @game
    @game.participants << session_user unless @game.participants.exists?(session_user)
    redirect_to @game
  end

  def start
    return flash[:notice] = 'you are NOT the creator' unless @game.creator == session_user
    CreateRandomTeams.new(@game).call if @game.teams.empty?
    flash[:notice] = "it has started"
    render :'teams/index', game: @game
  end

  def start_round
    render :'games/gameplay', game: @game
  end

  private

  def game_params
    params.require(:game).permit(:name)
  end

  def set_game
    @game = Game.find_by(name: params[:name])
  end

end
