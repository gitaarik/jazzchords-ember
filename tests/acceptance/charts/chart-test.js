import { test } from 'qunit';
import moduleForAcceptance from 'jazzchords/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | charts/chart');

test('visiting /charts/chart/1', function(assert) {

  let chart = server.create('chart', {title: "All Of Me"});
  let section1 = server.create('section', { chart, name: "Intro" });
  server.create('section', { chart, name: "" });

  let section1Line1 = server.create('line', { section: section1 });

  let section1Line1Measure1 = server.create(
    'measure',
    {
      line: section1Line1,
      beatSchema: '4'
    }
  );

  server.create(
    'chord',
    {
      measure: section1Line1Measure1,
      name: "C6/9"
    }
  );

  visit('/charts/chart/' + chart.id);

  andThen(function() {

    assert.equal(currentURL(), '/charts/chart/' + chart.id);
    assert.equal(find('.chart-title-input').val(), 'All Of Me');
    assert.equal(find('.chart-section').length, 2);
    assert.equal(find('.chart-section:nth(0) .section-name-input').val(), "Intro");

    assert.equal(
      find(
        '.chart-section:nth(0) ' +
        '.section-line:nth(0) ' +
        '.measure-box:nth(0) ' +
        '.measure-chord:nth(0) ' +
        '.chord-input'
      ).val(),
      "C6/9"
    );

    assert.equal(find('.chart-section:nth(1) .section-name-input').val(), "");

  });

});

test('section name input width grows when value grows', function(assert) {

  let chart = server.create('chart', {title: "All Of Me"});
  let section1 = server.create('section', { chart, name: "Intro" });
  server.create('section', { chart, name: "short" });

  let section1Line1 = server.create('line', { section: section1 });

  let section1Line1Measure1 = server.create(
    'measure',
    {
      line: section1Line1,
      beatSchema: '4'
    }
  );

  server.create(
    'chord',
    {
      measure: section1Line1Measure1,
      name: "C6/9"
    }
  );

  visit('/charts/chart/' + chart.id);

  andThen(function() {

    const widthBefore = find('.section-name-input').width();
    fillIn('.section-name-input', "this is longer");

    andThen(function() {
      const widthAfter = find('.section-name-input').width();
      assert.ok(widthAfter > widthBefore);
    });

  });

});
