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
    @game = Game.find_by(name: params[:name])
    if !@game.turns.empty?
      render :live
    elsif !@game.teams.empty?
      render 'teams/index'
    end
  end

  def join
    return redirect_to root_path, notice: "'#{params[:name]}' does not exist" unless @game
    return redirect_to root_path, notice: "'#{params[:name]}' is in progress" unless @game.teams.empty?
    if !@game.participants.include?(current_user)
      @game.participants << current_user
      ActionCable.server.broadcast( 'games_channel',
                                    {   action: 'newPlayer',
                                        player: current_user.display_name,
                                        player_id: current_user.id } )
    end
    redirect_to @game
  end

  def start
    return flash[:notice] = "you are NOT the creator of '#{@game.name}'" unless @game.creator == current_user
    CreateRandomTeams.new(@game).call if @game.teams.empty?
    response = ApplicationController.render(
      layout: false,
      template: 'teams/index',
      assigns: { game: @game, current_user: current_user, start_round_path: "games/#{@game.name}/start_round"}
    )
    ActionCable.server.broadcast( 'games_channel',
                                  {   action: 'showTeams',
                                      response: response } )
    render 'teams/index'
  end

  def start_round
    StartRound.new(@game).call
    broadcast_live
    broadcast_game
    render :live, game: @game
   end

  def pass
    PassCard.new(@game).call
    @game_state = broadcast_game
    respond_to do |format|
      format.html {
        render :show
      }
      format.json {
        render json: @game_state
      }
     end
  end

  def win_card
    # @game.last_turn_team.increase_score
    # @turn = @game.current_round.last_turn
    # @card = @game.cards.where(in_bowl: true).where(concept: params['card_concept']).first
    # @card.remove_from_bowl
    if @game.bowl_empty?
      @game.current_round.finish
      return start_round unless @game.is_over?
      return
    end
    if @game.is_over?
      return render :'games/results', game: @game
    else
      @card = @game.random_card
      @turn.cards << @card
      @cluegiver = @turn.player
      refreshDisplay
      return render :'games/gameplay', game: @game
    end
    # broadcast_game
  end

  def pause
  end

  private

  # BROADCAST GAME WILL SEND THE JSON MAINTAINING THE FULL STATE OF THE GAME
  def broadcast_game
    state = @game.full_state
    ActionCable.server.broadcast( 'games_channel', { action: :updateGame, gameState: state })
    state
  end

  def broadcast_live
    response = ApplicationController.render(
      layout: false,
      template: 'games/live',
      assigns: { game: @game, current_user: current_user }
    )
    ActionCable.server.broadcast( 'games_channel',
                                  { action: 'updateLive',
                                    response: response } )
  end

  def game_params
    params.require(:game).permit(:name)
  end

  def set_game
    @game = Game.find_by(name: params[:name])
  end

end
