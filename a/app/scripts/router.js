var $ = require('jquery');
var Backbone = require('backbone');
var models =  require('./models/post');
var views =  require('./views/post');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
  },
  initialize: function(){
    // go get collection and set it to this
    this.collection = new models.PostCollection();
    this.collection.add([
      {"title": "Hello World", "body":"Hello Everyone!"},
      {"title": "Hello Again", "body":"suh dude"},
    ]);
  },
  index: function(){
    // instantiate the blog post view
    var blogPostForm = new views.BlogPostForm({collection: this.collection});
    var blogPosts = new views.BlogPostList({collection: this.collection})    
    // render the form to the app container
    $('#app')
      .html(blogPostForm.render().el)
      .append(blogPosts.render().el);
  }
});


// instantiate AppRouter
var appRouter = new AppRouter();

module.exports = appRouter;