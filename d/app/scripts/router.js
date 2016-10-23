// Router
var $ = require('jquery');
var Backbone = require('backbone');

var models = require('./models/bookmark');
var views = require('./views/bookmark');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'bookmark/:id': 'goToBookmark'
  },
  initialize: function(){
    this.collection = new models.BookmarkCollection();
    this.collection.fetch();
  },
  index: function(){
    console.log('home view');
    var form = new views.BookmarkForm({collection: this.collection}),
        bookmarkList = new views.BookmarkList({
          collection: this.collection
        });

    $('#app')
      .html(form.render().el)
      .append(bookmarkList.render().el);
  },
  goToBookmark: function(id){
    console.log('bookmark view', id);
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;