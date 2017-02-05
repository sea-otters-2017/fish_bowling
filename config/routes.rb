Rails.application.routes.draw do
  root to: "pages#index"

  get    '/login', to: 'sessions#new'
  post   '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

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

  resources :cards, only: [ :create ]

end
