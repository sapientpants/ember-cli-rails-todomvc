import Service from '@ember/service';
import { get, set } from '@ember/object';

export default Service.extend({
	lastId: 0,
	data: null,
	findAll() {
		return get(this, 'data') ||
			set(this, 'data', JSON.parse(window.localStorage.getItem('todos') || '[]'));
	},

	add(attrs) {
		let todo = Object.assign({ id: this.incrementProperty('lastId') }, attrs);
		get(this, 'data').pushObject(todo);
		this.persist();
		return todo;
	},

	delete(todo) {
		get(this, 'data').removeObject(todo);
		this.persist();
	},

	persist() {
		window.localStorage.setItem('todos', JSON.stringify(get(this, 'data')));
	}
});
