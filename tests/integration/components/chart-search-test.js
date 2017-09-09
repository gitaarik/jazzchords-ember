import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-search', 'Integration | Component | chart search', {
  integration: true
});

test('it renders correctly', function(assert) {
  this.render(hbs`{{chart-search}}`);
  assert.ok(this.$('.chart-search').length);
  assert.ok(this.$('.chart-search .chart-search-input').length);
});

test('renders with search results', function(assert) {
  this.render(hbs`{{chart-search searchResults=searchResults}}`);
  assert.ok(this.$('.chart-search').length);
  assert.ok(this.$('.chart-search .chart-search-input').length);
});
