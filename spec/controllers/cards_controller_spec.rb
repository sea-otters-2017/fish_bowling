require 'rails_helper'

RSpec.describe CardsController, type: :controller do

  xdescribe 'POST #create' do
    let(:create_card) do
      post :create, 
        params: { game_id: FactoryGirl.create(:game).id }, 
        session: { user_id: FactoryGirl.create(:user).id }
    end

    it 'responds with a 302 status' do
      post :create, 
        params: { game_id: FactoryGirl.create(:game).id }, 
        session: { user_id: FactoryGirl.create(:user).id }
      expect(response).to have_http_status 302
    end

    it 'sets the flash message' do
      post :create
      expect(controller).to set_flash
    end

    it 'redirects to the game' do
      post :create
      expect(controller).to redirect_to(:game)
    end
  end

end