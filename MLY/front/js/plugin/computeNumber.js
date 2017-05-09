/**
*文本计数插件
*author 田想兵
*55342775@qq.com
*2013/1/17
*参数说明：
*isByte:是否计算字节数，一个汉字代表两个长度,默认按字节计算
*changeCallBack:改变时触发事件,该方法参数为文本长度
*getFullNumber:返回字节长度
*getNumber:返回文本长度，根据isByte返回
*调用示例:
*
	var obj = $("#txt_count").ComputeNumber({
		changeCallBack:function(num){
			$(".number").html(num);
		},isByte:false
	});
	$("#btn_compute").click(function(){
		$(".number").html(obj.getFullNumber());
	});
**/
//seajs.defined(function(require){
;(function($) {
	var ComputeNumber = function(args){
		this.args = args;
		this.textBox = $(args.textBox);
		this.oldNumber = 0;
		this.number =0 ;
		this.timer = null;
		this.changeCallBack = args.changeCallBack||null;
		this.maxLenth = 0;
		this.overflowCallBack = args.overflowCallBack || null;
		this.isOverflowCut = args.isOverflowCut || true;
	};
	ComputeNumber.prototype={
		init:function(){
			var _self = this;
			_self.maxLenth = parseInt( _self.textBox.attr("maxLength") ) || 0;
			_self.textBox.bind('focus',function(){
				_self.start();
			}).bind("blur",function(e){
				clearInterval(_self.timer);
			});
		},
		start:function(){
			var _self = this;
			_self.timer =  setInterval(function(){
				_self.getNumber();
				if ( _self.number !== _self.oldNumber && _self.changeCallBack){
					if( _self.maxLenth && _self.number > _self.maxLenth){
						if (_self.overflowCallBack ){
							_self.overflowCallBack(_self, _self.number, _self.textBox, _self.maxLenth);
						}else if( _self.isOverflowCut ){
							_self.textBox.val( _self.textBox.val().slice(0, _self.maxLenth) );
							_self.getNumber();
						}
					}
					_self.changeCallBack.call(_self, _self.number);
				}
				_self.oldNumber = _self.number;
			},100);
		},
		getNumber:function(){
			if (this.args.isByte){
				this.number = this.getFullNumber();
			}else{
				this.number = this.textBox.val().length;
			}
			return this.number;
		},
		getFullNumber:function(){
			this.number = this.textBox.val().replace(/[^\x00-\xff]/g,"**").length;
			return this.number;
		}
	};
	$.fn.ComputeNumber = function(options){
		options=$.extend({isByte:true},options);
		var returnArr = [];
		$(this).each(function(){
			options.textBox=$(this);
			var obj = new ComputeNumber(options);
			obj.init();
			returnArr.push(obj);
		});
		if (returnArr.length==1){
			return returnArr[0];
		}else{
			return returnArr;
		}
	};
  })(jQuery);

//});