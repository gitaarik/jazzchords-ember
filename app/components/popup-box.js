import Ember from 'ember';

export default Ember.Component.extend({

  willRender() {
    this.addClosePopupOnEscListeners();
  },

  willDestroy() {
    this.removeClosePopupOnEscListeners();
  },

  addClosePopupOnEscListeners() {
    this.closeOnEsc = event => {
      if (event.key === 'Escape') {
        this.closePopup(event);
      }
    };
    document.addEventListener('keypress', this.closeOnEsc);
  },

  removeClosePopupOnEscListeners() {
    document.removeEventListener('keypress', this.closeOnEsc);
  },

  isClickOnOverlay(event) {
    return event.target.classList.contains('popup-overlay');
  },

  closePopup(event) {
    if (this.get('onClose')) {
      this.get('onClose')(event);
    }
  },

  actions: {

    overlayClicked(event) {
      if (this.isClickOnOverlay(event)) {
        this.closePopup(event);
      }
    }

  }

});
