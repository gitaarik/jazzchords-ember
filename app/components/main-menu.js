import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['main-menu'],
  helpSubMenuItems: [
    {
      text: 'How to read',
      url: '/help/how-to-read/'
    },
    {
      text: 'Chord symbols',
      url: '/help/chord-symbols/'
    }
  ]
});
