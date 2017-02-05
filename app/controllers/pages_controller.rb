class PagesController < ApplicationController
  before_action :authenticate_user!

  def index
    # redirect_to new_user_session unless user_signed_in?
    @game = Game.new
  end

end
