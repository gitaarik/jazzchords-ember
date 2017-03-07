import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('chord', 'Unit | Model | chord', {
  // Specify the other units that are required for this test.
  needs: ['model:measure']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('has a measure', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('chord'),
    'relationshipsByName'
  ).get('measure');

  assert.equal(relationship.key, 'measure');
  assert.equal(relationship.kind, 'belongsTo');

});
