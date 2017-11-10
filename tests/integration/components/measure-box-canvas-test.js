import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('measure-box-canvas', 'Integration | Component | measure box canvas', {
  integration: true
});

test('it renders a canvas element', function(assert) {
  this.render(hbs`{{measure-box-canvas}}`);
  assert.ok(this.$('canvas').length);
});
