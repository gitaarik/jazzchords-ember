import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({

  withData: trait({
    afterCreate(line, server) {
      // server.createList('measure', 3, { line }, 'withData');
      server.create('measure', { line }, 'withData');
      server.create('measure', { line, beatSchema: '2-2' }, 'with2Chords');
      server.create('measure', { line }, 'withData');
    }
  })

});
