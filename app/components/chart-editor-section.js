import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['chart-section'],

  store: Ember.inject.service(),

  didRender() {
    this.adjustSectionNameInputWidth();
  },

  adjustSectionNameInputWidth() {

    const inputEl = this.$('.section-header .section-name-input');
    inputEl.hide();

    const tmpSpan = Ember.$('<span/>', {
      class: '_tmp-span section-name-input',
      text: inputEl.val() || inputEl.attr('placeholder')
    });

    this.$('.section-header').append(tmpSpan);
    let theWidth = tmpSpan.width();

    this.$('.section-header ._tmp-span').remove();

    inputEl.show();
    inputEl.width(theWidth);

  },

  actions: {

    addLine() {
      const store = this.get('store');
      const chord = store.createRecord('chord', {
        name: (
          this.section
            .get('lines').get('lastObject')
            .get('measures').get('lastObject')
            .get('chords').get('firstObject').get('name')
        ),
        focusOnInsert: true
      });
      const line = store.createRecord('line');
      const measure = store.createRecord('measure', { beatSchema: '4' });
      measure.get('chords').pushObject(chord);
      line.get('measures').pushObject(measure);
      this.section.get('lines').pushObject(line);
    },

    toggleRemoveSectionConfirmPopup() {
      this.toggleProperty('showConfirmRemoveSectionPopup');
    },

    confirmRemoveSection() {
      this.section.set('chart', null);
    }

  }

});
