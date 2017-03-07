import DS from 'ember-data';

export default DS.Model.extend({
  section: DS.belongsTo('section'),
  beatSchema: DS.attr('string', { defaultValue: '4' }),
  chords: DS.hasMany('chord')
});
