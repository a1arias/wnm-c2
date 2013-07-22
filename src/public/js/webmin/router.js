define([
	'jquery',
	'underscore',
	'backbone',
	'shared/HeaderView',
	'targets/collection',
	'targets/main',
	'targets/details',
	'targets/ResultChart'
], function($, _, Backbone, HeaderView, 
	TargetsCollection, TargetsView, TargetView,
	TargetResultView){
	
	var Router = Backbone.Router.extend({
		routes: {
			'': 'showTargets',
			'!/home': 'showTargets',
			//'!/alerts': 'showAlerts',
			'!/probes(/:id)': 'showProbes',
			'!/targets(/:id)': 'showTargets',
			'!/poo': 'showResultChart'
		},
		initialize: function(){
			var that = this;

			this.elms = {
				content: $('#content'),
				header: $('#header')
			};

			//this.targetCollection = new TargetsCollection();

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
		showResultChart: function(){
			this.trcView = new TargetResultView();
			this.elms['content'].html(this.trcView.render().el);
		},
		showTargets: function(id){
			var that = this;
			var col = new TargetsCollection();
			
			col.on('data-loaded', function(){
				// if no id was provided, load the target list
				if(!id){
					that.targetsView = new TargetsView({
						collection: col
					});
					that.targetsView.renderTargets();
					that.elms['content'].html(that.targetsView.render().el);
				} else {
					// if id was provided, show target details
					var target = this.where({_id: id})
						, target = target[0]
						;

					that.view = new TargetView({
						model: target,
						targetId: id
					});

					// listen for target validation failure
					target.on('invalid', function(model, err){
						that.view.displayErrorMsg(model, err);
					});

					that.elms['content'].html(that.view.render().el);
				}
			});

			this.headerView.select('targets-menu');
		},
		showProbes: function(id){
			//var that = this;

			this.headerView.select('probes-menu');
			
			// if(id){
			// 	this.urlsView.options.filterById = id;
			// } else {
			// 	this.urlsView.options.filterById = '';
			// }
			
			//this.elms['content'].html(this.urlsView.render().el);
			this.elms['content'].html('');
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