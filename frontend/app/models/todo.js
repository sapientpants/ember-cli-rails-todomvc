import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  completed: DS.attr('boolean', { defaultValue: false })
});
