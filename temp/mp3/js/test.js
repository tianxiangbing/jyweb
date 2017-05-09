/*
 * 皮肤问答测试
 * by 田想兵 55342775@qq.com
 * 2015.6.19
 * by Sublime Text
 */
;
$(function() {
	var quest = {};
	$('#start').tap(function() {
		go(this, 2)
	});

	function go(current, step) {
		$(current).hide();
		$('[data-step="' + step + '"]').show();
	}
	$('.prev,.back').tap(function() {
		var current = $(this).closest('.step');
		var index = current.data('step');
		go(current, index - 1);
		return false;
	});
	$('.next').tap(function() {
		var current = $(this).closest('.step');
		var index = current.data('step');
		if (current.find('.select .selected').length < 2) {
			$.alert('请选择答题!');
			return false;
		}
		go(current, index + 1);
		return false;
	});
	$('.select li').tap(function() {
		var current = $(this).closest('ul');
		var index = current.data('quest');
		$(this).addClass('selected').siblings().removeClass('selected');
		quest["q" + index] = $(this).index();
	});
	$('.submit').tap(function() {
		var current = $(this).closest('.step');
		var index = current.data('step');
		if (current.find('.select .selected').length < 2) {
			$.alert('请选择答题!');
			return false;
		}
		localStorage['result'] = JSON.stringify(quest);
		location.href = "result.html";
		return false;
	});
});