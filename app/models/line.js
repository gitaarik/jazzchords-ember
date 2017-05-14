import DS from 'ember-data';

export default DS.Model.extend({
  section: DS.belongsTo('section'),
  measures: DS.hasMany('measure')
});
