define([
	'jquery',
	'underscore',
	'backbone',
	'highstock',
	'socketio',
	'targets/ResultCollection',
	'text!./ResultChart.html'
], function($, _, Backbone, Highstock, io, ResultCollection, tpl){
	var view = Backbone.View.extend({
		// className: 'contentInner',
		url: function(){
			return '/targets/'+this.options.targetId+'/results';
		},
		initialize: function(){
			var that = this;
			var socket = io.connect('http://dev.cbm.plx:3000');
			
			socket.on('news', function(data){
				console.log(data);
				socket.emit('joined', that.options.targetId);
			});

			this.template = _.template(tpl);
			
			Highcharts.setOptions({
				global : {
					useUTC : false
				}
			});

			this.seriesOptions = [],
			// this.yAxisOptions = [],
			// this.seriesCounter = 0,
			// this.names = ['MSFT', 'AAPL', 'GOOG'],
			this.colors = Highcharts.getOptions().colors;

			this.render();
		},
		render: function(){
			var that = this
				, url = this.url()
				;

			var tt = {
				name: 'total_time',
				data: []
			};

			var ttnl = {
				name: 'name_lookup_time',
				data: []
			};

			var ttc = {
				name: 'connect_time',
				data: []
			};

			var ttst = {
				name: 'starttransfer_time',
				data: []
			};

			$(this.el).html(this.template());

			$.getJSON(url)
			.done(function(data){
				if(data.success && data.results.length > 0){
					_.each(data.results, function(el, index, list){
						var ltt = [el.time_probe_completed, el.total_time];
						var lttnl = [el.time_probe_completed, el.namelookup_time];
						var lttc = [el.time_probe_completed, el.connect_time];
						var lttst = [el.time_probe_completed, el.starttransfer_time];
						tt.data.push(ltt);
						ttnl.data.push(lttnl);
						ttc.data.push(lttc);
						ttst.data.push(lttst);
					}, that);

					that.seriesOptions.push(tt);
					that.seriesOptions.push(ttnl);
					that.seriesOptions.push(ttc);
					that.seriesOptions.push(ttst);

					that.createChart();
				} else {
					// error fetching data
				};
			})
			.fail(function(jqxhr, textStatus, error){
				debugger;
			})
			;

			return this;
		},
		createChart: function(){
			var that = this;

			// var cwidth = this.getWidth();

			var chartOpts = {
		    series: that.seriesOptions
			};

			$(this.el).find('#hschart').highcharts('StockChart', chartOpts);
			this.trigger('ready');
		},
		getWidth: function(){
			return $(this.el).width() - 20;
		}
	});

	return view;
});