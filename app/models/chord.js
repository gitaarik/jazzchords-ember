import DS from 'ember-data';

export default DS.Model.extend({
  measure: DS.belongsTo('measure'),
  name: DS.attr('string')
});
