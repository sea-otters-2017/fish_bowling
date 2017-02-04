require "rails_helper"

RSpec.describe "Routing to teams", :type => :routing do

  it "routes GET /games/name/teams to teams#index" do
    expect(:get => "/games/name/teams").to route_to("teams#index", :game_name => "name")
  end

end
