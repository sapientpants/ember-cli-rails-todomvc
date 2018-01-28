import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { scheduleOnce } from '@ember/runloop';
import { get, set } from '@ember/object';

export default Component.extend({
	tagName: 'li',
	editing: false,
	classNameBindings: ['todo.completed', 'editing'],

	actions: {
		startEditing() {
			get(this, 'onStartEdit')();
			set(this, 'editing', true);
			scheduleOnce('afterRender', this, 'focusInput');
		},

		doneEditing(todoTitle) {
			if (!get(this, 'editing')) { return; }
			if (isBlank(todoTitle)) {
				this.send('removeTodo');
			} else {
				set(this, 'todo.title', todoTitle.trim());
				set(this, 'editing', false);
				get(this, 'onEndEdit')();
			}
		},

		handleKeydown(e) {
			if (e.keyCode === 13) {
				e.target.blur();
			} else if (e.keyCode === 27) {
				set(this, 'editing', false);
			}
		},

		toggleCompleted(e) {
			let todo = get(this, 'todo');
			set(todo, 'completed', e.target.checked);
			todo.save();
		},

		removeTodo() {
			let todo = get(this, 'todo');
			todo.destroyRecord();
		}
	},

	focusInput() {
		this.element.querySelector('input.edit').focus();
	}
});
