define([
	'jquery',
	'underscore',
	'backbone',
	'router',
], function($, _, Backbone, Router){
	var core = {};

	core.initialize = function(){
		var router = this.router = new Router()
			, e = this.bouncer = _.extend({}, Backbone.Events)
			;

		Backbone.history.start();
	};

	core.finalize = function(){

	};

	return core;
});