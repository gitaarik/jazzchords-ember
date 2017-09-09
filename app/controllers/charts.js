import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    navigateToChart(chart) {
      this.transitionToRoute('charts.chart', chart);
    }

  }

});
