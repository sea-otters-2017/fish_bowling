class ApplicationController < ActionController::Base
  #protect_from_forgery with: :exception
  before_action :authenticate_user!
  helper_method :current_user, :logged_in?, :log_in


  def pluralize(count, noun, text = nil)
    if count != 0
      count == 1 ? "a #{noun}#{text}" : "#{count} #{noun.pluralize}#{text}"
    end
  end

  def current_user
    @current_user ||= User.find(cookies.signed[:user_id]) if cookies.signed[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def log_in(user_id)
    cookies.signed[:user_id] = user_id
  end

  def log_out
    cookies.signed[:user_id] = nil
  end

  protected

  def authenticate_user!
    redirect_to login_path unless logged_in?
  end
end

