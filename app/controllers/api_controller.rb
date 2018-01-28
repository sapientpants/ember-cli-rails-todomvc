class ApiController < ActionController::API
  include JSONAPI::ActsAsResourceController
  
  protect_from_forgery with: :exception
end