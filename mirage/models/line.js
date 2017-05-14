import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  section: belongsTo(),
  measures: hasMany()
});
