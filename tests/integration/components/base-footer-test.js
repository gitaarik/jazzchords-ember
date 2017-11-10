import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('base-footer', 'Integration | Component | base footer', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{base-footer}}`);
  assert.ok(this.$('.base-footer').length);
});
