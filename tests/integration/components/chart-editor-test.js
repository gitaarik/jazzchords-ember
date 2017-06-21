import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor', 'Integration | Component | chart editor', {

  integration: true,

  beforeEach: function() {

    this.inject.service('store');

    const chart = this.store.createRecord('chart', { title: 'All Of Me' });

    const section1 = this.store.createRecord('section', { chart });
    const section1line1 = this.store.createRecord('line', { section: section1 });
    const section1line1measure1 = this.store.createRecord('measure', { line: section1line1, beatSchema: '4' });
    this.store.createRecord('chord', { measure: section1line1measure1, name: 'C' });

    const section2 = this.store.createRecord('section', { chart });
    const section2line1 = this.store.createRecord('line', { section: section2 });
    const section2line1measure1 = this.store.createRecord('measure', { line: section2line1, beatSchema: '4' });
    this.store.createRecord('chord', { measure: section2line1measure1, name: 'C' });

    this.set('chart', chart);

  }

});

test('contains the title', function(assert) {
  this.render(hbs`{{chart-editor chart=chart}}`);
  assert.equal(this.$('.chart-editor .chart-title-input').val(), 'All Of Me');
});

test('contains correct amount of sections', function(assert) {
  this.render(hbs`{{chart-editor chart=chart}}`);
  assert.equal(this.$('.chart-editor .chart-section').length, 2);
});

test('can add section', function(assert) {
  this.render(hbs`{{chart-editor chart=chart}}`);
  this.$('.chart-editor .section-add-button').click();
  assert.equal(this.$('.chart-editor .chart-section').length, 3);
});

test('can remove section', function(assert) {

  this.render(hbs`{{chart-editor chart=chart}}`);
  this.$('.chart-editor .chart-section:nth(1) .section-header .section-remove-button').click();

  assert.equal(this.$('.chart-editor .chart-section').length, 2);
  assert.ok(
    this.$(
      '.chart-editor .chart-section:nth(1) ' +
      '.section-header .section-remove-confirm-popup'
    ).length
  );

  this.$(
    '.chart-editor .chart-section:nth(1) ' +
    '.section-header .section-remove-confirm-popup ' +
    '.confirm-remove-section-button'
  ).click();

  assert.notOk(
    this.$(
      '.chart-editor .chart-section:nth(1) ' +
      '.section-header .section-remove-confirm-popup'
    ).length
  );

  assert.equal(this.$('.chart-editor .chart-section').length, 1);

});

test('can cancel remove section', function(assert) {

  this.render(hbs`{{chart-editor chart=chart}}`);
  this.$('.chart-editor .chart-section:nth(1) .section-header .section-remove-button').click();

  assert.equal(this.$('.chart-editor .chart-section').length, 2);
  assert.ok(
    this.$(
      '.chart-editor .chart-section:nth(1) ' +
      '.section-header .section-remove-confirm-popup'
    ).length
  );

  this.$(
    '.chart-editor .chart-section:nth(1) ' +
    '.section-header .section-remove-confirm-popup ' +
    '.cancel-remove-section-button'
  ).click();

  assert.notOk(
    this.$(
      '.chart-editor .chart-section:nth(1) ' +
      '.section-header .section-remove-confirm-popup'
    ).length
  );

  assert.equal(this.$('.chart-editor .chart-section').length, 2);

});

test('cannot remove last section', function(assert) {

  this.render(hbs`{{chart-editor chart=chart}}`);

  this.$('.chart-editor .chart-section:nth(1) .section-header .section-remove-button').click();
  this.$(
    '.chart-editor .chart-section:nth(1) ' +
    '.section-header .section-remove-confirm-popup ' +
    '.confirm-remove-section-button'
  ).click();

  assert.notOk(this.$('.chart-editor .chart-section:nth(0) .section-remove-button').length);
  assert.equal(this.$('.chart-editor .chart-section').length, 1);

});
