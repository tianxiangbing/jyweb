$(function(){
	 var index = 0;
	 $("#btn li").mouseover(function(){
		index  =  $("#btn li").index(this);
		showImg(index);
	});	 
	 //滑入 停止动画，滑出开始动画.
	 $('#imgnav').hover(function(){
			  if(MyTime){
				 clearInterval(MyTime);
			  }
	 },function(){
			  MyTime = setInterval(function(){
			    showImg(index)
				index++;
				if(index==5){index=0;}
			  } , 3000);
	 });	 
	 //自动开始
	 var MyTime = setInterval(function(){
		showImg(index)
		index++;
		if(index==5){index=0;}
	 },3000);
})
function showImg(i){
   $("#img img").eq(i).stop(true,true).fadeIn(800).parent().siblings().find("img").hide();
   $("#btn li").eq(i).addClass("curr").siblings().removeClass("curr");
   //$("#btn").find("p a").html($("#img img").eq(i).parent().find("img").attr("alt"));
   //$("#btn").find("p a").attr("href",$("#img img").eq(i).parent("a").attr("href"));
}