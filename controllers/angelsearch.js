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

  var results = $('.results-list .result')
      .map(function(ind, elem) {
        var name = $(elem).find('.title').text().trim();
        var type = $(elem).find('.type').text().trim();
        return {
          name: name,
          type: type,
        };
      }).get();

  return results;
}

module.exports = AngelSearch;
