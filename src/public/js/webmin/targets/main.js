define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var view = Backbone.View.extend({
    render: function(){
      return this;
    }
  });

  return view;

});