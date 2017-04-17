import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    changeChordName() {
        this.chord.set('name', this.$('.chord-input').val());
    }
  }
});
