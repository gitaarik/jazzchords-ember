import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  actions: {
    addLine() {
      const store = this.get('store');
      const chord = store.createRecord('chord', {
        name: (
          this.section
            .get('lines')
            .get('lastObject')
            .get('measures')
            .get('lastObject')
            .get('chords')
            .get('firstObject')
            .get('name')
        ),
        focusOnInsert: true
      });
      const line = store.createRecord('line');
      const measure = store.createRecord('measure', { beatSchema: '4' });
      measure.get('chords').pushObject(chord);
      line.get('measures').pushObject(measure);
      this.section.get('lines').pushObject(line);
    }
  }
});
