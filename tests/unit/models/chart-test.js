import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('chart', 'Unit | Model | chart', {
  needs: ['model:section']
});

test('it exists', function(assert) {
  const chart = this.subject();
  assert.ok(!!chart);
});

test('can set a title', function(assert) {
  const chart = this.subject({ title: "All of me" });
  assert.equal(chart.get('title'), "All of me");
});

test('has sections', function(assert) {

  const Chart = this.store().modelFor('chart');
  const relationship = Ember.get(Chart, 'relationshipsByName').get('sections');

  assert.equal(relationship.key, 'sections');
  assert.equal(relationship.kind, 'hasMany');

});
