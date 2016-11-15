# AngelSearch

AngelSearch was built in <4 hours for the technical portion of @Stackfolio's
intern hiring process (spoiler: got the job!).

It provides an alternate (and faster) search interface for AngelList by
dynamically retrieving search results from AngelList as the user types. It also
aggregates some very basic metadata and "stats" about the results as they are
compiled.

![AngelSearch Screencast](http://i.imgur.com/nsSlnoa.gif)

Because there is no publicly available AngelList API, AngelSearch takes the
user's search input, navigates to the correct search URL on AngelList, and
scrapes the page to get the results. The scraped data is then standardized (enough)
and then passed to the front-end in an easy-to-understand JSON format.

The main limitation is that it only retrieves the first ~40 results (or
whatever AngelList presents in the first page of search results). This is
caused by time constraints and not technological (scraping can be extended to
handle pagination).

## Installing and Running

```
$ npm install
$ npm start
```
