import { test } from 'qunit';
import moduleForAcceptance from 'jazzchords/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('clicking on menu item "all charts" transitions to all charts page', function(assert) {

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

test('clicking on menu item "help" opens a submenu popout', function(assert) {

  visit('/');
  click(
    '.base-header ' +
    '.main-menu ' +
    '.main-menu-item-help ' +
    '.main-menu-item-text'
  );

  andThen(function() {
    assert.ok(
      find(
        '.base-header ' +
        '.main-menu ' +
        '.main-menu-item-help ' +
        '.main-menu-item-popout'
      ).length
    );
  });

});

test(
  'when clicking the "how to read" submenu item in the "help" submenu, it ' +
  'transitions to the "how to read" page and closes the submenu popout',
  function(assert) {

    visit('/');
    click(
      '.base-header ' +
      '.main-menu ' +
      '.main-menu-item-help ' +
      '.main-menu-item-text'
    );

    andThen(function() {

      click(
        '.base-header ' +
        '.main-menu ' +
        '.main-menu-item-help ' +
        '.main-menu-item-popout ' +
        '.main-menu-item-submenu ' +
        '.main-menu-item-submenu-item:first-child ' +
        '.main-menu-item-submenu-text'
      );

      andThen(function() {

        assert.equal(currentURL(), '/help/how-to-read');
        assert.notOk(
          find(
            '.base-header ' +
            '.main-menu ' +
            '.main-menu-item-help ' +
            '.main-menu-item-popout'
          ).length
        );

      });

    });

  }
);
