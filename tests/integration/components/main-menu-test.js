import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('main-menu', 'Integration | Component | main menu', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{main-menu}}`);
  assert.ok(this.$('.main-menu').length);
});

test('has all menu items', function(assert) {

  this.render(hbs`{{main-menu}}`);

  const menuItemText = itemNo => {
    return this.$(
      '.main-menu ' +
      '.main-menu-item:nth-child(' + itemNo + ') ' +
      '.main-menu-item-text'
    ).text().trim();
  };

  assert.equal(menuItemText(1), 'all charts');
  assert.equal(menuItemText(2), 'help');

});

test('"help" menu-item has submenu when clicked', function(assert) {
  this.render(hbs`{{main-menu}}`);
  this.$('.main-menu .main-menu-item-help .main-menu-item-text').click();
  assert.ok(this.$('.main-menu .main-menu-item-help .main-menu-item-submenu').length);
});

test('help menu-item has all submenu items', function(assert) {

  this.render(hbs`{{main-menu}}`);
  this.$('.main-menu .main-menu-item-help .main-menu-item-text').click();

  const subMenuItemText = itemNo => {
    return this.$(
      '.main-menu ' +
      '.main-menu-item-help ' +
      '.main-menu-item-submenu ' +
      '.main-menu-item-submenu-item:nth-child(' + itemNo + ') ' +
      '.main-menu-item-submenu-text'
    ).text().trim();
  };

  assert.equal(subMenuItemText(1), 'How to read');
  assert.equal(subMenuItemText(2), 'Chord symbols');

});
