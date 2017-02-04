Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }
  root to: "pages#index"
  resources :games, param: :name, only: [ :create, :show ] do
    resources :teams, only: [ :index ]
    collection do
      post 'join'
    end
    member do
      get 'start'
      get 'start_round'
    end
  end

end
