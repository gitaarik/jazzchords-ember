import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  section: DS.belongsTo('section'),
  measures: DS.hasMany('measure'),

  isLast: Ember.computed('section.lines.length', function() {
    return this.get('section').get('lines').get('length') === 1;
  })

});
