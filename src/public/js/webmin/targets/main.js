define([
  'jquery',
  'underscore',
  'backbone',
  'targets/collection',
  'targets/target'
], function($, _, Backbone, TargetsCollection, TargetView){

  var view = Backbone.View.extend({
    id: 'targetlist',
    initialize: function(){
      this.collection = new TargetsCollection();
      this.on('data-loaded', function(){
        this.renderTargets();
      });
    },
    render: function(){
      var self = this;

      this.collection.fetch({
        success: function(col, res, opts){
          self.trigger('data-loaded');
        },
        error: function(col, res, opts){
          debugger;
        }
      });
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