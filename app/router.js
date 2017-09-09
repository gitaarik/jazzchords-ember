import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('charts', function() {
    this.route('create');
    this.route('chart', { path: ':id' });
  });
});

export default Router;
