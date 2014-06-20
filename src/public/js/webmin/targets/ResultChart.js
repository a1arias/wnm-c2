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
      
      this.tt = {
        name: 'total_time',
        data: []
      };

      this.ttnl = {
        name: 'name_lookup_time',
        data: []
      };

      this.ttc = {
        name: 'connect_time',
        data: []
      };

      this.ttst = {
        name: 'starttransfer_time',
        data: []
      };

      this.errors = {
        type: 'flags',
        name: 'errors',
        shape: 'circlepin',
        data: []
      };

      var socket = io.connect('http://archy-lt.adr.ari');
      // when sync is triggered the data
      // object can be used to re-build graph
      socket.on('sync', function(data){
        debugger;
        console.log(data);
        // join the target channel
        socket.emit('join:results', that.options.targetId);
      });

      socket.on('message', function(data){
        debugger;
        var el = data.msg;
        // do something with the updated data
        if(data.msg.error_message){
          var lerr = {
            x : el.time_probe_completed,
            title : 'E',
            text : el.error_message
          };
          var error_series = _.findWhere(that.chart.series, {
            name: 'errors'
          });
          error_series.addPoint(lerr, true, true);
        } else {
          var ltt = [el.time_probe_completed, el.total_time];
          var lttnl = [el.time_probe_completed, el.namelookup_time];
          var lttc = [el.time_probe_completed, el.connect_time];
          var lttst = [el.time_probe_completed, el.starttransfer_time];
          
          var allseries = that.chart.series;

          var tt_series = _.findWhere(allseries, {
            name: 'total_time'
          });
          var ttnl_series = _.findWhere(allseries, {
            name: 'name_lookup_time'
          });
          var ttc_series = _.findWhere(allseries, {
            name: 'connect_time'
          });
          var ttst_series = _.findWhere(allseries, {
            name: 'starttransfer_time'
          });
          
          tt_series.addPoint(ltt, true, true);
          ttnl_series.addPoint(lttnl, true, true);
          ttc_series.addPoint(lttc, true, true);
          ttst_series.addPoint(lttst, true, true);
        };
        // var msg = JSON.parse(data.msg);
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

      $(this.el).html(this.template());

      $.getJSON(url)
      .done(function(data){
        if(data.success && data.results.length > 0){
          _.each(data.results, function(el, index, list){
            if(el.error_message){
              var lerr = {
                x : el.time_probe_completed,
                title : 'E',
                text : el.error_message
              };
              that.errors.data.push(lerr);
            } else {
              var ltt = [el.time_probe_completed, el.total_time];
              var lttnl = [el.time_probe_completed, el.namelookup_time];
              var lttc = [el.time_probe_completed, el.connect_time];
              var lttst = [el.time_probe_completed, el.starttransfer_time];
              
              that.tt.data.push(ltt);
              that.ttnl.data.push(lttnl);
              that.ttc.data.push(lttc);
              that.ttst.data.push(lttst);
            };
          }, that);

          that.seriesOptions.push(that.tt);
          that.seriesOptions.push(that.ttnl);
          that.seriesOptions.push(that.ttc);
          that.seriesOptions.push(that.ttst);
          that.seriesOptions.push(that.errors);

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
        chart: {
          renderTo: $(this.el).find('#hschart')[0]
        },
        series: that.seriesOptions,
        width: that.options.width
      };

      this.chart = new Highcharts.StockChart(chartOpts);
    //   $(this.el).find('#hschart').highcharts('StockChart', chartOpts);
    //   debugger;
      this.trigger('ready');
    },
    getWidth: function(){
      debugger;
      return $(this.el).width() - 20;
    }
  });

  return view;
});