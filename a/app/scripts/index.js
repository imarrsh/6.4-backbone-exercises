var $ = require('jquery');
var Backbone = require('backbone');
require('./router');


// DOM Ready - Call the backbone history
$(function(){
  Backbone.history.start();
}());
