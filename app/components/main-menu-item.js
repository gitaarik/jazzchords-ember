import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['main-menu-item', ],
  classNameBindings: ['mainMenuItemClass'],

  mainMenuItemClass: function () {
    return 'main-menu-item-' + this.className;
  }.property(),

  subMenuOpen: false,

  willDestroy() {
    this.removeSubMenuCloseListeners();
  },

  addSubMenuCloseListeners() {

    this.closeSubMenuOnEsc = event => {
      if (event.key === 'Escape') {
        this.closeSubMenu();
      }
    };

    this.closeSubMenuOnClickOutside = event => {

      let target = event.target;
      let insideSubMenu = false;

      while (!insideSubMenu && target.classList) {
        insideSubMenu = target.classList.contains('main-menu-item-popout');
        target = target.parentNode;
      }

      if (!insideSubMenu) {
        this.closeSubMenu();
      }

    };

    document.addEventListener('keypress', this.closeSubMenuOnEsc);
    document.addEventListener('click', this.closeSubMenuOnClickOutside);

  },

  removeSubMenuCloseListeners() {
    document.removeEventListener('keypress', this.closeSubMenuOnEsc);
    document.removeEventListener('click', this.closeSubMenuOnClickOutside);
  },

  openSubMenu() {

    this.set('subMenuOpen', true);

    // Use a setTimeout to add the sub-menu close listeners because the
    // listeners shouldn't listen to actions that opened the sub-menu, otherwise
    // they close the sub-menu immediately again.
    setTimeout(() => this.addSubMenuCloseListeners(), 0);

  },

  closeSubMenu() {
    this.set('subMenuOpen', false);
    this.removeSubMenuCloseListeners();
  },

  actions: {

    openSubMenu() {
        if (this.get('subMenuOpen')) {
          this.closeSubMenu();
        } else {
          this.openSubMenu();
        }
    },

    subMenuItemClicked() {
      this.closeSubMenu();
    }

  }

});
