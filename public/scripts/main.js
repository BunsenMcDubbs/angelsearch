var Query = {
  currentQuery: null,
  onQueryChange: [],
};

Query.setQuery = function(query) {
  if (query === this.currentQuery) {
    return;
  }

  this.currentQuery = query;
  // console.log(this.currentQuery);

  this.onQueryChange.forEach(function(handler) {
    if (typeof handler !== 'function') {
      console.warn('event handler', handler, 'is not a function');
      return;
    }
    handler(query);
  });
};

var getSearchResults = function(query) {
  // console.log('fire xhr request with query:', query);
  $.get('/search', {q: query}, function(res) {
    console.log('server response:', res);
  });
};

Query.onQueryChange.push(getSearchResults);

$('input.search').keyup(_.debounce(function(event) {
  event.preventDefault();
  Query.setQuery(event.target.value);
}, 100));
