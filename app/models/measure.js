import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  line: DS.belongsTo('line'),
  beatSchema: DS.attr('string', { defaultValue: '4' }),
  chords: DS.hasMany('chord'),

  canRemove: Ember.computed('isLast', function() {
    return !this.get('isLast');
  }),

  isLast: Ember.computed('line.measures.length', function() {
    return this.get('line').get('measures').get('length') === 1;
  })

});
