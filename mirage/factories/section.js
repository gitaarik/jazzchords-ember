import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({

  name(i) {
    return `Section ${i}`;
  },

  withData: trait({
    afterCreate(section, server) {
      server.createList('line', 3, { section }, 'withData');
    }
  })

});
