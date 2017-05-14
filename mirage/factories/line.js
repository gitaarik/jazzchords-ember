import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({

  withData: trait({
    afterCreate(line, server) {
      server.createList('measure', 3, { line }, 'withData');
    }
  })

});
