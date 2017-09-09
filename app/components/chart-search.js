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
  },

  removeCloseResultsListeners() {
    this.removeCloseResultsOnOutsideClickListeners();
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
      if (event.key === 'Escape') {
        this.closeResults();
      }
    };
    document.addEventListener('keypress', this.closeResultsOnEsc);
  },

  removeCloseResultsOnEscListeners() {
    document.removeEventListener('keypress', this.closeResultsOnEsc);
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

  closeResults() {
    this.set('showResults', false);
  },

  actions: {

    updateSearchTerm(value) {
      if (value !== this.lastSearchTerm) {
        this.search(value);
      }
    },

    selectFocussedChart() {
      this.get('onSelect')(
        this.searchResults.objectAt(this.focussedResultIndex)
      );
    },

    showResults() {
      this.set('showResults', true);
    },

    chartLinkClicked() {
      this.closeResults();
    }

  }

});
