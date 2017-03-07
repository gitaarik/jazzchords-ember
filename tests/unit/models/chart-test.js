import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('chart', 'Unit | Model | chart', {
  // Specify the other units that are required for this test.
  needs: ['model:section']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('can set a title', function(assert) {
  let model = this.subject({ title: "All of me" });
  assert.equal(model.get('title'), "All of me");
});

test('has sections', function(assert) {

  const Chart = this.store().modelFor('chart');
  const relationship = Ember.get(Chart, 'relationshipsByName').get('sections');

  assert.equal(relationship.key, 'sections');
  assert.equal(relationship.kind, 'hasMany');

});
