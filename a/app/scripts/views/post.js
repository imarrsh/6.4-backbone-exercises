// Views - app/scripts/views

var $ = require('jquery');
var Backbone = require('backbone');

// get form template
var blogFormTemplate = require('../../templates/postform.hbs');
var blogPostTemplate = require('../../templates/blogpost.hbs');

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
    // post data to server
    console.log('submit heard...');
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
  template: blogPostTemplate,
  initialize: function(){
    console.log('blog post called');
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function(){
    var context = this.model.toJSON();

    this.$el.html(this.template(context));
    return this;
  }
});


module.exports = {
  BlogPostForm: BlogPostForm,
  BlogPostList: BlogPostList,
  BlogPost: BlogPost
}

