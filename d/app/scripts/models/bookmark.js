// Models

var Backbone = require('backbone');

// not sure about this
var ViewModel = Backbone.Model.extend({
  defaults: {
    'currentView': 'home'
  }
});
// maybe delete it soon


var Bookmark = Backbone.Model.extend({
  idAttribute: "_id"
});

var BookmarkCollection = Backbone.Collection.extend({
  model: Bookmark,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/mtbookmarker'
});

module.exports = {
   Bookmark: Bookmark,
   BookmarkCollection: BookmarkCollection
}