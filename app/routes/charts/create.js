import Ember from 'ember';

export default Ember.Route.extend({

  model() {

    const chart = this.store.createRecord('chart', { title: 'New chart' });
    const section = this.store.createRecord('section');
    const measure = this.store.createRecord('measure', { beatSchema: '4' });
    const chord = this.store.createRecord('chord', { name: 'C' });

    chart.get('sections').pushObject(section);
    section.get('measures').pushObject(measure);
    measure.get('chords').pushObject(chord);

    return chart;

  }

});
