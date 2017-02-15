class PagesController < ApplicationController
  include SessionsHelper
  skip_before_action :authenticate_user!, only: [:about]

  def index
    redirect_to login_path unless session_user
    @game = Game.new
  end

  def about
    render :about
  end

end
