/**
 * Created by Administrator on 15-3-1.
 */
$(function(){
    //高度
    var win_h = $(window).height();
    $("#content").height(win_h);
    if($(window).width() >= 768){
        $(".menu_nav").height(win_h);
    }
    $("#main_content").height(win_h - 46 - 12 -45);
   // $(".wedding_list").height(win_h - 46 -45);
    //移上去产品标题消失
    $(".wedding_list li").hover(function(){
        $(this).find(".pro_name").animate({
            opacity:0
        },500)
    },function(){
        $(this).find(".pro_name").animate({
            opacity:1
        },500);
    })
    //点击显示弹出框
    $(".wedding_box li").click(function(){
        if($(window).width() >= 768){
            $(".pop_up_box").show();
            console.log("222");
        }else{
            window.location.href = "wedding_info.html";
            console.log("3333");
        }
    })


    //关闭弹出框
    $(".img_close").click(function(){
        $(".pop_up_box").hide();
    })
    //婚纱摄影弹出弹出框的位置
     var pup_left = ($(window).width()-$(".pop_up_box").width())/2;
     var pup_top = ($(window).height()-$(".pop_up_box").height())/2;
    $(".pop_up_box").css({"top":pup_top,"left":pup_left});
    $(window).resize(function(){
        var pup_left = ($(window).width()-$(".pop_up_box").width())/2;
        var pup_top = ($(window).height()-$(".pop_up_box").height())/2;
        $(".pop_up_box").css({"top":pup_top,"left":pup_left});
    })

    //设置taking li的宽度
    //$(".taking_list li").width($(".main_content").width()/4-24);
    //设置taking的弹出框
    $(".taking_list li").click(function(){
        if($(window).width() >= 768){
            $(".taking_up").show();
            $(".taking_up_box").show();
        }else{
            window.location.href = "taking_photos_info.html"
        }
    })
    var taking_left = ($(window).width()-$(".taking_up_box").width())/2;
    var taking_top = ($(window).height()-$(".taking_up_box").height())/2;
    $(".taking_up_box").css({"top":taking_top,"left":taking_left});
    $(window).resize(function(){
        var taking_left = ($(window).width()-$(".taking_up_box").width())/2;
        var taking_top = ($(window).height()-$(".taking_up_box").height())/2;
        $(".taking_up_box").css({"top":taking_top,"left":taking_left});
    })

    $(".taking_close").click(function(){
        $(".taking_up").hide();
        $(".taking_up_box").hide();
    })

    //导航效果
    $(".navbar-nav .nav_li").hover(function(){
        $(this).find('span').show().css('display',"inline-block");
        $(this).find('span b').show("slide");
    },function(){
        $(this).find('span').hide();
        $(this).find('span b').hide("slide");
    })
    $(".navbar-toggle").click(function(){
        if($(this).attr("aria-expanded") == "false"){
            $(this).addClass('mytoggle').css('backgroundColor',"transparent")
        }else{
            $(this).removeClass('mytoggle').css('backgroundColor',"transparent").removeAttr('style')
        }
    })
})

