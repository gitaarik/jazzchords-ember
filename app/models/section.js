import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  chart: DS.belongsTo('chart'),
  lines: DS.hasMany('lines'),
  name: DS.attr('string'),

  canRemove: Ember.computed('isLast', function() {
    return !this.get('isLast');
  }),

  isLast: Ember.computed('chart.sections.length', function() {
    return this.get('chart').get('sections').get('length') === 1;
  })

});
