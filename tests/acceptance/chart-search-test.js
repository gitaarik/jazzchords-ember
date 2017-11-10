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

test("able to focus search results with the mouse", function(assert) {

  server.create('chart', {title: "All Of Me"});
  server.create('chart', {title: "All Of You"});
  server.create('chart', {title: "All Of Her"});
  server.create('chart', {title: "All Of Him"});

  visit('/');
  fillIn('.chart-search-input', "all");
  triggerEvent('.chart-search-input', 'keyup');

  function mouseMove(index) {
    return triggerEvent(
      '.chart-search-results .chart-search-result:nth-child(' + index + ')',
      'mousemove'
    );
  }

  function checkResultFocus(index) {
    assert.ok(
      find(
        '.chart-search-results ' +
        '.chart-search-result:nth-child(' + index + ')' +
        '.chart-search-result-focussed'
      ).length
    );
  }

  andThen(function() {
    mouseMove(2).then(function() {
      checkResultFocus(2);
    });
  });

});

test("able to navigate between search result with arrow keys", function(assert) {

  server.create('chart', {title: "All Of Me"});
  server.create('chart', {title: "All Of You"});
  server.create('chart', {title: "All Of Her"});
  server.create('chart', {title: "All Of Him"});

  visit('/');
  fillIn('.chart-search-input', "all");
  triggerEvent('.chart-search-input', 'keyup');

  function checkResultFocus(index) {
    assert.ok(
      find(
        '.chart-search-results ' +
        '.chart-search-result:nth-child(' + index + ')' +
        '.chart-search-result-focussed'
      ).length
    );
  }

  function keyDown() {
    return keyEvent('.chart-search-input', 'keyup', 40);
  }

  function keyUp() {
    return keyEvent('.chart-search-input', 'keyup', 38);
  }

  andThen(function() {
    keyDown().then(function() {
      checkResultFocus(1);
      keyDown().then(function() {
        checkResultFocus(2);
        keyDown().then(function() {
          checkResultFocus(3);
          keyUp().then(function() {
            checkResultFocus(2);
            keyUp().then(function() {
              checkResultFocus(1);
              keyUp().then(function() {
                checkResultFocus(4);
              });
            });
          });
        });
      });
    });
  });

});

test(
  "after navigating search results and closing the results popup and " +
  "then pressing arrow buttons, the results popup opens up again and " +
  "the focus goes on where it was left",
  function(assert) {

    server.create('chart', {title: "All Of Me"});
    server.create('chart', {title: "All Of You"});
    server.create('chart', {title: "All Of Her"});
    server.create('chart', {title: "All Of Him"});

    visit('/');
    fillIn('.chart-search-input', "all");
    triggerEvent('.chart-search-input', 'keyup');

    function checkResultFocus(index) {
      assert.ok(
        find(
          '.chart-search-results ' +
          '.chart-search-result:nth-child(' + index + ')' +
          '.chart-search-result-focussed'
        ).length
      );
    }

    function keyDown() {
      return keyEvent('.chart-search-input', 'keyup', 40);
    }

    andThen(function() {
      keyDown().then(function() {
        checkResultFocus(1);
        keyDown().then(function() {
          checkResultFocus(2);
          keyEvent('.chart-search-input-container', 'keypress', 27).then(function() {
            assert.notOk(find('.chart-search-results').length);
            keyDown().then(function() {
              assert.ok(find('.chart-search-results').length);
              checkResultFocus(2);
            });
          });
        });
      });
    });

  }
);

test(
  "when first focussing a chart with the arrow keys and then with " +
  "the mouse, the focussed result from the arrow keys goes away",
  function(assert) {

    server.create('chart', {title: "All Of Me"});
    server.create('chart', {title: "All Of You"});
    server.create('chart', {title: "All Of Her"});
    server.create('chart', {title: "All Of Him"});

    visit('/');
    fillIn('.chart-search-input', "all");
    triggerEvent('.chart-search-input', 'keyup');

    function hasFocus(index) {
      return find(
        '.chart-search-results ' +
        '.chart-search-result:nth-child(' + index + ')' +
        '.chart-search-result-focussed'
      ).length;
    }

    function keyDown() {
      return keyEvent('.chart-search-input', 'keyup', 40);
    }

    andThen(function() {
      keyDown().then(function() {
        assert.ok(hasFocus(1));
        keyDown().then(function() {

          assert.ok(hasFocus(2));

          triggerEvent(
            '.chart-search-results .chart-search-result:nth-child(4)',
            'mousemove'
          ).then(function() {
            assert.notOk(hasFocus(2));
            assert.ok(hasFocus(4));
          });

        });
      });
    });

  }
);
