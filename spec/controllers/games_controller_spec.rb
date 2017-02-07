require 'rails_helper'

RSpec.describe GamesController, type: :controller do

  describe "POST #create" do
    let(:successful_create) do
      post :create, params: { game: { name: 'game-name' } }
    end
    let(:unsuccessful_create) do
      post :create, params: { }
    end
    describe 'for a successful create' do
      it "responds with status code 302" do
        successful_create
        expect(response).to have_http_status 302
      end
    end
  end

end
