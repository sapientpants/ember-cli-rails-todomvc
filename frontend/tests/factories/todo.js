import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('todo', {
  default: {
    title: 'Do something!',
    completed: false
  }
});