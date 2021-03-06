import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['section-line'],

  store: Ember.inject.service(),

  showAddButton: Ember.computed('line.measures.length', function() {
    return this.line.get('measures').get('length') < 8;
  }),

  actions: {
    addMeasure() {
      const store = this.get('store');
      const chord = store.createRecord('chord', {
        name: (
          this.line
            .get('measures')
            .get('lastObject')
            .get('chords')
            .get('firstObject')
            .get('name')
        ),
        focusOnInsert: true
      });
      const measure = store.createRecord('measure', { beatSchema: '4' });
      measure.get('chords').pushObject(chord);
      this.line.get('measures').pushObject(measure);
    }
  }

});
