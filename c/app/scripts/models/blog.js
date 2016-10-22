// Models

var Backbone = require('backbone');


var BlogPost = Backbone.Model.extend({
  idAttribute: '_id'
});

var BlogCollection = Backbone.Collection.extend({
  model: BlogPost,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/mtblogreader'
});

module.exports = {
  BlogPost: BlogPost,
  BlogCollection: BlogCollection
}