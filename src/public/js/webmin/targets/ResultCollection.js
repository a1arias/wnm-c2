define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	var collection = new Backbone.Collection.extend({
		url: '/results'
		initialize: function(){

		}
	});

	return collection;
})