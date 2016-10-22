// Router

var $ = require('jquery');
var Backbone = require('backbone');

var views = require('./views/blog');
var models = require('./models/blog');

var AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index'
    // 'post/:id/'
  },
  index: function(){
    console.log('Hello World');
    var wrapper = new views.BlogPostListParentView();

    $('#app')
      .html(wrapper.render().el);
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;