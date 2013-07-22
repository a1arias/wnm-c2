define([
  'jquery',
  'underscore',
  'backbone',
  'targets/ResultModel'
], function($, _, Backbone, ResultModel){
  var collection = Backbone.Collection.extend({
    model: ResultModel,
    // url: function(){
    //   debugger;
    //   return '/targets/'+this.options.targetId+'/results'
    // },
    initialize: function(){
      var self = this;
      this.fetch({
        success: function(col, res, opts){
          self.trigger('ready');
        },
        error: function(col, res, opts){
          debugger;
        }
      });
    }
  });

  return collection;
});