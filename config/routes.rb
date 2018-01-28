Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    jsonapi_resources :todos
  end

  mount_ember_app :frontend, to: "/"
end
