import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({

  withData: trait({
    afterCreate(measure, server) {
      server.create('chord', { measure });
    }
  }),

  with2Chords: trait({
    afterCreate(measure, server) {
      server.create('chord', { measure });
      server.create('chord', { measure });
    }
  })

});
