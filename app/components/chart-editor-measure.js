import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['line-measure'],

  store: Ember.inject.service(),

  didRender() {
    this.drawDivisionLines();
  },

  willDestroy() {
    this.removePopoutCloseListeners();
  },

  drawDivisionLines() {

    const canvasEl = this.$('.measure-box-canvas');

    if (!canvasEl.length) {
      return;
    }

    canvasEl.width = 100;
    canvasEl.height = 100;

    const context = canvasEl[0].getContext('2d');
    context.lineWidth = 1;

    if (this.get('measure').get('beatSchema') === '2-2') {
      context.beginPath();
      context.moveTo(0, 100);
      context.lineTo(100, 0);
      context.stroke();
    }

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

      if (beatSchema === '2-2' && this.measure.get('chords').get('length') < 2) {

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
        this.get('store').unloadRecord(this.measure.get('line').content); // TODO lookinto `.content`
      }

      this.get('store').unloadRecord(this.measure);

    }

  }

});