import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['measure-chord'],
  classNameBindings: ['chordSize'],

  chordSize: function () {
    return 'chord-' + this.size;
  }.property(),

  actions: {
    changeChordName() {
        this.chord.set('name', this.$('.chord-input').val());
    }
  },

  didInsertElement: function() {
    if(this.chord.get('focusOnInsert')) {
      this.$('.chord-input').focus();
    }
  }

});
