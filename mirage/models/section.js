import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  chart: belongsTo(),
  lines: hasMany()
});
