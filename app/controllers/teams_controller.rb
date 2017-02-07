class TeamsController < ApplicationController
  include SessionsHelper
  before_action :authenticate_user!

  def index
  end

end
