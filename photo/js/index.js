/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2014-10-08
 * Time: 16:36:57
 * Contact: 55342775@qq.com
 */
$(function(){
	var tempHtml = $('#entry-template').html();
	var curPage=1,isload =false;
	function getData(){
		if(curPage>=8){
			$('.prevmore').hide();
			return false;
		}
		isload =true;
		$('.prevmore').show();
		var url  = $('.waterfall').attr('ajaxurl');
		$.get(url,{t:new Date(),page:curPage},function(result){
			if(!result.hasError){
				data = result.content.data;
				for (var i =0,l= data.length;i<l; i++) {
					var item = data[i];
					// var j =i+1;
					// var index = j%4;
					// console.log(index)
					var template = Handlebars.compile(tempHtml);
					var html = template (item)
					setTimeout(function(){
						var cols = getMinCols().find('.content').append(html);
					},300);
				};
			}
		},'json').done(function(){isload=false;});
	};
	$('.waterfall').delegate('.relative',"hover",function(){
		$(this).closest('.item').find('.tips').toggle();
	});
	function getMinCols(){
		var mincols=$('.waterfall .cols').first();
		$('.waterfall .cols').each(function(){
			if(mincols.height() > $(this).height()){
				mincols=$(this);
			}
		});
		return mincols;
	};
	getData();
	function dongtaiMore() {
            if ( $(document).scrollTop()+ $(window).height()> $('.prevmore').offset().top) {
				if(isload)return;
				curPage++;
                	getData();
            }
    }
    $(document).scroll(dongtaiMore);
    $('.xqsort a').click(function(){
    		// console.log($(this).attr("href"))
    		$('.waterfall').attr('ajaxurl',$(this).attr("href"));
    		$('.waterfall .cols .content').html('');
    		curPage=1;
		getData();
    		return false;
    });
    $('#login').click(function(){
    		$( ".divlogin" ).dialog({
			autoOpen: false,
			width: 400, modal: true,
			title:"登录",
			buttons: [
				{
					text: "确定",
					click: function() {
						$( this ).dialog( "close" );
					}
				},
				{
					text: "取消",
					click: function() {
						$( this ).dialog( "close" );
					}
				}
			]
		});
    		$( ".divlogin" ).dialog( "open" );
    		return false;
    });
    $('#regist').click(function(){
    		$( ".divregist" ).dialog({
			autoOpen: false,
			width: 400, modal: true,
			title:"注册",
			buttons: [
				{
					text: "确定",
					click: function() {
						$( this ).dialog( "close" );
					}
				},
				{
					text: "取消",
					click: function() {
						$( this ).dialog( "close" );
					}
				}
			]
		});
    		$( ".divregist" ).dialog( "open" );
    		return false;
    });
});

// JavaScript Document
/****************************************************
*  时间：2014-10-8
//首页切换图片JS
*****************************************************/
$(function(){
	  function click1(){
		  var index=$(this).index();
		  $(".focus_tab > div.on").removeClass("on");
		  $(".focus_tab >div:eq("+index+")").addClass("on");
		  $(this).siblings().removeClass("on");
		  $(this).addClass("on");
		  } 
	//设置定时器
	 var mytime;
	 function resetTime(){
		 mytime = setInterval(play,2000);
		 }
		 resetTime();
	//取消定时器
	 function clearTime(){
		 clearInterval(mytime);
		 }
	 var curIndex=0;//当前索引
	 imgcount = $(".sidePic li").length;//图片总数
	 function play(){
		 curIndex++;
		 if(curIndex>=imgcount){
			 curIndex=0;
			}
		 $(".sidePic li:eq("+curIndex+")").click();
		 }
	  $(".sidePic li").bind('click',click1).bind('mouseover',click1).bind('mouseover',clearTime).bind('mouseout',resetTime);
});