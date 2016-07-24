;(function($) {
	'use strict';
	var NewPlugin = function(element, options) {
		this.element = element;
		this.options = $.extend({}, NewPlugin.defaults, options);
		this.init();
	};

	NewPlugin.defaults = {

	};

	NewPlugin.prototype.init = function() {

	};

	NewPlugin.prototype.method = function() {
		console.log('method', arguments);
	};

	NewPlugin.prototype._method = function() {
		console.log('_method', arguments);
	};

	NewPlugin.prototype._makeCallback = function(name) {
		if(typeof this.options[name] === 'function') {
			var args = Array.prototype.slice.call(arguments);
			args.shift();
			this.options[name].apply(this, args);
		}
	};

	$.fn.NewPlugin = function(options) {
		var args = arguments;
		return this.each(function() {
			var element = $(this),
				instance = element.data('NewPlugin'),
				methodName;
			if (instance) {
				args = Array.prototype.slice.apply(args);
				methodName = args[0];
				if (typeof methodName === 'string' && methodName.charAt(0) !== '_' && $.isFunction(instance[methodName])) {
					instance[methodName].apply(instance, args.slice(1));
				}
			} else {
				element.data('NewPlugin', new NewPlugin(element, options));
			}
		});
	};
}(jQuery));
