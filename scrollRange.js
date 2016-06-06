/*
 * ScrollRange
 */

var ScrollRange = (function($) {
	var win = $(window),
		scrollTop,
		handlers = [],
		scrollHandler = function() {
			scrollTop = win.scrollTop();
			for (var i = 0, j = handlers.length; i < j; i++) {
				handlers[i]();
			}
		},
		publicAPI = {
			addPoint: function(point, fn) {
				var scrollStateBefore = false;
				var scrollStateAfter = false;
				var getPoint;

				fn.afterScroll = fn.afterScroll || function() {};
				fn.beforeScroll = fn.beforeScroll || function() {};

				if ($.isFunction(point)) {
					getPoint = point;
				} else {
					getPoint = function() {
						return point;
					};
				}
				var handler = function() {
					scrollStateBefore = scrollTop > getPoint();
					if (scrollStateBefore !== scrollStateAfter) {
						if (scrollStateBefore) {
							fn.afterScroll();
						} else {
							fn.beforeScroll();
						}
						scrollStateAfter = scrollStateBefore;
					}
				}

				handlers.push(handler);
			}
		};
	win.on('scroll resize orientationchange', scrollHandler);
	
	return publicAPI;
}(jQuery));