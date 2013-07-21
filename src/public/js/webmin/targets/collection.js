define([
  'jquery',
  'underscore',
  'backbone',
  'targets/model'
], function($, _, Backbone, TargetModel){
  var collection = Backbone.Collection.extend({
    url: '/targets',
    model: TargetModel,
    initialize: function(){
      var self = this;
      this.fetch({
        success: function(col, res, opts){
          self.trigger('data-loaded');
        },
        error: function(col, res, opts){
          debugger;
        }
      });
    }
  });

  return collection;
});