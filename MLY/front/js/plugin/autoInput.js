/*
* 自动输入宣言和提问
*2013/5/21 by txb
*
*/
(function($){
	function CLS_AUTOINPUT(){
		this.ajaxUrl = "";
		this.arr =[];
		this.button = null;
		this.tipMsg = null;
		this.input = null;
		this.type = 0; // 0.问答助手,1.约会宣言助手
		this.counter = 0 ;
	};
	CLS_AUTOINPUT.prototype = {
		init:function(ops){
			$.extend(this,ops);
			var _self= this;
			$.ajax({
				cache:true,
				url:_self.ajaxUrl,
				data:_self.ajaxData||{},
				type:"get",
				dataType:"json",
				success:function(result){
					_self.arr = _self .type  == 0 ? result.questions : result.declarations;
					_self.bindEvent.call(_self);
				}
			});
		},
		bindEvent:function(){
			var _self = this;
			_self.button.bind("click",function(e){
				_self .tipMsg .html( _self.button.attr("clickTipMsg") );
				if (_self.counter >=  _self.arr.length){
					_self.counter =0 ;
				}
				_self.input.val( _self.arr[_self.counter] );
				_self.input.blur().focus();
				_self.counter ++ ;
				return false;
			});
		}
	};
	$.fn.AutoInput = function(ops){
		var obj = new CLS_AUTOINPUT();
		ops = ops||{};
		ops.button = $(this);
		ops.ajaxUrl = $(this).attr("ajaxurl");
		obj.init(ops);
		return this;
	};
})(jQuery);