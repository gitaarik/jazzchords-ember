import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('measure', 'Unit | Model | measure', {
  // Specify the other units that are required for this test.
  needs: ['model:section', 'model:chord']
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

test('has a section', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('measure'),
    'relationshipsByName'
  ).get('section');

  assert.equal(relationship.key, 'section');
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
