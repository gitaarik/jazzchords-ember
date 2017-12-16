import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'canvas',
  classNames: ['measure-box-canvas'],
  attributeBindings: ['width', 'height'],

  size: 100,

  width: Ember.computed('size', function() {
    return this.get('size');
  }),

  height: Ember.computed('size', function() {
    return this.get('size');
  }),

  didRender() {
    this.drawSeparationLines();
  },

  drawSeparationLines() {

    const canvasEl = this.get('element');
    const context = canvasEl.getContext('2d');

    context.clearRect(0, 0, this.get('width'), this.get('height'));

    switch (this.get('beatSchema')) {

        case '2-2':
          this.drawSeparationLines_2_2(context);
          break;

        case '2-1-1':
          this.drawSeparationLines_2_1_1(context);
          break;

        case '1-1-2':
          this.drawSeparationLines_1_1_2(context);
          break;

        case '1-1-1-1':
          this.drawSeparationLines_1_1_1_1(context);
          break;

    }

  },

  drawSeparationLines_2_2(context) {
    this.drawLeftBottomToRightTopLine(context);
  },

  drawSeparationLines_2_1_1(context) {
    this.drawLeftBottomToRightTopLine(context);
    this.drawMiddleToRightBottomLine(context);
  },

  drawSeparationLines_1_1_2(context) {
    this.drawLeftBottomToRightTopLine(context);
    this.drawMiddleToLeftTopLine(context);
  },

  drawSeparationLines_1_1_1_1(context) {
    this.drawLeftBottomToRightTopLine(context);
    this.drawTopLeftToBottomRightLine(context);
  },

  drawLeftBottomToRightTopLine(context) {
    context.beginPath();
    context.moveTo(0, this.get('width'));
    context.lineTo(this.get('height'), 0);
    context.stroke();
  },

  drawTopLeftToBottomRightLine(context) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.get('width'), this.get('height'));
    context.stroke();
  },

  drawMiddleToRightBottomLine(context) {
    context.beginPath();
    context.moveTo(this.get('width') / 2, this.get('height') / 2);
    context.lineTo(this.get('width'), this.get('height'));
    context.stroke();
  },

  drawMiddleToLeftTopLine(context) {
    context.beginPath();
    context.moveTo(this.get('width') / 2, this.get('height') / 2);
    context.lineTo(0, 0);
    context.stroke();
  }

});
