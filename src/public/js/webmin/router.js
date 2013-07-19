define([
	'jquery',
	'underscore',
	'backbone',
	'shared/HeaderView',
	'targets/main'
], function($, _, Backbone, HeaderView, TargetsView){
	
	var Router = Backbone.Router.extend({
		routes: {
			'': 'showAlerts',
			'!/home': 'showAlerts',
			'!/alerts': 'showAlerts',
			'!/urls(/:id)': 'showUrls',
			'!/targets(/:id)': 'showTargets'
		},
		initialize: function(){
			var that = this;

			this.elms = {
				content: $('#content'),
				header: $('#header')
			};

			this.headerView = new HeaderView();
			//this.alertsView = new AlertsView();
			//this.urlsView = new UrlsView();

			// this.on('data:loaded', function(data){
			// 	that.alertsView.trigger('data:loaded', data.alerts);
			// 	that.urlsView.trigger('data:loaded', data.urls);
			// });

			$('#header').html(this.headerView.render().el);
			this.headerView.select('alerts-menu');
		},
		showTargets: function(){
			this.headerView.select('targets-menu');

			this.targetsView = new TargetsView();
			this.elms['content'].html(this.targetsView.render().el);
		},
		showUrls: function(id){
			//var that = this;

			this.headerView.select('urls-menu');
			
			// if(id){
			// 	this.urlsView.options.filterById = id;
			// } else {
			// 	this.urlsView.options.filterById = '';
			// }
			
			//this.elms['content'].html(this.urlsView.render().el);
		},
		showAlerts: function(){
			this.headerView.select('alerts-menu');
			
			var that = this;


			// if(this.alertsView){
			// 	delete this.alertsView;
			// 	this.alertsView = new AlertsView();
			// };

			// this.alertsView.render(function(){
			// 	that.elms['content'].html(that.alertsView.el);
			// });
		}
	});

	return Router;
});