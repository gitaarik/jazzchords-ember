import { Factory, association } from 'ember-cli-mirage';

export default Factory.extend({

  // chart: association(),

  name(i) {
    return `Section ${i}`;
  }

});
