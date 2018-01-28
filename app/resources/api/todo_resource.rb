class Api::TodoResource < JSONAPI::Resource
  model_name 'Todo'

  attributes :title, :completed, :created_at
end