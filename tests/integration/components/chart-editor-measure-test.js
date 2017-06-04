import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor-measure', 'Integration | Component | chart editor measure', {

  integration: true,

  beforeEach: function() {

    this.inject.service('store');

    const line = this.store.createRecord('line');
    const measure = this.store.createRecord('measure', { line, beatSchema: '4' });

    this.store.createRecord('chord', {
      measure,
      name: 'D'
    });

    this.set('measure', measure);

  }

});

test('it renders', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measure}}`);
  assert.equal(this.$('.line-measure .measure-box .chord-input').val(), 'D');
});

test('opens measure edit popout', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measure}}`);
  this.$('.line-measure .measure-box').click();
  assert.ok(this.$('.line-measure .measure-edit-popout').length);
});

test('close measure edit popout', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measure}}`);
  this.$('.line-measure .measure-box').click();
  this.$('.line-measure .measure-edit-popout .popout-close-button').click();
  assert.notOk(this.$('.line-measure .measure-box .measure-edit-popout').length);
});
