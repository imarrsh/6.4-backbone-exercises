// views

var $ = require('jquery');
var Backbone = require('backbone');
// templates
var formPersonEntry = require('../../templates/form-person-entry.hbs');
var partialPerson = require('../../templates/partial-person.hbs');


var FormView = Backbone.View.extend({
  tagName: 'div',
  className: 'well col-xs-12',
  template: formPersonEntry,
  events: {
    'submit form' : 'submitData'
  },
  render: function(){
    this.$el.html(this.template());
    return this;
  },
  submitData: function(e){
    e.preventDefault();
    console.log('submission stopped');
    var form = this.$el.find('#person-data');
    if(form.find('input[type="text"]').val()){
      var formSerial = form.serializeArray();
      var formData = {}
      // loop thru the form serial and add
      // key/vals to formData object
      formSerial.forEach(function(field){
        formData[field.name] = field.value;
      });
      this.collection.create(formData);
      
      form[0].reset();
    }
  }

});


// describe personlist view
var PersonList = Backbone.View.extend({
  tagName: 'div',
  className: 'people-listing',
  initialize: function(){
    console.log('personlist firing');
    this.listenTo(this.collection, 'add', this.renderPersonView);
  },
  render: function(){
    return this;
  },
  renderPersonView: function(person){
    var personView = new Person({ model: person });
    this.$el.append(personView.render().el);
  }
});


// describe person view
var Person = Backbone.View.extend({
  tagName: 'div',
  className: 'col-md-3',
  events: {
    'click' : 'removePerson'
  },
  template: partialPerson,
  initialize: function(){
    console.log('person firing');
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'changed', this.render);
  },
  render: function(){
    var context = this.model.toJSON();
    var renderedPerson = this.template(context);
    this.$el.html(renderedPerson);
    
    return this;   
  },
  removePerson: function(){
    this.model.destroy();
  }
}); 

module.exports = {
  FormView: FormView,
  PersonList: PersonList,
  Person: Person
};