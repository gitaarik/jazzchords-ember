import Ember  from 'ember';

export default Ember.Component.extend({

  classNames: ['line-measure'],

  store: Ember.inject.service(),

  chord1: Ember.computed('measure.chords', function() {
    return this.measure.get('chords').objectAt(0);
  }),

  chord2: function() {
    return this.measure.get('chords').objectAt(1);
  }.property(),

  chord3: function() {
    return this.measure.get('chords').objectAt(2);
  }.property(),

  chord4: function() {
    return this.measure.get('chords').objectAt(3);
  }.property(),

  willDestroy() {
    this.removePopoutCloseListeners();
  },

  addPopoutCloseListeners() {

    this.closePopoutOnEsc = event => {
      if (event.key === 'Escape') {
        this.closePopout();
      }
    };

    this.closePopoutOnClickOutside = event => {

      let target = event.target;
      let insidePopout = false;

      while (!insidePopout && target.classList) {
        insidePopout = target.classList.contains('measure-edit-popout');
        target = target.parentNode;
      }

      if (!insidePopout) {
        this.closePopout();
      }

    };

    document.addEventListener('keypress', this.closePopoutOnEsc);
    document.addEventListener('click', this.closePopoutOnClickOutside);

  },

  removePopoutCloseListeners() {
    document.removeEventListener('keypress', this.closePopoutOnEsc);
    document.removeEventListener('click', this.closePopoutOnClickOutside);
  },

  openPopout() {

    this.set('popoutOpen', true);

    // Use a setTimeout to add the popout close listeners because the listeners
    // shouldn't listen to actions that opened the popout, otherwise they close
    // the popout immediately again.
    setTimeout(() => this.addPopoutCloseListeners(), 0);

  },

  closePopout() {
    this.removePopoutCloseListeners();
    if (!this.get('isDestroyed')) {
      this.set('popoutOpen', false);
    }
  },

  addOrRemoveChords(beatSchema) {

    const chords = this.measure.get('chords');
    const neededChordsQuantity = this.neededChordsQuantity(beatSchema);

    while (neededChordsQuantity > chords.get('length')) {
      this.addChord();
    }

    while (neededChordsQuantity < chords.get('length')) {
      this.removeChord();
    }

  },

  neededChordsQuantity(beatSchema) {

    switch (beatSchema) {
        
        case '4':
          return 1;

        case '2-2':
          return 2;

        case '2-1-1':
        case '1-1-2':
          return 3;

        case '1-1-1-1':
          return 4;

    }

  },

  removeChord() {
    const chords = this.measure.get('chords');
    chords.removeObject(chords.objectAt(1));
  },

  addChord() {

    const chords = this.measure.get('chords');

    const chord = this.get('store').createRecord('chord', {
      name: chords.get('lastObject').get('name')
    });

    chords.pushObject(chord);

  },

  actions: {

    measureBoxClicked(event) {
      if (!event.target.classList.contains('chord-input')) {
        if (this.get('popoutOpen')) {
          this.closePopout();
        } else {
          this.openPopout();
        }
      }
    },

    changeBeatSchema(beatSchema) {
      this.addOrRemoveChords(beatSchema);
      this.measure.set('beatSchema', beatSchema);
    },

    closeMeasureEditPopout() {
      this.closePopout();
    },

    removeMeasure() {

      if (this.measure.get('isLast')) {
        this.measure.get('line').set('section', null);
      }

      this.measure.set('line', null);

    }

  }

});
