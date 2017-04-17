import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor-chord', 'Integration | Component | chart editor chord', {

  integration: true,

  beforeEach: function() {
    this.inject.service('store');
    const chord = this.store.createRecord('chord', { name: 'D' });
    this.set('chord', chord);
  }

});

test('it renders', function(assert) {
  this.render(hbs`{{chart-editor-chord chord=chord}}`);
  assert.equal(this.$('.chord-input').val(), 'D');
});
