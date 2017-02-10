class SessionsController < ApplicationController
  include SessionsHelper
  skip_before_action :authenticate_user!, only: [:new, :create, :delete]

  def new
  end

  def create
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticate(params[:session][:password])
      log_in(user.id)
      set_user(user)
      # cookies.signed[:user_id] = user.id
      redirect_to root_path, :flash => { :notice => "Hello, #{user.display_name}! You are now logged in." }
    else
      redirect_to root_path, :flash => { :notice => "You have NOT logged in! Invalid email or password." }
    end
  end

  def delete
    session_logout
    log_out
    redirect_to root_path, :flash => { :alert => "You have been logged out" }
  end

end
