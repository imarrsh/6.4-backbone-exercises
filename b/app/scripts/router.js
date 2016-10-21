// Router
var $ = require('jquery');
var Backbone = require('backbone');

// models, views
var models = require('./models/person');
var views = require('./views/person');

var AppRouter = Backbone.Router.extend({
  routes:{
    '': 'index'
  },
  initialize: function(){
    this.collection = new models.PersonCollection();
    this.collection.add({
      'firstName': 'Marshall',
      'lastName': 'Thompson',
      'title': 'Front End Engineer',
      'address1': '111 N. Calhoun St.',
      'address2': 'Apt. B',
      'city': 'Greenville',
      'state': 'SC',
      'zip': '29601'
    });
  },
  index: function(){
    console.log('Hello World!');
    var formPerson = new views.FormView({collection: this.collection});

    $('.app')
      .html(formPerson.render().el);
  }
});

var appRouter = new AppRouter();