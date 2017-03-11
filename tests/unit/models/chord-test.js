import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('chord', 'Unit | Model | chord', {
  needs: ['model:measure']
});

test('can create a chord', function(assert) {
  const chord = this.subject({ name: 'C7' });
  assert.ok(!!chord);
  assert.equal(chord.get('name'), 'C7');
});

test('has a measure', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('chord'),
    'relationshipsByName'
  ).get('measure');

  assert.equal(relationship.key, 'measure');
  assert.equal(relationship.kind, 'belongsTo');

});
