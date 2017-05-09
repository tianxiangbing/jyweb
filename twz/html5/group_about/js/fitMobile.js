/**
 * Created with JetBrains PhpStorm.
 * User: twz2013
 * Date: 13-9-16
 * Time: 涓嬪崍9:16
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var $viewport = $('#viewport'),
    content = $viewport.attr('Content') || '',
    scale = 0.5,
    // Android 显示问题：
    // 2.2 - 2.3 screen.availWidth
    // > 2.3 window.outerWidth
    outerWidth = screen.availWidth > window.outerWidth ? screen.availWidth : window.outerWidth;
    if (/Android/.test(navigator.userAgent)) {
        // 为处理第二次进入页面时取不到outerWidth
        if (outerWidth) {
            // localStorage['outerWidth'] = outerWidth;
        } else {
            // outerWidth = localStorage['outerWidth'] || 0;
        }
        scale = new Number(outerWidth / 640).toFixed(3);
        content += ', target-densitydpi=device-dpi';
        content += ', initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale;
    } else {
        // scale = new Number(outerWidth/640).toFixed(3);
        content += ', user-scalable=no, initial-scale=' + scale;
    }
    $viewport.attr('Content', content);
})();