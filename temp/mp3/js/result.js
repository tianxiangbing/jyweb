/*
 * 皮肤问答测试
 * by 田想兵 55342775@qq.com
 * 2015.6.23
 * by Sublime Text
 */
$(function() {
	if (localStorage["result"]) {
		var result = JSON.parse(localStorage.result);
		if (result.q11 == 0) {
			$('.result #result').attr('src', 'imgs/8-1.jpg');
			$('.result').find('.link1,.link2').show();
		}
		if (result.q11 == 1) {
			$('.result #result').attr('src', 'imgs/8-2.jpg');
			$('.result').find('.link3').show();
		}
		if (result.q11 == 2) {
			$('.result #result').attr('src', 'imgs/8-3.jpg');
			$('.result').find('.link1,.link4').show();
		}
		if (result.q2 == 0) {
			$('.result .b img').attr('src', 'imgs/q1.jpg')
		}
		if (result.q2 == 1) {
			$('.result .b img').attr('src', 'imgs/q2.jpg')
		}
		if (result.q2 == 2) {
			$('.result .b img').attr('src', 'imgs/q3.jpg')
		}
		if (result.q8 == 0) {
			$('.result .a img').attr('src', 'imgs/a1.jpg')
		}
		if (result.q8 == 1) {
			$('.result .a img').attr('src', 'imgs/a2.jpg')
		}
		if (result.q8 == 2) {
			$('.result .a img').attr('src', 'imgs/a3.jpg')
		}
	}
});