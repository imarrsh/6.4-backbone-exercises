// Models - app/scripts/models

var Backbone = require('backbone');

var Post = Backbone.Model.extend({
  idAttribute: '_id'
});

var PostCollection = Backbone.Collection.extend({
  model: Post,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/mtblog'
});


module.exports = {
  Post: Post,
  PostCollection: PostCollection
}