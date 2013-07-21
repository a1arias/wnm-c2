define([
	'jquery',
	'underscore',
	'backbone',
	'shared/ErrorView',
	'text!./details.html'
], function($, _, Backbone, ErrorView, tpl){
	var view = Backbone.View.extend({
		events: {
			'change .enabled': 'saveTarget',
			// 'click .enabled': 'saveTarget'
			'focus input': 'removeErrMsg'
		},
		initialize: function(){
			this.template = _.template(tpl);
		},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		saveTarget: function(e){
			var that = this;

			e.preventDefault();

			var enabledEl = $(this.el).find('.enabled');
			var enabled = enabledEl.val();
			debugger;

			// the checkbox is already checked
			if(enabled == 'on'){
				// unset the attr
				enabledEl.prop('checked', false);
				enabled = false;
			// else the checkbox was unchecked
			} else {
				enabledEl.prop('checked', true);
				enabled = true;
			};

			var obj = {
				url: $(this.el).find('.targetUrl').val(),
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