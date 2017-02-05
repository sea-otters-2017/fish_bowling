class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.persisted?
      redirect_to action: "show", id: @user.id
    else
      render "new"
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :display_name, :email)
  end
end
