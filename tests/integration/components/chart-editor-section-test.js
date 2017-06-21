import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor-section', 'Integration | Component | chart editor section', {

  integration: true,

  beforeEach: function() {

    this.inject.service('store');

    const chart = this.store.createRecord('chart', { title: "What a chart" });
    const section = this.store.createRecord('section', { chart, name: "Awesome section" });

    const line1 = this.store.createRecord('line', { section });
    const line1measure = this.store.createRecord('measure', { line: line1, beatSchema: '4' });
    this.store.createRecord('chord', { measure: line1measure, name: 'D' });

    const line2 = this.store.createRecord('line', { section });
    const line2measure = this.store.createRecord('measure', { line: line2, beatSchema: '4' });
    this.store.createRecord('chord', { measure: line2measure, name: 'D' });

    this.set('section', section);

  }

});

test('has two lines', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  assert.equal(this.$('.chart-section .section-line').length, 2);
});

test('has section name', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  assert.equal(this.$('.section-name-input').val(), "Awesome section");
});

test('can change section name', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  this.$('.section-name-input').val('changed the name');
  assert.equal(this.$('.section-name-input').val(), 'changed the name');
});

test('can add line', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  this.$('.line-add-button').click();
  assert.equal(this.$('.section-line').length, 3);
});

test('can remove line', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  this.$('.chart-section .section-line:nth(1) .line-measure .measure-box').click();
  this.$('.chart-section .section-line:nth(1) .line-measure .measure-edit-popout .remove-measure-button').click();
  assert.equal(this.$('.section-line').length, 1);
});

test('cannot remove line all the lines', function(assert) {

  this.render(hbs`{{chart-editor-section section=section}}`);

  this.$('.chart-section .section-line:nth(1) .line-measure .measure-box').click();
  this.$('.chart-section .section-line:nth(1) .line-measure .measure-edit-popout .remove-measure-button').click();

  this.$('.chart-section .section-line:nth(0) .line-measure .measure-box').click();

  assert.notOk(
    this.$(
      '.chart-section .section-line:nth(0) ' +
      '.line-measure .measure-edit-popout .remove-measure-button'
    ).length
  );

  assert.equal(this.$('.section-line').length, 1);

});
