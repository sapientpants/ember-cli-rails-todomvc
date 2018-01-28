import Controller from '@ember/controller';
import { get } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { isBlank } from '@ember/utils';

export default Controller.extend({
	remaining: filterBy('model', 'completed', false),
	completed: filterBy('model', 'completed'),
	actions: {
		createTodo(e) {
			if (e.keyCode === 13 && !isBlank(e.target.value)) {
				let todo = get(this, 'store').createRecord('todo', {
					title: e.target.value.trim()
				});
				todo.save();
				e.target.value = '';
			}
		},

		clearCompleted() {
			get(this, 'completed').forEach(todo => todo.destroyRecord());
		}
	}
});
