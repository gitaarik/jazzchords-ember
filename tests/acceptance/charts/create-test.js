import { test } from 'qunit';
import moduleForAcceptance from 'jazzchords/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | charts/create');

test('visiting /charts/create', function(assert) {
  visit('/charts/create');

  andThen(function() {
    assert.equal(currentURL(), '/charts/create');
  });
});

test('has default title', function(assert) {

  visit('/charts/create');

  andThen(function() {
    assert.equal($('.chart-editor .chart-title-input').val(), "New chart");
  });

});

test('has default chart with one chord', function(assert) {
  visit('/charts/create');

  andThen(function() {
    assert.equal($('.chord-big .chord-input').val(), 'C');
  });
});
