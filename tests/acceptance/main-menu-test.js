import { test } from 'qunit';
import moduleForAcceptance from 'jazzchords/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('menu item "all charts" links to all charts page', function(assert) {

  visit('/');
  click(
    '.base-header ' +
    '.main-menu ' +
    '.main-menu-item-all-charts ' +
    '.main-menu-item-text'
  );

  andThen(function() {
    assert.equal(currentURL(), '/charts');
  });

});
