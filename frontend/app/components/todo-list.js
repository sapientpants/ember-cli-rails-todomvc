import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
	repo: service(),
	tagName: 'section',
	elementId: 'main',
	canToggle: true,
	allCompleted: computed('todos.@each.completed', function () {
		return get(this, 'todos').isEvery('completed');
	}),

	actions: {
		enableToggle() {
			set(this, 'canToggle', true);
		},

		disableToggle() {
			set(this, 'canToggle', false);
		},

		toggleAll() {
			let allCompleted = get(this, 'allCompleted');
			get(this, 'todos').forEach(todo => set(todo, 'completed', !allCompleted));
			get(this, 'repo').persist();
		}
	}
});
