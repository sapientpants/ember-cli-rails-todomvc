require 'test_helper'

class TodosRoutesTest < ActionDispatch::IntegrationTest
  setup do
    @todo = todos(:one)
  end
  
  test 'GET /api/todos' do
    assert_routing(
      { method: 'get', path: 'api/todos' },
      { controller: 'api/todos', action: 'index' }
    )
  end

  test 'POST /api/todos' do
    assert_routing(
      { method: 'post', path: 'api/todos' },
      { controller: 'api/todos', action: 'create' }
    )
  end

  test 'GET /api/todos/:id' do
    assert_routing(
      { method: 'get', path: "api/todos/#{@todo.id}" },
      { controller: 'api/todos', action: 'show', id: @todo.id }
    )
  end

  test 'PATCH /api/todos/:id' do
    assert_routing(
      { method: 'patch', path: "api/todos/#{@todo.id}" },
      { controller: 'api/todos', action: 'update', id: @todo.id }
    )
  end

  test 'PUT /api/todos/:id' do
    assert_routing(
      { method: 'put', path: "api/todos/#{@todo.id}" },
      { controller: 'api/todos', action: 'update', id: @todo.id }
    )
  end

  test 'DELETE /api/todos/:id' do
    assert_routing(
      { method: 'delete', path: "api/todos/#{@todo.id}" },
      { controller: 'api/todos', action: 'destroy', id: @todo.id }
    )
  end
end