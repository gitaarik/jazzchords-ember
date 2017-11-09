import { test } from 'qunit';
import moduleForAcceptance from 'jazzchords/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | charts/chart-search-test');

test('find an existing chart', function(assert) {

  server.create('chart', {title: "All Of Me"});

  visit('/');
  fillIn('.chart-search-input', "all of");
  triggerEvent('.chart-search-input', 'keyup');

  andThen(function() {

    assert.ok(find('.chart-search-results').length);
    assert.equal(find('.chart-search-results .chart-search-result').length, 1);

    assert.equal(
      find('.chart-search-results .chart-search-result:first-child').text().trim(),
      'All Of Me'
    );

  });

});

test('show "no results" element when not finding any matches', function(assert) {

  server.create('chart', {title: "All Of Me"});

  visit('/');
  fillIn('.chart-search-input', "bla die bla");
  triggerEvent('.chart-search-input', 'keyup');

  andThen(function() {
    assert.ok(find('.chart-search-results .chart-search-no-results').length);
  });

});

test("find 2 correct matches", function(assert) {

  server.create('chart', {title: "All Of Me"});
  server.create('chart', {title: "All Of You"});
  server.create('chart', {title: "None Of Me"});
  server.create('chart', {title: "None Of You"});
  server.create('chart', {title: "None Of Us"});

  visit('/');
  fillIn('.chart-search-input', "all of");
  triggerEvent('.chart-search-input', 'keyup');

  andThen(function() {

    assert.ok(find('.chart-search-results').length);
    assert.equal(find('.chart-search-results .chart-search-result').length, 2);

    assert.equal(
      find('.chart-search-results .chart-search-result:first-child').text().trim(),
      'All Of Me'
    );

    assert.equal(
      find('.chart-search-results .chart-search-result:nth-child(2)').text().trim(),
      'All Of You'
    );

  });

});

test('result links to chart page and closes results pane', function(assert) {

  const chart = server.create('chart', {title: "All Of Me"});

  visit('/');
  fillIn('.chart-search-input', "all of");
  triggerEvent('.chart-search-input', 'keyup');

  andThen(function() {

    assert.equal(currentPath(), 'index');
    click(
      '.chart-search-results ' +
      '.chart-search-result:first-child ' +
      '.chart-search-result-link'
    );

    andThen(function() {
      assert.equal(currentPath(), 'charts.chart');
      assert.equal(currentURL(), '/charts/' + chart.id);
      assert.notOk(find('.chart-search-results').length);
    });

  });

});

test("when there's only one result, it is automatically focussed", function(assert) {

  server.create('chart', {title: "All Of Me"});

  visit('/');
  fillIn('.chart-search-input', "all");
  triggerEvent('.chart-search-input', 'keyup');

  andThen(function() {
    assert.ok(
      find(
        '.chart-search-results ' +
        '.chart-search-result:first-child' +
        '.chart-search-result-focussed'
      ).length
    );
  });

});

test(
  "when hitting enter when there's only one " +
  "result, it should navigate to that chart, " +
  "and close the results popup",
  function(assert) {

    const chart = server.create('chart', {title: "All Of Me"});

    visit('/');
    fillIn('.chart-search-input', "all of");
    triggerEvent('.chart-search-input', 'keyup');

    andThen(function() {

      assert.ok(find('.chart-search-results').length);
      assert.equal(currentPath(), 'index');
      keyEvent('.chart-search-input', 'keyup', 13); // press enter

      andThen(function() {
        assert.equal(currentPath(), 'charts.chart');
        assert.equal(currentURL(), '/charts/' + chart.id);
        assert.notOk(find('.chart-search-results').length);
      });

    });

  }
);

test(
  'results box closes when clicking outside search widget and opens again ' +
  'when clicking on search input',
  function(assert) {

    server.create('chart', {title: "All Of Me"});

    visit('/');
    fillIn('.chart-search-input', "all of");
    triggerEvent('.chart-search-input', 'keyup');

    andThen(function() {

      assert.ok(find('.chart-search-results').length);
      click('.site-content');

      andThen(function() {

        assert.notOk(find('.chart-search-results').length);
        click('.chart-search-input');

        andThen(function() {
          assert.ok(find('.chart-search-results').length);
        });

      });

    });

  }
);

test(
  'results box closes when hitting Esc ' +
  'and opens again when clicking on it',
  function(assert) {

    server.create('chart', {title: "All Of Me"});

    visit('/');
    fillIn('.chart-search-input', "all of");
    triggerEvent('.chart-search-input', 'keyup');

    andThen(function() {
      assert.ok(find('.chart-search-results').length);
      keyEvent('.chart-search-input-container', 'keypress', 27).then(function() {
        assert.notOk(find('.chart-search-results').length);
        click('.chart-search-input').then(function() {
          assert.ok(find('.chart-search-results').length);
        });
      });
    });

  }
);
