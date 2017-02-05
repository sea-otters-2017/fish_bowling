Rails.application.routes.draw do
  root to: "pages#index"

  resources :users, only: [ :new, :create ]

  get    '/login', to: 'sessions#new'
  post   '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#delete'

  resources :games, param: :name, only: [ :create, :show ] do
    resources :teams, only: [ :index ]
    collection do
      post 'join'
    end
    member do
      get 'start'
      get 'start_round'
      get 'pass'
      get 'win_card'
      get 'pause'
    end
  end

  resources :cards, only: [ :create ]
  mount ActionCable.server => '/cable'

end
