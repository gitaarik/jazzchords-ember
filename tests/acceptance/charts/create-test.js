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
    assert.equal(find('.charts .create .title').attr('value'), 'New chart');
  });
});

test('has default chart with one chord', function(assert) {
  visit('/charts/create');

  andThen(function() {
    assert.equal(find('.charts .create .sections .section:first .measures .measure:first .chords .chord:first').text(), 'C');
  });
});
