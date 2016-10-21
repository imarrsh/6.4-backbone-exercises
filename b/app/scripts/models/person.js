// models

var $ = require('jquery');
var Backbone = require('Backbone');

var Person = Backbone.Model.extend({
  idAttribute: '_id'
});

var PersonCollection = Backbone.Collection.extend({
  model: Person,
  url: 'https://tiny-lasagna-server.com/collections/mtpeople'
});

module.exports = {
  Person: Person,
  PersonCollection: PersonCollection
}