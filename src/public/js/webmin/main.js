requirejs.config({
	paths: {
		bootstrap: [
			//'//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js',
			'../vendor/bootstrap'
		],
		jquery: [
			'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
			'../vendor/jquery'
		],
		backbone: [
			//'http://backbonejs.org/backbone',
			'../vendor/backbone'
		],
		underscore: [
			//'http://underscorejs.org/underscore',
			'../vendor/underscore'
		],
		text: [
			'https://raw.github.com/requirejs/text/master/text',
			'../vendor/text'
		]
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'bootstrap'
		}
	},
	enforceDefine: true
});

define([
	'core'
], function(core){
	Core = {};
	core.initialize();
});