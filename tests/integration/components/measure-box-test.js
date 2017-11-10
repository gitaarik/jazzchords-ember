import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('measure-box', 'Integration | Component | measure box', {

  integration: true,

  beforeEach: function() {
    this.set('oneChord', ['C']);
    this.set('twoChords', ['C', 'D']);
    this.set('threeChords', ['C', 'D', 'E']);
    this.set('fourChords', ['C', 'D', 'E', 'F']);
  }

});

test('it renders a 4 beat schema', function(assert) {
  this.render(hbs`{{measure-box beatSchema='4' chords=oneChord}}`);
  assert.ok(this.$('.measure-box').length);
  assert.equal(this.$('.measure-box .measure-chord').length, 1);
  assert.equal(this.$('.measure-box .measure-chord').text().trim(), 'C');
});

test('it renders a 2-2 beat schema', function(assert) {
  this.render(hbs`{{measure-box beatSchema='2-2' chords=twoChords}}`);
  assert.ok(this.$('.measure-box').length);
  assert.equal(this.$('.measure-box .measure-chord').length, 2);
  assert.equal(this.$('.measure-box .measure-chord:nth-child(1)').text().trim(), 'C');
  assert.equal(this.$('.measure-box .measure-chord:nth-child(2)').text().trim(), 'D');
});

test('it renders a 2-1-1 beat schema', function(assert) {
  this.render(hbs`{{measure-box beatSchema='2-1-1' chords=threeChords}}`);
  assert.ok(this.$('.measure-box').length);
  assert.equal(this.$('.measure-box .measure-chord').length, 3);
  assert.equal(this.$('.measure-box .measure-chord:nth-child(1)').text().trim(), 'C');
  assert.equal(this.$('.measure-box .measure-chord:nth-child(2)').text().trim(), 'D');
  assert.equal(this.$('.measure-box .measure-chord:nth-child(3)').text().trim(), 'E');
});

test('it renders a 1-1-2 beat schema', function(assert) {
  this.render(hbs`{{measure-box beatSchema='1-1-2' chords=threeChords}}`);
  assert.ok(this.$('.measure-box').length);
  assert.equal(this.$('.measure-box .measure-chord').length, 3);
  assert.equal(this.$('.measure-box .measure-chord:nth-child(1)').text().trim(), 'C');
  assert.equal(this.$('.measure-box .measure-chord:nth-child(2)').text().trim(), 'D');
  assert.equal(this.$('.measure-box .measure-chord:nth-child(3)').text().trim(), 'E');
});

test('it renders a 1-1-1-1 beat schema', function(assert) {
  this.render(hbs`{{measure-box beatSchema='1-1-1-1' chords=fourChords}}`);
  assert.ok(this.$('.measure-box').length);
  assert.equal(this.$('.measure-box .measure-chord').length, 4);
  assert.equal(this.$('.measure-box .measure-chord:nth-child(1)').text().trim(), 'C');
  assert.equal(this.$('.measure-box .measure-chord:nth-child(2)').text().trim(), 'D');
  assert.equal(this.$('.measure-box .measure-chord:nth-child(3)').text().trim(), 'E');
  assert.equal(this.$('.measure-box .measure-chord:nth-child(4)').text().trim(), 'F');
});
