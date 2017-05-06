export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.namespace = '/api';

  this.get('/charts', function(schema) {
    return schema.charts.all();
    /*return {
      data: [
        {
          type: 'charts',
          id: 1,
          attributes: {
            title: "All of me"
          }
        },
        {
          type: 'charts',
          id: 2,
          attributes: {
            title: "It Don't Mean A Thing"
          }
        }
      ]
    };*/
  });

  this.get('/charts/1', function() {
    return {
      data: {
        type: 'charts',
        id: 1,
        attributes: {
          title: "All of me",
        },
        relationships: {
          sections: {
            data: [
              { type: 'section', id: 1 }
            ]
          }
        }
      },
      included: [
        {
          type: 'section',
          id: 1,
          attributes: {
            name: 'Intro'
          },
          relationships: {
            lines: {
              data: [
                { type: 'line', id: 1 }
              ]
            }
          }
        },
        {
          type: 'line',
          id: 1,
          attributes: {},
          relationships: {
            measures: {
              data: [
                { type: 'measure', id: 1 }
              ]
            }
          }
        },
        {
          type: 'measure',
          id: 1,
          attributes: {
            'beat-schema': '4'
          },
          relationships: {
            chords: {
              data: [
                { type: 'chord', id: 1}
              ]
            }
          }
        },
        {
          type: 'chord',
          id: 1,
          attributes: {
            name: 'C7'
          }
        }
      ]
    };
  });

}
