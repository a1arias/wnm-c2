define([
	'jquery',
	'underscore',
	'backbone',
	'highcharts',
	'targets/ResultCollection',
	'text!./ResultChart.html'
], function($, _, Backbone, Highcharts, ResultCollection, tpl){
	var view = Backbone.View.extend({
		initialize: function(){
			this.template = _.template(tpl);
			this.colleciton = new ResultCollection();
			Highcharts.setOptions({
				global : {
					useUTC : false
				}
			});
		},
		render: function(){
			var that = this;

			$(this.el).html(this.template());

			var seriesOptions = [],
				yAxisOptions = [],
				seriesCounter = 0,
				names = ['MSFT', 'AAPL', 'GOOG'],
				colors = Highcharts.getOptions().colors;

			$.each(names, function(i, name) {

				$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename='+ name.toLowerCase() +'-c.json&callback=?',	function(data) {

					seriesOptions[i] = {
						name: name,
						data: data
					};

					// As we're loading the data asynchronously, we don't know what order it will arrive. So
					// we keep a counter and create the chart when all the data is loaded.
					seriesCounter++;

					if (seriesCounter == names.length) {
						that.createChart();
					}
				});
			});

			return this;
		},
		createChart: function(){
			var that = this;

			$(this.el).find('#hschart').highcharts({
				chart: {
		    },

		    rangeSelector: {
		        selected: 4
		    },

		    yAxis: {
		    	labels: {
		    		formatter: function() {
		    			return (this.value > 0 ? '+' : '') + this.value + '%';
		    		}
		    	},
		    	plotLines: [{
		    		value: 0,
		    		width: 2,
		    		color: 'silver'
		    	}]
		    },
		    
		    plotOptions: {
		    	series: {
		    		compare: 'percent'
		    	}
		    },
		    
		    tooltip: {
		    	pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
		    	valueDecimals: 2
		    },
		    
		    series: that.seriesOptions
			});
		}
	});

	return view;
});