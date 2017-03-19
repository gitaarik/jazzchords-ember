import { eq } from 'jazzchords/helpers/eq';
import { module, test } from 'qunit';

module('Unit | Helper | eq');

test('equal int comparison returns true', function(assert) {
  let result = eq([42, 42]);
  assert.ok(result);
});

test('equal string comparison returns true', function(assert) {
  let result = eq(['hi there', 'hi there']);
  assert.ok(result);
});

test('int/string comparison returns false', function(assert) {
  let result = eq([42, '42']);
  assert.ok(!result);
});

test('non-equal int comparison returns false', function(assert) {
  let result = eq([42, 43]);
  assert.ok(!result);
});

test('non-equal string comparison returns false', function(assert) {
  let result = eq(['hi there', 'hello there']);
  assert.ok(!result);
});

