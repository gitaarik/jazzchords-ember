import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  sections: DS.hasMany('section')
});
