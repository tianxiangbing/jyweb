// JavaScript Document
$(function(){
 var n = 0 ;
  var scroller = $("#scroller-banner");
  var table = scroller .find("table");
  var timer = null;
  var num =$(".banner img").length-1;
  function scroll (){
    var td = scroller.find("td").first().width();
    table.css('position',"relative")
    table.animate({
      left:-td*n
    });
    $('.process',scroller).find('.ico').eq(n).addClass('current').siblings().removeClass('current');
  };
   $('.process',scroller).find('.ico').click(function(){
    n=$(this).index();
    scroll();
   });
  table.hover(function(){
    timer&&clearInterval(timer);
  },function(){
    start();
  })
  scroller.find('.iconLeft').click(function(){
    n--;
    if(n<0)n=num;
    scroll(n);
  });
  function start(){
  timer= setInterval(function(){
    n++ ;
    if(n>num)n=0;
    scroll(n);
  },3000);
  };
  start();
  scroller.find('.iconRight').click(function(){
    n++;
    if(n>num)n=0;
    scroll(n);
  });
	
	if($(window).width()>750){
	var advantage_width =$(".pro-list li",".pro-box ").last().width()+15;
  	$(".pro-list li",".pro-box ").width($(".pro-list-box").width()/4-10);
	$(".pro-list",".pro-box ").width( $(".pro-list li").size()* advantage_width);
	console.log($(".pro-list li img:eq(0)").height())
	$(".pro-next",".pro-box ").height(advantage_width/2+10);
	$(".pro-prve",".pro-box ").height(advantage_width/2+10);
	$(".pro-prve",".pro-box ").click(function(){
		var advantage_width =$(".pro-list li").last().width();
		if($(".pro-list").position().left==28){
			$(".pro-list").prepend($(".pro-list li").last());
			$(".pro-list").css('left',-advantage_width);
			$(".pro-list").animate({"left":0});
		}else{
			$(".pro-list").animate({"left":"+=" + advantage_width + "px"},"fast");
		}
 	});

 $(".pro-next",".pro-box ").click(function(){
		var advantage_width = $(".pro-list li").last().width();
 		//$(".pro-list").css('left',-advantage_width);
 		$(".pro-list").animate({"left":-advantage_width},function(){
 			$(".pro-list").append($(".pro-list li").first());
 			$(".pro-list").css('left',0);
 		});
 });
	}

	var ishover = true,timer;
	//login
	$(".top-login").hover(function(){
		ishover =true;
		timer&& clearTimeout(timer)
		$(this).addClass("click-login");
		
		$(".login-box").show();
	},function(){
		hideLogin();
	})
	function hideLogin(){
		ishover = false;
		timer=setTimeout(function(){
			if(!ishover){
			$(".top-login").removeClass("click-login");
			$(".login-box").hide();
			}
		},50)
	}
	$(".login-box").hover(function(){
		ishover = true;
		timer&& clearTimeout(timer)
	},function(){
		ishover = false;
		timer&& clearTimeout(timer)
		setTimeout(function(){
			if(!ishover){
			$(".top-login").removeClass("click-login");
			$(".login-box").hide();
			}
		},50)
		})
	//$(".login-box").click(function(){return false;});
	$(".top-login").click(function(){return false;});
	$(".login,.regist").hover(function(){
		$(this).addClass("active");
	},function(){
		$(this).removeClass("active");
	})
	
	$(document).click(function(){
		hideLogin();
	});
	
	$(".tabMenu span").click(function(){
	    var i = $(this).index();
	    $(this).addClass("active").siblings().removeClass("active");
		$(".tabContent").children().eq(i).show().siblings().hide();
		
	});
	//����ע���
	$(".register-but,.regist").click(function(){
		var left = ($(window).width()-$(".zc-box").outerWidth())/2;
		var top = ($(window).height()-$(".zc-box").outerHeight())/2;
		top = top<0 ?0 : top;
		$(".layer-box").show();	
		$(".zc-box").show();
		$(".zc-box").css({"left":left,"top":top});
	})
	$(".layer-box,.zc-close").click(function(){
		$(".layer-box").hide();	
		$(".zc-box").hide();
	})
});