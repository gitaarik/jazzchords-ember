import Ember from 'ember';

export default Ember.Controller.extend({

  beatsMeasure_4: ['4 beats'],
  beatsMeasure_2_2: ['2 beats', '2 beats'],
  beatsMeasure_2_1_1: ['2 beats', '1 beat', '1 beat'],
  beatsMeasure_1_1_2: ['1 beat', '1 beat', '2 beats'],
  beatsMeasure_1_1_1_1: ['1 beat', '1 beat', '1 beat', '1 beat'],

  orderMeasure_4: ['1st'],
  orderMeasure_2_2: ['1st', '2nd'],
  orderMeasure_2_1_1: ['1st', '2nd', '3rd'],
  orderMeasure_1_1_2: ['1st', '2nd', '3rd'],
  orderMeasure_1_1_1_1: ['1st', '2nd', '3rd', '4th'],

  repititionMeasureChord: ['C'],
  repititionMeasureRepitionSign: ['%'],

  restMeasureChord: ['REST'],

  alternativeBassNoteMeasureChord: ['E7/B']

});
