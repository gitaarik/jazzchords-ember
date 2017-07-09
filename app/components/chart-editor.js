import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'article',
  classNames: ['chart-editor'],

  store: Ember.inject.service(),

  actions: {
    addSection() {

      const store = this.get('store');

      const chordName = (
        this.chart
          .get('sections').get('lastObject')
          .get('lines').get('firstObject')
          .get('measures').get('firstObject')
          .get('chords').get('firstObject')
          .get('name')
      );

      const section = store.createRecord('section', {
        chart: this.chart
      });

      const line = store.createRecord('line', { section });
      const measure = store.createRecord('measure', {
        line,
        beatSchema: '4'
      });

      store.createRecord('chord', {
        measure,
        name: chordName,
        focusOnInsert: true
      });

    }
  }

});
