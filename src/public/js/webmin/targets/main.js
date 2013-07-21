define([
  'jquery',
  'underscore',
  'backbone',
  'targets/target'
], function($, _, Backbone, TargetView){

  var view = Backbone.View.extend({
    id: 'targetlist',
    initialize: function(){
      //this.collection = new TargetsCollection();
      
    },
    render: function(){
      var self = this;
      
      return this;
    },
    renderTargets: function(){
      this.collection.forEach(function(target){
        var tv = new TargetView({
          model: target
        });
        tv.render();
        $(this.el).append(tv.el);
      }, this);
    }
  });

  return view;

});