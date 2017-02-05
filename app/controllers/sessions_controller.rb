class SessionsController < ApplicationController
  include SessionsHelper

  skip_before_action :authenticate_user!, only: [:new, :create]

  def new
  end

  def create
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticate(params[:session][:password])
      log_in(user.id)
      set_user(user)
      # cookies.signed[:user_id] = user.id
      redirect_to root_path, :flash => { :notice => "You are logged in" }
    else
      redirect_to root_path, :flash => { :error => "You have NOT logged in!" }
    end
  end

  def delete
    session_logout
    redirect_to root_path, :flash => { :error => "You have been logged out" }
  end

end
