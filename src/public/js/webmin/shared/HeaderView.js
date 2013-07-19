define([
  'jquery',
  'underscore',
  'backbone',
  'text!./header.html'
], function($, _, Backbone, tpl){
  var HeaderView = Backbone.View.extend({
    initialize: function(){
      //this.id = 'content-header';
      //this.tagName = 'div';
      this.template = _.template(tpl);
    },
    render: function(){
      this.template = _.template(tpl);
      $(this.el).html(this.template);
      return this;
    },
    select: function(item){
      $('.nav li').removeClass('active');
      $('#' + item).addClass('active');
    },
    deselect: function(){
      $('.nav li').removeClass('active');
    }
  });

  return HeaderView;
});