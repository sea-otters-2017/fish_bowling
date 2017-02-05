class SessionsController < ApplicationController
  include SessionsHelper

  def new
  end

  def create
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticate(params[:session][:password])
      set_user(user)
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
