import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor-section', 'Integration | Component | chart editor section', {

  integration: true,

  beforeEach: function() {

    this.inject.service('store');

    this.section = this.store.createRecord('section');
    const measure = this.store.createRecord('measure', { beatSchema: '4' });
    const chord = this.store.createRecord('chord', { name: 'D' });

    measure.get('chords').pushObject(chord);
    this.section.get('measures').pushObject(measure);
    this.set('section', this.section);

  }

});

test('has a chord', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  assert.equal(this.$('.chord-big').text().trim(), 'D');
});

test('has one measure', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  assert.equal(this.$('.measure-box').length, 1);
});

test('can add measure', function(assert) {

  this.render(hbs`{{chart-editor-section section=section}}`);
  this.$('.measure-add-button').click();

  assert.equal(this.$('.measure-box').length, 2);
  assert.equal(this.$('.measure-box:nth-child(1) .chord-big').text().trim(), 'D');
  assert.equal(this.$('.measure-box:nth-child(2) .chord-big').text().trim(), 'D');

});
