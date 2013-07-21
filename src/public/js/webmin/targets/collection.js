define([
  'jquery',
  'underscore',
  'backbone',
  'targets/model'
], function($, _, Backbone, TargetModel){
  var collection = Backbone.Collection.extend({
    url: '/targets',
    model: TargetModel
  });

  return collection;
});