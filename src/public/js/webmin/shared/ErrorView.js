define([
	'jquery',
	'underscore',
	'backbone',
	'shared/ErrorView',
], function($, _, Backbone, tpl){
	var view = Backbone.View.extend({
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