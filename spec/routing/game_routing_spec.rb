require "rails_helper"

RSpec.describe "Routing to games", :type => :routing do

  it "routes GET /games/name to games#show" do
    expect(:get => "/games/name").to route_to("games#show", :name => "name")
  end

  it "routes POST /games to games#create" do
    expect(:post => "/games").to route_to("games#create")
  end

  it "routes POST /games/join to games#join" do
    expect(:post => "/games/join").to route_to("games#join")
  end

  it "routes POST /games/name/start to games#start" do
    expect(:post => "/games/name/start").to route_to("games#start", :name => "name")
  end

  it "routes POST /games/name/start to games#start_round" do
    expect(:post => "/games/name/start_round").to route_to("games#start_round", :name => "name")
  end

end
