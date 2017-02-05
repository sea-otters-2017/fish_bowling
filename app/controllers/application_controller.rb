class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper
  before_action :require_login

  private
  def require_login
    if user_logged_in?
      session[:admin] = true
    else
      session[:admin] = false
    end
  end
end
