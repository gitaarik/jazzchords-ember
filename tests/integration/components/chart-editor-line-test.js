import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor-line', 'Integration | Component | chart editor line', {

  integration: true,

  beforeEach: function() {

    this.inject.service('store');

    const section = this.store.createRecord('section');
    const line = this.store.createRecord('line', { section });
    const measure1 = this.store.createRecord('measure', { line, beatSchema: '4' });
    const measure2 = this.store.createRecord('measure', { line, beatSchema: '4' });
    this.store.createRecord('chord', { measure: measure1, name: 'D' });
    this.store.createRecord('chord', { measure: measure2, name: 'F7' });

    const section2 = this.store.createRecord('section');
    const fullLine = this.store.createRecord('line', { section2 });
    this.store.createRecord('measure', { line: fullLine, beatSchema: '4' });
    this.store.createRecord('measure', { line: fullLine, beatSchema: '4' });
    this.store.createRecord('measure', { line: fullLine, beatSchema: '4' });
    this.store.createRecord('measure', { line: fullLine, beatSchema: '4' });
    this.store.createRecord('measure', { line: fullLine, beatSchema: '4' });
    this.store.createRecord('measure', { line: fullLine, beatSchema: '4' });
    this.store.createRecord('measure', { line: fullLine, beatSchema: '4' });
    this.store.createRecord('measure', { line: fullLine, beatSchema: '4' });

    this.set('line', line);
    this.set('measure1', measure1);
    this.set('fullLine', fullLine);

  }

});

test('has two measures', function(assert) {
  this.render(hbs`{{chart-editor-line line=line}}`);
  assert.equal(this.$('.section-line .line-measure').length, 2);
});

test('measures have chords', function(assert) {
  this.render(hbs`{{chart-editor-line line=line}}`);
  assert.equal(this.$('.section-line .line-measure:nth(0) .measure-box .chord-big .chord-input').val(), 'D');
  assert.equal(this.$('.section-line .line-measure:nth(1) .measure-box .chord-big .chord-input').val(), 'F7');
});

test('can add measure', function(assert) {

  this.render(hbs`{{chart-editor-line line=line}}`);
  this.$('.measure-add-button').click();

  assert.equal(this.$('.section-line .line-measure').length, 3);
  assert.equal(this.$('.section-line .line-measure:nth(0) .measure-box .chord-big .chord-input').val(), 'D');
  assert.equal(this.$('.section-line .line-measure:nth(1) .measure-box .chord-big .chord-input').val(), 'F7');
  assert.equal(this.$('.section-line .line-measure:nth(2) .measure-box .chord-big .chord-input').val(), 'F7');

});

test('can remove measure', function(assert) {

  this.render(hbs`{{chart-editor-line line=line}}`);
  this.$('.section-line .line-measure:nth(1) .measure-box').click();
  this.$('.section-line .line-measure:nth(1) .measure-edit-popout .remove-measure-button').click();

  assert.equal(this.$('.section-line .line-measure').length, 1);
  assert.equal(this.$('.section-line .line-measure .measure-box .chord-big .chord-input').val(), 'D');

});

test('cannot remove last measure of only line', function(assert) {

  this.render(hbs`{{chart-editor-line line=line}}`);

  this.$('.section-line .line-measure:nth(1) .measure-box').click();
  this.$('.section-line .line-measure:nth(1) .measure-edit-popout .remove-measure-button').click();

  this.$('.section-line .line-measure:nth(0) .measure-box').click();
  assert.notOk(this.$('.section-line .line-measure:nth(0) .measure-edit-popout .remove-measure-button').length);

});

test("doesn't have add measure button when there are 8 measures", function(assert) {
  this.render(hbs`{{chart-editor-line line=fullLine}}`);
  assert.notOk(this.$('.measure-add-button').length);
});
