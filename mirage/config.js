export default function() {

  this.namespace = '/api';

  this.get('/charts', function(schema, request) {

    let titleRegex;

    if (request.queryParams.title) {
      titleRegex = new RegExp('.*' + request.queryParams.title + '.*', 'i');
    }

    return schema.charts.all().filter(chart => {

      if (titleRegex) {

        if (titleRegex.test(chart.title)) {
          return chart;
        }

      } else {
        return chart;
      }

    });

  });

  this.get('/charts/:id', (schema, request) => {
    return schema.charts.find(request.params.id);
  });

  this.get('/sections/:id', (schema, request) => {
    return schema.sections.find(request.params.id);
  });

  this.get('/lines/:id', (schema, request) => {
    return schema.lines.find(request.params.id);
  });

  this.get('/measures/:id', (schema, request) => {
    return schema.measures.find(request.params.id);
  });

  this.get('/chords/:id', (schema, request) => {
    return schema.chords.find(request.params.id);
  });

}
