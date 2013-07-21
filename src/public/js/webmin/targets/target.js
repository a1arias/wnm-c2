define([
  'jquery',
  'underscore',
  'backbone',
  'text!./target.html'
], function($, _, Backbone, tpl){
  var view = Backbone.View.extend({
    id: function(){
      return 't'+this.model.id;
    },
    className: 'target',
    initialize: function(){
      this.template = _.template(tpl);
    },
    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return view;
});