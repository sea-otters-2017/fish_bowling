class GamesController < ApplicationController
  before_action :authenticate_user!

  def create
    @game = Game.new(game_params)
    @game.creator = current_user
    if @game.save
      all_players_team = @game.teams.create(name: 'all players')
      all_players_team.save
      all_players_team.players << @game.creator
      all_players_team.save
      puts 'In create game:'
      puts
      puts
      puts @game
      puts
      puts
      p all_players_team
      puts
      puts
      p @game.teams
      puts
      puts
      p @game.teams.first
      puts
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
