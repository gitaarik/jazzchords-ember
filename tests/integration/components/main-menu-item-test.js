import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('main-menu-item', 'Integration | Component | main menu item', {

  integration: true,

  beforeEach: function() {
    this.set('subMenuItems', [
      {
        text: 'ola',
        url: '/ola/'
      },
      {
        text: 'alo',
        url: '/alo/'
      }
    ]);
  }

});

test('it renders', function(assert) {
  this.render(hbs`{{main-menu-item}}`);
  assert.ok(this.$('.main-menu-item').length);
});

test('can set a className', function(assert) {
  this.render(hbs`{{main-menu-item className='test-class'}}`);
  assert.ok(this.$('.main-menu-item').hasClass('main-menu-item-test-class'));
});

test('can open sub-menu', function(assert) {

  this.render(hbs`{{main-menu-item subMenuItems=subMenuItems}}`);
  this.$('.main-menu-item .main-menu-item-text').click();

  assert.ok(this.$('.main-menu-item-submenu').length);

  const getMenuItemText = itemNo => {
    return this.$(
      '.main-menu-item-submenu ' +
      '.main-menu-item-submenu-item:nth(' + itemNo + ') ' +
      '.main-menu-item-submenu-text'
    ).text().trim();
  };

  assert.equal('ola', getMenuItemText(0));
  assert.equal('alo', getMenuItemText(1));

});

test('can close sub-menu', function(assert) {
  this.render(hbs`{{main-menu-item subMenuItems=subMenuItems}}`);
  this.$('.main-menu-item .main-menu-item-text').click();
  this.$('.main-menu-item .main-menu-item-text').click();
  assert.notOk(this.$('.main-menu-item-submenu').length);
});
