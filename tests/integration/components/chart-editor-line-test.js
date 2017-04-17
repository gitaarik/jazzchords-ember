import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor-line', 'Integration | Component | chart editor line', {

  integration: true,

  beforeEach: function() {

    this.inject.service('store');

    const line = this.store.createRecord('line');
    const measure = this.store.createRecord('measure', { beatSchema: '4' });
    const chord = this.store.createRecord('chord', { name: 'D' });

    measure.get('chords').pushObject(chord);
    line.get('measures').pushObject(measure);

    this.set('line', line);

  }

});

test('has a chord', function(assert) {
  this.render(hbs`{{chart-editor-line line=line}}`);
  assert.equal(this.$('.chord-big .chord-input').val(), 'D');
});

test('has one measure', function(assert) {
  this.render(hbs`{{chart-editor-line line=line}}`);
  assert.equal(this.$('.measure-box').length, 1);
});

test('can add measure', function(assert) {

  this.render(hbs`{{chart-editor-line line=line}}`);
  this.$('.measure-add-button').click();

  assert.equal(this.$('.measure-box').length, 2);
  assert.equal(this.$('.measure-box:nth-child(1) .chord-big .chord-input').val(), 'D');
  assert.equal(this.$('.measure-box:nth-child(2) .chord-big .chord-input').val(), 'D');

});
