Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }
  resources :homes, only: [ :index ]
  root to: "homes#index"
end
