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

$('input#search').keyup(_.debounce(function(event) {
  event.preventDefault();
  Query.setQuery(event.target.value);
}, 100));


var templates = {
  result: $.templates("#resultTemplate"),
  location: $.templates("#locationTemplate"),
  type: $.templates("#typeTemplate"),
};
var $resultsList = $('#resultsList');
var $locationsList = $('#locationsList');
var $typesList = $('#typesList');

var renderResults = function(results) {
  $resultsList.html(templates.result.render(results));
};

var renderLocations = function(locations) {
  var locs = [];
  $.each(locations, function(key, value) {
    if (key === 'null') { return; }
    locs.push({name: key, count: value});
  });
  locs.push({name: "Unknown", count: locations.null});
  $locationsList.html(templates.location.render(locs));
};

var renderTypes = function(types) {
  var typeArr = [];
  $.each(types, function(key, value) {
    if (key === 'null') { return; }
    typeArr.push({name: key, count: value});
  });
  typeArr.push({name: "Unknown", count: types.null});
  $typesList.html(templates.type.render(typeArr));
};

var getSearchResults = function(query) {
  // console.log('fire xhr request with query:', query);
  $.get('/search', {q: query}, function(res) {
    console.log('server response:', res);
    renderResults(res.results);
    renderLocations(res.locations);
    renderTypes(res.types);
  });
};

Query.onQueryChange.push(getSearchResults);
