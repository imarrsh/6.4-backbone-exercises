// Router
var $ = require('jquery');
var Backbone = require('backbone');

var models = require('./models/bookmark');
var views = require('./views/bookmark');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'tag/:tag': 'showOnlyTag'
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
    
    console.log(bookmarkList); // collection

    $('#app')
      .html(this.form.render().el)
      .append(bookmarkList.render().el);
  },
  showOnlyTag: function(tag){
    console.log('bookmark view', tag);

    var filteredBMarks = this.collection.filter(function(model){
      console.log(model.get('tag'));
      return model.get('tag') === tag;
    });

    var filteredBMarkList = new views.BookmarkList({collection: filteredBMarks});

    $('#app')
      .html(this.form.render().el)
      .append(filteredBMarkList.render().el);
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;