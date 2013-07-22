define([
	'jquery',
	'underscore',
	'backbone'
], function(){
	var collection = Backbone.Collection.extend({
		url: '/results',
		initialize: function(){

		},
		getData: function(){

		}
	});

	return collection;
});