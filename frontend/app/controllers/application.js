import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { filterBy } from '@ember/object/computed';
import { isBlank } from '@ember/utils';

export default Controller.extend({
	repo: service(),
	remaining: filterBy('model', 'completed', false),
	completed: filterBy('model', 'completed'),
	actions: {
		createTodo(e) {
			if (e.keyCode === 13 && !isBlank(e.target.value)) {
				get(this, 'repo').add({ title: e.target.value.trim(), completed: false });
				e.target.value = '';
			}
		},

		clearCompleted() {
			get(this, 'model').removeObjects(get(this, 'completed'));
			get(this, 'repo').persist();
		}
	}
});
