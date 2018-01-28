class Api::TodoResource < JSONAPI::Resource
  model_name 'Todo'

  attributes :description, :completed, :created_at
end