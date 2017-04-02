import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
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
        )
      });
      const measure = store.createRecord('measure', { beatSchema: '4' });
      measure.get('chords').pushObject(chord);
      this.line.get('measures').pushObject(measure);
    }
  }
});
