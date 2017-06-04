import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    toggleMeasureEditPopout() {
      this.toggleProperty('popupOpen');
    },
    removeMeasure() {
      this.get('store').unloadRecord(this.measure);
    }
  }
});
