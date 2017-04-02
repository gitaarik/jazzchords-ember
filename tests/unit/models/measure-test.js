import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('measure', 'Unit | Model | measure', {
  needs: ['model:line', 'model:chord']
});

test('can create a measure', function(assert) {

  const measure = this.subject();

  assert.ok(!!measure);

  assert.equal(
    measure.get('beatSchema'),
    '4',
    "default value of beatSchema should be '4'"
  );

});

test('can create a measure with a different beatSchema', function(assert) {
  const measure = this.subject({ beatSchema: '2-2' });
  assert.ok(!!measure);
  assert.equal(measure.get('beatSchema'), '2-2');
});

test('has a line', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('measure'),
    'relationshipsByName'
  ).get('line');

  assert.equal(relationship.key, 'line');
  assert.equal(relationship.kind, 'belongsTo');

});

test('has chords', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('measure'),
    'relationshipsByName'
  ).get('chords');

  assert.equal(relationship.key, 'chords');
  assert.equal(relationship.kind, 'hasMany');

});
