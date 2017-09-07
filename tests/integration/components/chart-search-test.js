import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-search', 'Integration | Component | chart search', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{chart-search}}`);
  assert.ok(this.$('.chart-search').length);
});
