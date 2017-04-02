import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('line', 'Unit | Model | line', {
  needs: ['model:section', 'model:measure']
});

test('it exists', function(assert) {
  const line = this.subject();
  assert.ok(!!line);
});

test('has a section', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('line'),
    'relationshipsByName'
  ).get('section');

  assert.equal(relationship.key, 'section');
  assert.equal(relationship.kind, 'belongsTo');

});

test('has measures', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('line'),
    'relationshipsByName'
  ).get('measures');

  assert.equal(relationship.key, 'measures');
  assert.equal(relationship.kind, 'hasMany');

});
