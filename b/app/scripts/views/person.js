// views

var $ = require('jquery');
var Backbone = require('backbone');
// templates
var formPersonEntry = require('../../templates/form-person-entry.hbs');

var FormView = Backbone.View.extend({
  tagName: 'div',
  className: 'well col-xs-12',
  template: formPersonEntry,
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.html(this.template());
    return this;
  }

});

module.exports = {
  FormView: FormView
}