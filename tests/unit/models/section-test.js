import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('section', 'Unit | Model | section', {
  needs: ['model:chart', 'model:line']
});

test('it exists', function(assert) {
  const section = this.subject({ name: "Intro" });
  assert.ok(!!section);
  assert.equal(section.get('name'), "Intro");
});

test('has a chart', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('section'),
    'relationshipsByName'
  ).get('chart');

  assert.equal(relationship.key, 'chart');
  assert.equal(relationship.kind, 'belongsTo');

});

test('has lines', function(assert) {

  const relationship = Ember.get(
    this.store().modelFor('section'),
    'relationshipsByName'
  ).get('lines');

  assert.equal(relationship.key, 'lines');
  assert.equal(relationship.kind, 'hasMany');

});
