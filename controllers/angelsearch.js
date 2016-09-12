var request = require('request');
var cheerio = require('cheerio');
var Q = require('q');

var AngelSearch = {};
var ANGELLIST_URL = 'https://angel.co/search?';

AngelSearch.search = function(query) {
  var deferred = Q.defer();
  request(ANGELLIST_URL + 'q=' + query, function(err, response, body) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(parseSearchHTML(body));
    }
  });
  return deferred.promise;
};

function parseSearchHTML(html) {
  var $ = cheerio.load(html);

  var types = {};
  var locations = {};

  var results = $('.results-list .result')
      .map(function(ind, elem) {
        var name = $(elem).find('.title').text().trim();
        var info = $(elem).find('.type').text().trim();
        var type = null;
        var location = null;
        if (info.length !== 0) {
          type = info.split(' · ')[0];
          location = info.split(' · ')[1] || null;
        }

        types[type] = types[type] ? types[type] + 1 : 1;
        locations[location] = locations[location] ? locations[location] + 1 : 1;

        return {
          name: name,
          type: type,
          location: location,
        };
      }).get();

  return {
    results: results,
    types: types,
    locations: locations,
  };
}

module.exports = AngelSearch;
