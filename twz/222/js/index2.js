/**
 * Created by ms on 2015/2/2.
 * ms
 * 2015
 */
$(function(){
    //计算中间布局的高度
    /* 进入到欢迎页 */
    var welcometop= $(".welcome-top");   //top
    var welcomecenter=  $(".welcome-center");  //中间
    var welcomebottom=  $(".welcome-bottom");  //bottom
    var alertinfo=$(".alertinfo");  //提示信息
    var win=window.innerHeight;
    var toph=welcometop.innerHeight();
    var both=welcomebottom.innerHeight();
    var layoutcontent=$(".layout-content");
    var welpic=$(".wel-pic");
    var welcome=$(".welcome");
    var Mask=$(".Mask");   //蒙板
    //欢迎页的效果
    function documentready(){
        welcome.animate({
            top:0+"%"
        },1000,function(){
            welpic.show().addClass("rotateInUpLeft animated");
            alertinfo.show().addClass("swing animated") ;
        });
        welcomecenter.animate({
            height:"423px"
        },1000);

        //欢迎页的事件
        var notshow=$(".notshow");
        notshow.click(function(){
            $(".alertinfo").hide();
            $(".notice").addClass("bounceInRight animated");
        });
    }

    //左边栏目进行hover的特效
    function indexanima(){
        if(screen.width<1279)return;
        var mousemoveul=$(".layout-menu");
        var limove=mousemoveul.find("ul").find("li");
        limove.hover(function(){
            $(".layout-menu").find("ul").find("li").removeClass("li-hover").find(".menu-titletip").removeClass("wobble animated menu-fon");
            $(this).addClass("li-hover").find(".menu-titletip").addClass("wobble animated");


        });
    }

    //Taking Photos  页面效果------------------------------------------
    //选中某个对象进行查看时弹出查看视图
    function TakingPhotos(){
        if(screen.width<1279)return;
        var n=0;
        var boxview=$(".boxview");
        var listview=$(".listview");
        var listviewarray=$(".listview li");
        var  TakinCon=$(".TakinCon");   //进行大视图浏览的内容
        var content=$(".content").html();  //得到视图中的所有div元素
        var close=$(".close");
        var topMenus = getClass('div','content');
        //交换元素位置
        var exchange = function(a,b){
            var n = a.next(), p = b.prev();
            b.insertBefore(n);
            a.insertAfter(p);
        };
        listviewarray.click(function(){   //将内容全部添加到视图
            boxview.removeClass("zoomOut animated");
            var _index=$(this).index();
            //for(var i=0;i < topMenus.length; i++){
            //    TakinCon.append('<div class="content-view">'+topMenus[i].innerHTML+'<h3 class="content-view-lable">标题</h3>'+'</div>');
            //}
            // TakinCon.find(".view-cheking").show().siblings().hide();
            Mask.show();
            TakinCon.show();
            boxview.addClass("zoomIn animated").show();

        });

        close.click(function(){
            $(this).parent().removeClass("zoomIn animated").addClass("zoomOut animated").hide();
            Mask.hide();
        });
        var TakinLeft=$(".TakinLeft");
        var TakinRight=$(".TakinRight");  //左边按钮
        var viewlen=$(".view-cheking").length;
        var content=$(".TakinCon .view-cheking");
        TakinLeft.click(function(){
            n = n >=(viewlen-1)?0: --n;
            if(n==-viewlen)n=0;
            content.eq(n).show().siblings().hide();
        });
        TakinRight.click(function(){
            n = n >=(viewlen-1)?0: ++n;
            content.eq(n).show().siblings().hide();
        });
    }
    //获得标签名为tagName,类名className的元素
    function getClass(tagName,className){
        //支持这个函数
        if(document.getElementsByClassName)  {
            return document.getElementsByClassName(className);
        }
        else {
            var tags=document.getElementsByTagName(tagName);//获取标签
            var tagArr=[];//用于返回类名为className的元素
            for(var i=0;i < tags.length; i++) {
                if(tags[i].class == className) {
                    tagArr[tagArr.length] = tags[i];//保存满足条件的元素
                }
            }
            return tagArr;
        }
    }
    //Wedding Photography 页面效果------------------------------动态
    function WeddingPhotography(){
        var top=$(".weddingview-top");  //向上翻滚按钮
        var bottom=$(".weddingview-bot"); //向下翻滚按钮
        var contentbody=$(".wedding-body");   //页面浏览视图 页面中的图片元素
        var weddingview=$(".wedding-view");  //得到进行视图浏览的容器

        var topMenuswdding = getClass('div','wedding-content'); //得到视图中的所有元素  这里应该是获取当前点击到的元素里面的图片元素数据
        var ViewContent=$(".weddingview");  //大师图浏览的大容器弹出层
        var viewbody=$(".view-body");  //进行视图显示的左边容器


        contentbody.find("li").click(function(){
            var _indexobj=$(this).index();
            // weddingview.find("div").eq(_indexobj).show().siblings().hide();
            //右边的列表 通过每次重新获取点击到的元素里面的数组
            //当前是将页面中所有的图片加到大视图浏览里面
            for(var i=0;i<topMenuswdding.length;i++){
                weddingview.append('<div class="sub-pic list-page">'+topMenuswdding[i].innerHTML+'</div>');
                weddingview.find("span").remove();
            }
            ViewContent.addClass("zoomIn animated").show();
            //大视图浏览里面的内容 左边加右边列表
            //左边的单个图片
            viewbody.html( '<img src='+$(this).find("img").attr("src")+'>');
            viewbody.find("img").css({width:"98%",height:"98%",padding:"5px"})
            //点击某个图片视图区域就显示某个图片
            $(".list-page").click(function(){
                $(".list-page").removeClass("list-page-active");
                $(this).addClass("list-page-active");
                var $index=$(this).index();
                viewbody.empty();
                $(this).find("img").clone().prependTo(viewbody).animate({height:'210px',width:'180px'},"slow").addClass("weddingview-body");
                viewbody.attr('href',$(this).attr('link'));
            });
            var page = 1; //当前第几页
            var n = 5; //图片个数
            //   var $content = weddingview;//寻找到内容展示区
            var $content_w = $(".list-page").height();//内容展示区外围div高度
            var $len =$(".list-page").length;//拿到list的个数
            var page_count = Math.ceil($len);  //只要不是整数，就往大的方向取最小的整数
            top.click(function(){
                if( !weddingview.is(":animated")){
                    if( page == page_count ){
                        weddingview.animate({top:'0px'},"slow");
                        page=1;
                    }else{
                        weddingview.animate({top:'-='+$content_w},"normal");//改变top值，每次换一个版
                        page++;
                    }
                }
            });
            bottom.click(function(){
                if( !weddingview.is(":animated") ){    //判断"视频内容展示区域"是否正在处于动画
                    if( page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
                        weddingview.animate({ top : '-='+$content_w*(page_count-1) }, "slow");
                        page = page_count;
                    }else{
                        weddingview.animate({ top : '+='+$content_w }, "slow");//改变top值，每次换一个版
                        page--;
                    }
                }
            });
        });


    }
    function Weddingnew(){
        if(screen.width<1279)return;
        var weddingview=$(".wedding-view");
        var weddingcontent=$(".weddingview");
        var top=$(".weddingview-top");  //向上翻滚按钮
        var bottom=$(".weddingview-bot"); //向下翻滚按钮
        var contentbody=$(".wedding-body");   //页面浏览视图 页面中的图片元素
        var page = 1; //当前第几页
        var n = 5; //图片个数
        //   var $content = weddingview;//寻找到内容展示区
        var $content_w = $(".sub-pic").height();//内容展示区外围div高度
        var $len =$(".sub-pic").length;//拿到list的个数
        var page_count = Math.ceil($len);  //只要不是整数，就往大的方向取最小的整数

        contentbody.click(function(){
            Mask.show();
            weddingcontent.removeClass("zoomOut animated").addClass("zoomIn animated").show();
        });
        $(".sub-pic").hover(function(){
            $(".sub-pic").removeClass("list-page-active");
            $(this).addClass("list-page-active");
        });
        $(".sub-pic").click(function(){
            var $index=$(this).index();
            var viewbody=$(".view-body");
            $(".sub-pic").removeClass("list-page-active");
            $(this).addClass("list-page-active");
            viewbody.empty();
            $(this).find("img").clone().prependTo(viewbody).show();
            viewbody.attr('href',$(this).attr('link'));
        });
        top.click(function(){
            if( !weddingview.is(":animated")){
                if( page == page_count ){
                    weddingview.animate({top:'0px'},"slow");
                    page=1;
                }else{
                    weddingview.animate({top:'-='+$content_w},"normal");//改变top值，每次换一个版
                    page++;
                }
            }
        });
        bottom.click(function(){
            if( !weddingview.is(":animated") ){    //判断"视频内容展示区域"是否正在处于动画
                if( page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
                    weddingview.animate({ top : '-='+$content_w*(page_count-1) }, "slow");
                    page = page_count;
                }else{
                    weddingview.animate({ top : '+='+$content_w }, "slow");//改变top值，每次换一个版
                    page--;
                }
            }
        });
        //进行视图移上的效果
        contentbody.find("li").hover(function(){
            contentbody.find("li").find(".main-pic-title").stop().animate({
                opacity:1
            },500);
            $(this).find(".main-pic-title").stop().animate({
                opacity:0
            },500);
        },function(){
            contentbody.find("li").find(".main-pic-title").stop().animate({
                opacity:1
            },500);
        });
    }

    //如果是进行phone 或者pad进行浏览网页，
    function mediaauto(){
        var mediaviewinfo=$(".media-viewinfo");
        var contentbody=$(".wedding-body");
        var listviewarray=$(".listview li");
        var closemediainfo=$(".close-mediainfo");

        if(screen.width<1280){
            contentbody.click(function(){
                mediaviewinfo.show();
            });
            listviewarray.click(function(){
                mediaviewinfo.show();
            });
            closemediainfo.click(function(){
                mediaviewinfo.hide();
            })
        }
    }


    $(document).ready(function(){
        layoutcontent.css({ height:win });
        $(".layout-menu").height(win-130-44);
        $(".layout-center").css({ height:$(".layout-content").innerHeight()-(toph+both)-100+"px" });
        welcomecenter.css({height:0+"px"});
        //点击列表显示导航
        var btnview=$(".btn-view");

        btnview.click(function(){
            $(".left-menu").show();
            $(".logo-close").show();
        });
        $(".logo-close").click(function(){
            $(".left-menu").hide();
        });
        //文本框点击
        $(".search").click(function(){
            $(this).val("");
        });
        documentready();
        indexanima();
        TakingPhotos();
        //  WeddingPhotography();
        Weddingnew();
        viewLayout();
        mediaauto();
    });


// Detect whether device supports orientationchange event, otherwise fall back to
// the resize event.
    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

// 监听事件
    window.addEventListener(orientationEvent, function() {
        var ua = navigator.userAgent;
        var deviceType="";
        //判断设备类型
        if (ua.indexOf("iPad") > 0) {
            deviceType = "isIpad";
        } else if (ua.indexOf("Android") > 0) {
            deviceType = "isAndroid";
        } else {
            //alert("既不是ipad，也不是安卓！");
            return;
        }
        // 判断横竖屏
        if ("isIpad" == deviceType) {
            if (Math.abs(window.orientation) == 90){
                //alert("我是ipad的横屏");
                location.href=location.href;
            } else {
                //alert("我是ipad的竖屏");
                location.href=location.href;

            }
        } else if ("isAndroid" == deviceType ) {
            if (Math.abs(window.orientation) != 90) {
                //alert("我是安卓的横屏");
                location.href=location.href;
            } else {
                //alert("我是安卓的竖屏");
                location.href=location.href;

            }
        }
    }, false);

    //window.onload=function(){
    //    if (location.href.indexOf("?xyz=")<0)
    //    {
    //        location.href=location.href+"?xyz="+Math.random();
    //    }
    //}

});