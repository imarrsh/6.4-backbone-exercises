// Views

var Backbone = require('backbone');
var models = require('../models/blog');

var blogPostListContainer = require('../../templates/blog-parent-wrapper.hbs');
var blogPostContainer = require('../../templates/blog-post-preview.hbs');
var blogPostContent = require('../../templates/blog-post-view.hbs');

var BlogPostListParentView = Backbone.View.extend({
  tagName: 'section',
  className: 'main',
  template: blogPostListContainer,
  initialize: function(){
    // spin up a new child view
    this.childView = new BlogPostList({collection: this.collection});
  },
  render: function(){
    // render the wrapper template
    this.$el.html(this.template());
    // append the child view
    this.$el.find('.content').append(this.childView.$el);
    // render the child view
    this.childView.render().el;

    return this;
  }
});

var BlogPostList = Backbone.View.extend({
  tagName: 'ul',
  className: 'blog-post-list',
  initialize: function(){
    // listen for add events on the collection
    this.listenTo(this.collection, 'add', this.renderBlogPostItem)
  },
  render: function(){
    return this;
  },
  renderBlogPostItem: function(post){
    var blogPostItem = new BlogPostItem({model: post});

    this.$el.append(blogPostItem.render().el);
    
  }
});

var BlogPostItem = Backbone.View.extend({
  tagName: 'li',
  className: 'blog-post',
  events: {
    'click a' : 'navigate'
  },
  template: blogPostContainer,
  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    return this;
  }
});

var BlogPostView = Backbone.View.extend({
  tagName: 'section',
  className: 'blog-post-view',
  initialize: function(){
    console.log(this.model);
    // this.listenTo(this.model, 'changed', this.renderBlogContent);
    this.childView = new BlogPostViewContent({model: this.model});
  },
  render: function(){
    this.$el.html(this.childView.render().el)
    return this;
  },
  renderBlogContent: function(post){
    var content = new BlogPostViewContent({model: post});

    this.$el.append(content.render().el);
  }
});

var BlogPostViewContent = Backbone.View.extend({
  tagname: 'div',
  className: 'blog-post-content',
  template: blogPostContent,
  initialize: function(){
    console.log('hi');
  },
  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    return this;
  }
});


module.exports = {
  BlogPostListParentView: BlogPostListParentView,
  BlogPostList: BlogPostList,
  BlogPostItem: BlogPostItem,
  BlogPostView: BlogPostView,// start new view stuff
  BlogPostViewContent: BlogPostViewContent
};