// Views

var Backbone = require('backbone');
var models = require('../models/blog');

var blogPostListContainer = require('../../templates/blog-parent-wrapper.hbs');
var blogPostContainer = require('../../templates/blog-post-preview.hbs');


var BlogPostListParentView = Backbone.View.extend({
  tagName: 'section',
  className: 'main',
  template: blogPostListContainer,
  initialize: function(){
    // spin up a new child view
    this.childView = new BlogPostList();
  },
  render: function(){
    // render the wrapper template
    this.$el.html(this.template());
    // append the child view
    this.$el.append(this.childView);
    // render the child view
    this.childView.render();

    return this;
  }
});

var BlogPostList = Backbone.View.extend({
  tagName: 'ul',
  className: 'blog-post',
  initialize: function(){
    // go get the models collection
    this.collection = new models.BlogCollection();
    this.listenTo(this.collection, 'add', this.renderBlogPostItem)
  },
  render: function(){
    return this;
  },
  renderBlogPostItem: function(){
    var blogPostItem = new BlogPostItem({collection: this.collection})
  }
});

var BlogPostItem = Backbone.View.extend({
  tagName: 'li'
});

module.exports = {
  BlogPostListParentView: BlogPostListParentView,
  BlogPostList: BlogPostList,
  BlogPostItem: BlogPostItem
}