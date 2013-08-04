define([
	'jquery',
	'underscore',
	'backbone',
	'shared/ErrorView',
	'targets/ResultChart',
	'text!./details.html'
], function($, _, Backbone, ErrorView, ResultChart, tpl){
	var view = Backbone.View.extend({
		events: {
			// 'change .enabled': 'saveTarget',
			'click input[type=submit]': 'saveTarget',
			'focus input': 'removeErrMsg'
		},
		className: 'contentInner',
		initialize: function(){
			var that = this;
			this.template = _.template(tpl);
			
			this.resultChart = new ResultChart({
				targetId: that.options.targetId,
				width: $(that.el).width()
			});
			
			this.resultChart.on('ready', function(){
				$(that.el).append(that.resultChart.el);
			});
		},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		saveTarget: function(e){
			var that = this;

			e.preventDefault();

			var enabledEl = $(this.el).find('.enabled');
			var enabled = enabledEl.prop('checked');
			debugger;

			var obj = {
				url: $(this.el).find('.targetUrl').val(),
				poll_freq_sec: $(this.el).find('.poll_freq_sec').val(),
				enabled: enabled
			};

			this.model.save(obj, {
				patch: true,
				success: function(model, response, options){
					debugger;
				},
				error: function(model, xhr, options){
					debugger;
				}
			});

		},
		displayErrorMsg: function(model, err){
			var err = err.errors;
			// this.removeErrMsg();

			_.each(err, function(value, key, list){
				debugger;
				// cg == control-group
				var cg = $(this.el).find('#'+key+'CG');
				// thisElm == the helper msg
				var thisElm = $(cg).find('span.errhelp');
				
				thisElm.text(value);
				thisElm.show();
				cg.addClass('error');

				// $(this.el).find('form').after(this.errTmpl({ msg: em }));
			}, this);
		},
		removeErrMsg: function(){
			$(this.el).find('.control-group').removeClass('error');
			$(this.el).find('.errhelp').hide();
		}
	});

	return view;
})