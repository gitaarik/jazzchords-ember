import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('charts');
  this.route('charts/chart', { path: '/charts/chart/:id' });
  this.route('charts/create');
});

export default Router;
