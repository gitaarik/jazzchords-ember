import Ember from 'ember';

export default Ember.Component.extend({

  willRender() {
    this.closeOnEsc = event => {
      if (event.key === 'Escape') {
        this.closePopup(event);
      }
    };
    document.addEventListener('keypress', this.closeOnEsc);
  },

  willDestroy() {
    document.removeEventListener('keypress', this.closeOnEsc);
  },

  closePopup(event) {
    if (this.get('onClose')) {
      this.get('onClose')(event);
    }
  },

  actions: {

    overlayClicked(event) {
      if (event.target.classList.contains('popup-overlay')) {
        this.closePopup(event);
      }
    }

  }

});
