class PagesController < ApplicationController
  include SessionsHelper

  def index
    redirect_to login_path unless session_user
    @game = Game.new
  end

end
