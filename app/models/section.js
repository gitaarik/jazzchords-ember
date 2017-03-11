import DS from 'ember-data';

export default DS.Model.extend({
  chart: DS.belongsTo('chart'),
  measures: DS.hasMany('measure'),
  name: DS.attr('string')
});
