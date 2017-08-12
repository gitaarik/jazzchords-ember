import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor-measure', 'Integration | Component | chart editor measure', {

  integration: true,

  beforeEach: function() {

    this.inject.service('store');

    const section = this.store.createRecord('section');
    const line = this.store.createRecord('line', { section });

    const measure = this.store.createRecord('measure', { line, beatSchema: '4' });
    this.store.createRecord('chord', { measure, name: 'D' });

    const measureWith2Chords = this.store.createRecord('measure', { line, beatSchema: '2-2' });

    this.store.createRecord('chord', {
        measure: measureWith2Chords,
        name: 'D'
    });

    this.store.createRecord('chord', {
        measure: measureWith2Chords,
        name: 'F7'
    });

    this.set('measure', measure);
    this.set('measureWith2Chords', measureWith2Chords);

  }

});

test('it renders', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measure}}`);
  assert.equal(this.$('.line-measure .measure-box .chord-input').val(), 'D');
});

test('chord of measure with one chord has .chord-big class', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measure}}`);
  assert.ok(this.$('.line-measure .measure-box .measure-chord').hasClass('chord-big'));
});

test('opens measure edit popout', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measure}}`);
  this.$('.line-measure .measure-box').click();
  assert.ok(this.$('.line-measure .measure-edit-popout').length);
});

test("doesn't open measure edit popout when clicking on the chord input", function(assert) {
  // this test doesn't seem to work correctly, but will keep it here just in case..
  this.render(hbs`{{chart-editor-measure measure=measure}}`);
  this.$('.line-measure .measure-box .chord-input').click();
  assert.notOk(this.$('.line-measure .measure-edit-popout').length);
});

test('close measure edit popout', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measure}}`);
  this.$('.line-measure .measure-box').click();
  this.$('.line-measure .measure-edit-popout .popout-close-button').click();
  assert.notOk(this.$('.line-measure .measure-box .measure-edit-popout').length);
});

test('measure with two chords has two chords', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measureWith2Chords}}`);
  assert.equal(this.$('.line-measure .measure-box .measure-chord').length, 2);
});

test('chords of measure with two chords have .chord-medium class', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measureWith2Chords}}`);
  assert.ok(this.$('.line-measure .measure-box .measure-chord').hasClass('chord-medium'));
});

test('measure with two chords contains a canvas element which draws the division line', function(assert) {
  this.render(hbs`{{chart-editor-measure measure=measureWith2Chords}}`);
  assert.ok(this.$('.line-measure .measure-box canvas').length);
});

test('change measure beatSchema through measure edit popout', function(assert) {

  this.render(hbs`{{chart-editor-measure measure=measure}}`);
  this.$('.line-measure .measure-box').click();
  this.$('.line-measure .measure-edit-popout .beat-schemas .beat-schema-2-2').click();

  assert.equal(this.get('measure').get('beatSchema'), '2-2');
  assert.equal(this.get('measure').get('chords').objectAt('0').get('name'), 'D');
  assert.equal(this.get('measure').get('chords').objectAt('1').get('name'), 'D');

});
