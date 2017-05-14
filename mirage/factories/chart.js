import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({

  title(i) {
    return `Chart ${i}`;
  },

  withData: trait({
    afterCreate(chart, server) {
      server.createList('section', 3, { chart }, 'withData');
    }
  })

});
