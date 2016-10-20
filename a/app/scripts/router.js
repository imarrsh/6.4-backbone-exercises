var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
  },
  index: function(){
    // instantiate views
    console.log('index view launched');
  }
});