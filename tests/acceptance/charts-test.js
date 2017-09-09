import { test } from 'qunit';
import moduleForAcceptance from 'jazzchords/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | charts');

test('visiting /charts', function(assert) {

  let charts = server.createList('chart', 10);
  visit('/charts');

  andThen(function() {

    assert.equal(currentURL(), '/charts');
    assert.equal(find('.chart-list-item').length, 10);

    assert.equal(
      find('.chart-list-item:first .chart-list-item-link-song-name').text(),
      charts[0].title
    );

  });

});
