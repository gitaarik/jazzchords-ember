import DS from 'ember-data';

export default DS.Model.extend({
  line: DS.belongsTo('line'),
  beatSchema: DS.attr('string', { defaultValue: '4' }),
  chords: DS.hasMany('chord')
});
