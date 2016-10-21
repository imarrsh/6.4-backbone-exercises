// Views - app/scripts/views

var $ = require('jquery');
var Backbone = require('backbone');

// get form template
var blogFormTemplate = require('../../templates/postform.hbs');
var blogPostTemplate = require('../../templates/blogpost.hbs');
var wrapperTemplate = require('../../templates/app-wrapper.hbs');

// representation of an app wrapper... about to get weird!
var BlogWrapper = Backbone.View.extend({
  tagName: 'section',
  className: 'app-wrapper',
  template: wrapperTemplate,
  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

// representation of a form container
var BlogPostForm = Backbone.View.extend({
  tagName: 'div',
  className: 'blog-form well',
  events : {
    'submit form' : 'submit'
  },
  template: blogFormTemplate,
  render: function(){
    // fetch template to add to this element
    this.$el.html(this.template());

    return this;
  },
  submit: function(e){
    e.preventDefault();
    // save data in collection and post data to server
    this.collection.create({
      title: $('input[name="title"]').val(),
      postBody: $('textarea[name="postBody"]').val()
    });
    $('#blog-entry')[0]
      .val('')
  }
});

// representation of the blog post list
var BlogPostList = Backbone.View.extend({
  tagName: 'ul',
  className: 'list-group',
  initialize: function(){
    // listen for add event on collection
    this.listenTo(this.collection, 'add', this.renderBlogPost);
  },
  render: function(){
    this.$el.append('<li><h3>Previous Posts</h3></li>')
    return this;
  },
  renderBlogPost: function(post){
    // instantiate blog post
    var blogPostItem = new BlogPost({model: post});
    this.$el.append(blogPostItem.render().el);
  }
});

// representation of a blog post
var BlogPost = Backbone.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  events: {
    'click': 'deletePost'
  },
  template: blogPostTemplate,
  initialize: function(){
    console.log('blog post called');
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'changed', this.render)
  },
  render: function(){
    var context = this.model.toJSON();

    this.$el.html(this.template(context));
    return this;
  },
  deletePost: function(){
    this.model.destroy();
  }
});


module.exports = {
  BlogPostForm: BlogPostForm,
  BlogPostList: BlogPostList,
  BlogPost: BlogPost,
  BlogWrapper: BlogWrapper
}

