import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  classNames: ['chart-search'],

  showResults: true,
  searchTerm: '',
  loading: false,
  searchResults: null,
  focussedResultIndex: null,
  lastSearchTerm: null,

  init() {
    this._super(...arguments);
    this.addCloseResultsListeners();
  },

  willDestroy() {
    this.removeCloseResultsListeners();
  },

  addCloseResultsListeners() {
    this.addCloseResultsOnOutsideClickListeners();
    this.addCloseResultsOnEscListeners();
  },

  removeCloseResultsListeners() {
    this.removeCloseResultsOnOutsideClickListeners();
    this.removeCloseResultsOnEscListeners();
  },

  addCloseResultsOnOutsideClickListeners() {

    this.closeResultsOnClickOutside = event => {

      let element = event.target;
      let insideResults = false;
      let insideSearchInput = false;

      while (!insideResults && !insideSearchInput && element.classList) {
        insideResults = element.classList.contains('chart-search-results-container');
        insideSearchInput = element.classList.contains('chart-search-input-container');
        element = element.parentNode;
      }

      if (!insideResults && !insideSearchInput) {
        this.closeResults();
      }

    };

    document.addEventListener('click', this.closeResultsOnClickOutside);

  },

  removeCloseResultsOnOutsideClickListeners() {
    document.removeEventListener('click', this.closeResultsOnClickOutside);
  },

  addCloseResultsOnEscListeners() {
    this.closeResultsOnEsc = event => {
      if (event.keyCode === 27) {
        this.closeResults();
      }
    };
    document.addEventListener('keypress', this.closeResultsOnEsc);
  },

  removeCloseResultsOnEscListeners() {
    document.removeEventListener('keypress', this.closeResultsOnEsc);
  },

  updateSearchTerm(value) {
    if (value !== this.lastSearchTerm) {
      this.search(value);
    }
  },

  search(value) {

    this.setProperties({
      'loading': true,
      'showResults': true
    });

    if (value) {
      this.get('store').query('chart', {
        title: value
      }).then(charts => {
        this.setSearchResults(value, charts);
      });
    } else {
      this.set('searchResults', null);
    }

  },

  setSearchResults(searchTerm, charts) {
    this.setProperties({
      'searchResults': charts,
      'loading': false,
      'lastSearchTerm': searchTerm,
      'focussedResultIndex': charts.get('length') === 1 ? 0 : null
    });
  },

  moveFocusDown() {
    this.moveFocus(1);
  },

  moveFocusUp() {
    this.moveFocus(-1);
  },

  moveFocus(direction) {

    if (!this.get('showResults')) {
      this.set('showResults', true);
      return;
    }

    const currentFocus = this.get('focussedResultIndex');
    const totalResults = this.get('searchResults').get('length');
    let newFocus;

    if (currentFocus === null) {

      if (direction > 0) {
        newFocus = -1 + direction;
      } else {
        newFocus = totalResults + direction;
      }

    } else {

      newFocus = currentFocus + direction;

      if (newFocus === totalResults) {
        newFocus = 0;
      } else if (newFocus < 0) {
        newFocus = totalResults - 1;
      }

    }

    this.set('focussedResultIndex', newFocus);

  },

  closeResults() {
    this.set('showResults', false);
  },

  actions: {

    inputKeyUp(value, event) {

      if (event.keyCode === 40) { // down arrow
        this.moveFocusDown();
      } else if (event.keyCode === 38) { // up arrow
        this.moveFocusUp();
      } else {
        this.updateSearchTerm(value);
      }

    },

    focusResult(resultIndex) {
      this.set('focussedResultIndex', resultIndex);
    },

    selectFocussedChart() {
      this.get('onSelect')(
        this.searchResults.objectAt(this.focussedResultIndex)
      );
      this.closeResults();
    },

    showResults() {
      this.set('showResults', true);
    },

    chartLinkClicked() {
      this.closeResults();
    }

  }

});
