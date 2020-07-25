import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import {
  makeList,
  setupFactoryGuy,
  mockFindAll
} from 'ember-data-factory-guy';

module('Acceptance | list todos', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  test('visiting /', async function(assert) {
    let [todo] = makeList('todo', 1);
    mockFindAll('todo').returns({ models: [todo] });
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.ok(this.element.querySelector('ul.todo-list'));
  });
});
