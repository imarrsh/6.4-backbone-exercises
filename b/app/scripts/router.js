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
    
    this.collection.on('add', function(){
      console.log('add firing');
    });

    this.collection.add([
      {
        'firstName': 'Marshall',
        'lastName': 'Thompson',
        'title': 'Front End Engineer',
        'address1': '111 N. Calhoun St.',
        'address2': 'Apt. B',
        'city': 'Greenville',
        'state': 'SC',
        'zip': '29601'
      },
      {
        'firstName': 'Todd',
        'lastName': 'Thompson',
        'title': 'Front End Engineer',
        'address1': '111 N. Calhoun St.',
        'address2': 'Apt. B',
        'city': 'Greenville',
        'state': 'SC',
        'zip': '29601'
      }
    ]);

    this.collection.fetch();
  },
  index: function(){
    console.log(this.collection);

    var formPerson = new views.FormView({collection: this.collection});
    var personList = new views.PersonList({collection: this.collection});

    $('.app')
      .html(formPerson.render().el)
      .append(personList.render().el);
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;