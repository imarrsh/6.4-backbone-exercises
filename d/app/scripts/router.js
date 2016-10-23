// Router
var $ = require('jquery');
var Backbone = require('backbone');

var models = require('./models/bookmark');
var views = require('./views/bookmark');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'tags/:tag': 'showOnlyTags'
  },
  initialize: function(){
    this.collection = new models.BookmarkCollection();
    this.collection.fetch();
    // attach the form to the router
    this.form = new views.BookmarkForm({collection: this.collection});
    
  },
  index: function(){
    console.log('home view');
    var bookmarkList = new views.BookmarkList({
          collection: this.collection
        });

    $('#app')
      .html(this.form.render().el)
      .append(bookmarkList.render().el);
  },
  showOnlyTags: function(tag){
    console.log('bookmark view', tag);

    var bookmarkList = new views.BookmarkList({
      collection: this.collection.filter({tag: tag})
    });

    console.log('bookmark view', bookmarkList);

    $('#app')
      .html(this.form.render().el)
      .append(bookmarkList.render().el);
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;