import { Factory } from 'ember-cli-mirage';

export default Factory.extend({

  title(i) {
    return `Chart ${i}`;
  },

  afterCreate(chart, server) {
    server.createList('section', 3, { chart });
  }

});
