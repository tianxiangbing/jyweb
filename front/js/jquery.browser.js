/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-10-22
 * Time: 13:55:06
 * Contact: 55342775@qq.com
 */
define(function(require, exports, module) {
	var jQuery  = require('$');
	var userAgent = navigator.userAgent.toLowerCase();
	// Figure out what browser is being used 
	jQuery.browser = {
		version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
		safari: /webkit/.test(userAgent),
		opera: /opera/.test(userAgent),
		msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
		mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
	};
	return jQuery.browser;
})