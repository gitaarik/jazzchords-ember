import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor-section', 'Integration | Component | chart editor section', {

  integration: true,

  beforeEach: function() {

    this.inject.service('store');

    const section = this.store.createRecord('section', { name: "Awesome section" });
    const line = this.store.createRecord('line');
    const measure = this.store.createRecord('measure', { beatSchema: '4' });
    const chord = this.store.createRecord('chord', { name: 'D' });

    measure.get('chords').pushObject(chord);
    line.get('measures').pushObject(measure);
    section.get('lines').pushObject(line);

    this.set('section', section);

  }

});

test('has a section', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  assert.ok(!!this.$('.chart-section'));
});

test('has section name', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  assert.equal(this.$('.section-name-input').val(), "Awesome section");
});

test('can add line', function(assert) {
  this.render(hbs`{{chart-editor-section section=section}}`);
  this.$('.line-add-button').click();
  assert.equal(this.$('.section-line').length, 2);
});
