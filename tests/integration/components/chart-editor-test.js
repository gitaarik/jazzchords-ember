import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-editor', 'Integration | Component | chart editor', {

  integration: true,

  beforeEach: function() {

    this.inject.service('store');

    this.chart = this.store.createRecord('chart', { title: 'All of me' });
    const section = this.store.createRecord('section');
    const line = this.store.createRecord('line');
    const measure = this.store.createRecord('measure', { beatSchema: '4' });
    const chord = this.store.createRecord('chord', { name: 'C' });

    this.chart.get('sections').pushObject(section);
    section.get('lines').pushObject(line);
    line.get('measures').pushObject(measure);
    measure.get('chords').pushObject(chord);

  }

});

test('contains the title', function(assert) {

  this.set('chart', this.chart);
  this.render(hbs`{{chart-editor chart=chart}}`);

  assert.equal(this.$('.chart-title').val(), 'All of me');

});

test('contains correct amount of sections', function(assert) {

  this.set('chart', this.chart);
  this.render(hbs`{{chart-editor chart=chart}}`);

  assert.equal(this.$('.chart-section').length, 1);

});
