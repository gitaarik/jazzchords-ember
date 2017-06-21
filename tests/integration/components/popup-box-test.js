import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('popup-box', 'Integration | Component | popup box', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`
    {{#popup-box}}
      Hello
    {{/popup-box}}
  `);

  assert.equal(this.$('.popup-overlay .popup').text().trim(), 'Hello');

});

test('onClose handler gets called when clicking the overlay', function(assert) {

  assert.expect(1);

  this.set('onClose', event => {
    assert.equal(event.type, 'click');
  });

  this.render(hbs`
    {{#popup-box onClose=(action onClose)}}
      Hello
    {{/popup-box}}
  `);

  this.$('.popup-overlay').click();

});

test("onClose handler doesn't get called when clicking the popup", function(assert) {

  assert.expect(0);

  this.set('onClose', () => {
    assert.notOk(1);
  });

  this.render(hbs`
    {{#popup-box onClose=(action onClose)}}
      Hello
    {{/popup-box}}
  `);

  this.$('.popup-overlay .popup').click();

});
