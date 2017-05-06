import { test } from 'qunit';
import moduleForAcceptance from 'jazzchords/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | charts');

test('visiting /charts', function(assert) {

  let charts = server.createList('chart', 10);
  visit('/charts');

  andThen(function() {
    assert.equal(currentURL(), '/charts');
    assert.equal(find('table.chart-table > tbody > tr').length, 10);
    assert.equal(find('table.chart-table > tbody > tr:first > td').text(), charts[0].title);
  });

});
