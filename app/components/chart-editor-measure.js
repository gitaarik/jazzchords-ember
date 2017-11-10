import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['line-measure'],

  store: Ember.inject.service(),

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

      this.measure.set('beatSchema', beatSchema);

      if (
        beatSchema === '4' &&
        this.measure.get('chords').get('length') > 1
      ) {
        this.measure.get('chords').removeObject(
          this.measure.get('chords').objectAt(1)
        );
      } else if (
        beatSchema === '2-2' &&
        this.measure.get('chords').get('length') < 2
      ) {

        const chord = this.get('store').createRecord('chord', {
          name: (
            this.measure
              .get('chords')
              .get('firstObject')
              .get('name')
          )
        });

        this.measure.get('chords').pushObject(chord);

      }

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
