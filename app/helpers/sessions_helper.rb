module SessionsHelper

  def set_user(user)
    session[:user_id] = user.id
  end

  def user_logged_in?
    return true if session[:user_id]
    false
  end

  def logout
    session[:user_id] = nil
  end

end
