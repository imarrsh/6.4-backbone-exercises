var $ = require('jquery');
var Backbone = require('backbone');
var models =  require('./models/post');
var views =  require('./views/post');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
  },
  initialize: function(){
    // go get collection
  },
  index: function(){
    // instantiate first page view
    console.log('index view launched!');
    
    $('#app')
      .html('Hi!');
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;