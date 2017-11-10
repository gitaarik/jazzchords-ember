import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['measure-box'],
  classNameBindings: ['beatSchemaClass'],

  beatSchemaClass: function() {
    return 'measure-box-beatschema-' + this.get('beatSchema');
  }.property(),

  boxSizeClasses: [
    'chord-big',
    'chord-medium',
    'chord-small',
    'chord-tiny',
    'chord-tiny'
  ],

  initialCssClassIndicesPerSchema: {
    '4': [0],
    '2-2': [1, 1],
    '2-1-1': [1, 2, 2],
    '1-1-2': [2, 2, 1],
    '1-1-1-1': [2, 2, 2, 2]
  },

  maxTextWidthPerSchema: {
    '4': [80],
    '2-2': [55, 55],
    '2-1-1': [55, 35, 35],
    '1-1-2': [35, 35, 55],
    '1-1-1-1': [35, 35, 35, 35]
  },

  maxTextWidthForWordsPerSchema: {
    '4': [60],
    '2-2': [50, 50],
    '2-1-1': [50, 30, 30],
    '1-1-2': [30, 30, 50],
    '1-1-1-1': [30, 30, 30, 30]
  },

  maxTextWidth: Ember.computed('maxTextWidthPerSchema', function() {
    return this.get('maxTextWidthPerSchema')[
      this.get('beatSchema')
    ];
  }),

  maxTextWidthForWords: Ember.computed('maxTextWidthForWordsPerSchema', function() {
    return this.get('maxTextWidthForWordsPerSchema')[
      this.get('beatSchema')
    ];
  }),

  cssClassIndices: [],
  chordsData: {},

  didRender() {
    this.fitChordTexts();
  },

  fitChordTexts() {

    this.setInitialCssClassIndices();

    this.$('.measure-chord span').each((index, chordTextEl) => {
      this.fitChordText(index, chordTextEl);
    });

  },

  setInitialCssClassIndices() {
    if (!this.get('cssClassIndices').length) {
      this.setCssClassIndices(
        this.get('initialCssClassIndicesPerSchema')[
          this.get('beatSchema')
        ]
      );
    }
  },

  fitChordText(index, chordTextEl) {
    if (this.chordTextSizeTooBig(index, chordTextEl)) {
      this.decreaseChordText(index);
    }
  },

  chordTextSizeTooBig(index, chordTextEl) {
    return chordTextEl.offsetWidth > this.getMaxTextWith(chordTextEl, index);
  },

  getMaxTextWith(chordTextEl, index) {
    if (this.isWord(chordTextEl.innerText)) {
      return this.get('maxTextWidthForWords')[index];
    } else {
      return this.get('maxTextWidth')[index];
    }
  },

  isWord(chordText) {
    return chordText.match(/^[a-zA-Z]{3}/);
  },

  decreaseChordText(index) {
    const newCssClassIndices = this.get('cssClassIndices');
    newCssClassIndices[index]++;
    this.setCssClassIndices(newCssClassIndices);
  },

  setCssClassIndices(indices) {
    this.setProperties({
      'cssClassIndices': indices,
      'chordsData': this.getChordsDataForCssClassIndices(indices)
    });
  },

  getChordsDataForCssClassIndices(indices) {
    return this.get('chords').map((chord, index) => {
      return {
        'chordName': chord,
        'className': this.get('boxSizeClasses')[indices[index]]
      };
    });
  }

});
