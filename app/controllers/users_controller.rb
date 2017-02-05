class UsersController < ApplicationController
  include SessionsHelper
  skip_before_action :authenticate_user!, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.persisted?
      set_user(@user)
      redirect_to root_path
    else
      render "new"
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :display_name)
  end
end
