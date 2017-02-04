require "rails_helper"

RSpec.describe "Routing to cards", :type => :routing do

  it "routes POST /cards to cards#create" do
    expect(:post => "/cards").to route_to("cards#create")
  end

end
