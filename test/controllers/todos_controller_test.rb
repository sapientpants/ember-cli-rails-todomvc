require 'test_helper'

class TodosControllerTest < ActionDispatch::IntegrationTest
  def raw_todo_json(todo)
    json = <<-JSON
      {"id":"#{todo.id}","type":"todos","links":{"self":"http://www.example.com/api/todos/#{todo.id}"},"attributes":{"description":"#{todo.description}","completed":#{todo.completed.nil? ? 'null' : todo.completed},"created-at":#{todo.created_at.present? ? '"' + todo.created_at.iso8601(n=3) + '"' : 'null'}}}
    JSON
    json.strip
  end

  def todo_json(todo)
    json = <<-JSON
      {"data":#{raw_todo_json(todo)}}
    JSON
    json.strip
  end

  def todos_json(todos)
    json_fragments = todos.map {|todo| raw_todo_json(todo) }
    json = <<-JSON
      {"data":[#{json_fragments.join(',')}]}
    JSON
    json.strip
  end

  setup do
    @todo = todos(:one)
  end

  test 'should get index' do
    get api_todos_url
    assert_response :success

    todos = Todo.order('id asc')
    assert_equal todos_json(todos), @response.body
  end

  test 'should create todo' do
    description = "New todo - #{SecureRandom.hex}"
    assert_difference('Todo.count') do
      post api_todos_url, params: {
        data: {
          type: 'todos',
          attributes: {
            description: description
          }
        }
      },
      as: :json,
      headers: {
        'Accept' => JSONAPI::MEDIA_TYPE,
        'Content-Type' => JSONAPI::MEDIA_TYPE
      }
    end

    assert_response :created

    new_todo = Todo.order('created_at desc').first
    assert_equal(new_todo.description, description)

    assert_equal todo_json(new_todo), @response.body
  end

  test 'should show todo' do
    get api_todo_url(@todo)
    assert_response :success
  end

  test 'should update todo' do
    completed = true
    description = "Updated todo - #{SecureRandom.hex}"    
    patch api_todo_url(@todo), params: { 
      data: {
        type: 'todos',
        id: @todo.id,
        attributes: {
          description: description,
          completed: true
        }
      }
    },
    as: :json,
    headers: {
      'Accept' => JSONAPI::MEDIA_TYPE,
      'Content-Type' => JSONAPI::MEDIA_TYPE
    }

    assert_response :success
    @todo.reload
    assert_equal description, @todo.description
    assert @todo.completed
  end

  test 'should destroy todo' do
    assert_difference('Todo.count', -1) do
      delete api_todo_url(@todo)
    end

    assert_response :no_content
  end
end
