import DS from 'ember-data';

export default DS.Model.extend({
  chart: DS.belongsTo('chart'),
  lines: DS.hasMany('lines'),
  name: DS.attr('string')
});
