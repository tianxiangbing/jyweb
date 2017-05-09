(function($){
	function CLS_MSG(){
		
	}
	CLS_TIP.prototype={
		init:function(args){
			this.obj = args.obj;
			this.msg = args.msg;
			this.checkPosition();
		},
		checkPosition:function(bool){
			if (this.obj.parent().hasClass('msg') || bool){			
				var sp_msg = $('<span class="msg_content">'+this.msg+'</span>');

			}else{
				this.obj.wrap("<span class='msg'/>");
				this.checkPosition(true);
			}
		}
	};
	$.fn.msg=function(options){
		this.each(function(){
			var obj = new CLS_MSG();
			obj.init( $.extend(options,{obj:this}) );
		});
	}
	function CLS_ERRTIP(){
		
	}
	CLS_ERRTIP.prototype={
		init:function(args){
			this.obj = args.obj;
			this.msg = args.msg;
			this.type = args.type;//1.正确，0.错误
			this.style = args.style;
			this.checkPosition();
		},
		checkPosition:function(){
			if (this.obj.find(".errTip").size()>0){
				if (this.type===1){
					this.obj.find(".errTip").addClass("ok");
				}else if (this.type == 0){
					this.obj.find(".errTip").addClass("wrong").html("<i></i><s></s>"+ this.msg);
				}else{
					this.obj.find(".errTip").addClass("ts").html("<i></i><s></s>"+ this.msg);
				}
			}else{
				var obj = '<div class="errTip"></div>';
				obj.css(this.style);
				this.obj.append(obj);
			}
		}
	};
})(jQuery);