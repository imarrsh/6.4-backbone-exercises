// Views
var $ = require('jquery');
var Backbone = require('backbone');

var models = require('../models/bookmark');
// templates
var formTemplate = require('../../templates/form-template.hbs');
var bookmarkItemTemplate = require('../../templates/bookmark-item-template.hbs');

var BookmarkForm = Backbone.View.extend({
  tagName: 'div',
  className: 'well',
  events: {
    'submit form': 'submitBookmark'
  },
  template: formTemplate,
  render: function(){
    this.$el.html(this.template());
    return this;
  },
  submitBookmark: function(e){
    e.preventDefault();
    var $data = $('#bookmark-form').serializeArray(),
        newModel = {};
        
    $data.forEach(function(field){
      newModel[field.name] = field.value;
    });
    this.collection.create(newModel);
    $('#bookmark-form')[0].reset();
  }
});


var BookmarkList = Backbone.View.extend({
  tagName: 'ul',
  className: 'list-group bookmarks-list',
  initialize: function(){
    this.listenTo(this.collection, 'add', this.getBookmarkItem);
  },
  render: function(){
    return this;
  },
  getBookmarkItem: function(item){
    var bookmark = new BookmarkItem({model: item});
    this.$el.append(bookmark.render().el);
  }

});

var BookmarkItem = Backbone.View.extend({
  tagName: 'li',
  className: 'list-group-item bookmark-li',
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'changed', this.render);
  },
  events: {
    'click .remove-bookmark': 'removeBookmark'
  },
  template: bookmarkItemTemplate,
  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    return this;
  },
  removeBookmark: function(){
    this.model.destroy();
  }

});

module.exports = {
  BookmarkForm: BookmarkForm,
  BookmarkList: BookmarkList,
  BookmarkItem: BookmarkItem
}