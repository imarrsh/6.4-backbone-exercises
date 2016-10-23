// Router

var $ = require('jquery');
var Backbone = require('backbone');

var views = require('./views/blog');
var models = require('./models/blog');

var AppRouter = Backbone.Router.extend({
  initialize: function(){
    // fetch the collection
    this.collection = new models.BlogCollection();
    this.collection.fetch();
  },
  routes: {
    'post/:id': 'blogView',
    '' : 'index'
  },
  index: function(){
    console.log('Hello World');
    
    var wrapper = new views.BlogPostListParentView({collection: this.collection});

    console.log(wrapper); // cid is different each time
    $('#app')
      .html(wrapper.render().el);
  },
  blogView: function(id){
    
    var self = this;
    // go find the model with specified id
    var post = this.collection.get(id);
    // console.log(post);

    if(!post){
      this.collection.fetch().then(function(){
        self.blogView(id);
      });
      return;
    }
    // go get blog post view
    var postView = new views.BlogPostView({model: post});
    
    $('#app')
    .html(postView.render().el);
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;