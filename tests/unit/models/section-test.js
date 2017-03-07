import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('section', 'Unit | Model | section', {
  // Specify the other units that are required for this test.
  needs: ['model:chart', 'model:measure']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('has a chart', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('section'),
    'relationshipsByName'
  ).get('chart');

  assert.equal(relationship.key, 'chart');
  assert.equal(relationship.kind, 'belongsTo');

});

test('has measures', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('section'),
    'relationshipsByName'
  ).get('measures');

  assert.equal(relationship.key, 'measures');
  assert.equal(relationship.kind, 'hasMany');

});
