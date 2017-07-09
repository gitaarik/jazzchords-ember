import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['line-measure'],

  store: Ember.inject.service(),

  didRender() {
    this.drawDivisionLines();
  },

  willDestroy() {
    this.removePopupCloseListeners();
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

  addPopupCloseListeners() {

    this.closePopupOnEsc = event => {
      if (event.key === 'Escape') {
        this.closePopup();
      }
    };

    this.closePopupOnClickOutside = event => {

      let target = event.target;
      let insidePopup = false;

      while (!insidePopup && target.classList) {
        insidePopup = target.classList.contains('measure-edit-popout');
        target = target.parentNode;
      }

      if (!insidePopup) {
        this.closePopup();
      }

    };

    document.addEventListener('keypress', this.closePopupOnEsc);
    document.addEventListener('click', this.closePopupOnClickOutside);

  },

  removePopupCloseListeners() {
    document.removeEventListener('keypress', this.closePopupOnEsc);
    document.removeEventListener('click', this.closePopupOnClickOutside);
  },

  openPopup() {
    this.set('popupOpen', true);
    setTimeout(() => this.addPopupCloseListeners(), 0);
  },

  closePopup() {
    this.removePopupCloseListeners();
    if (!this.get('isDestroyed')) {
      this.set('popupOpen', false);
    }
  },

  actions: {

    measureBoxClicked(event) {
      if (!event.target.classList.contains('chord-input')) {
        if (this.get('popupOpen')) {
          this.closePopup();
        } else {
          this.openPopup();
        }
      }
    },

    closeMeasureEditPopout() {
      this.closePopup();
    },

    removeMeasure() {

      if (this.measure.get('isLast')) {
        this.get('store').unloadRecord(this.measure.get('line').content); // TODO lookinto `.content`
      }

      this.get('store').unloadRecord(this.measure);

    }

  }

});
