import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['main-menu'],
  helpSubMenuItems: [
    {
      text: 'How to read',
      route: 'help.how-to-read'
    },
    {
      text: 'Chord symbols',
      route: 'help.chord-symbols'
    }
  ]
});
