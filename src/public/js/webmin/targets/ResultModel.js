define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	var model = Backbone.Model.extend({
		defaults: {
			target_id: '',
			time_probe_completed: '',
			response_code: '',
			total_time: '',
			namelookup_time: '',
			connect_time: '',
			download_speed_bps: '',
			identity: '',
			error_message: ''
		}
	});

	return model;
});