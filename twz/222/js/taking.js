/**
 * Created by Administrator on 15-3-6.
 */
$(function(){
    var  box_width;
    var margin ;
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;


    function imgLocation(){
        //以下进行测试
        if(Sys.ie){   //IE
            margin=4;
            box_width=$(".taking_list").innerWidth();
        }
        else if(Sys.firefox){   //火狐
            margin=5;
            box_width=$(".taking_list").innerWidth();
        }
        else if(Sys.chrome){    //谷歌
            margin= 4;
            box_width=$(".taking_list").innerWidth();
        }
        else{
            box_width=$(".taking_list").innerWidth();
            margin=7;
        }
//if(Sys.opera) document.write('Opera: '+Sys.opera);
        if(Sys.safari){
            margin=5;
            box_width=$(".taking_list").width();
        };
        var li = $(".taking_list li");
        var li_width = $(".taking_list li:eq(0)").width();
        var arr = []; //记录区域高度的数组
        var num = box_width / li_width | 0; //一行可以放几个li
       // var num_hei = Math.floor(li.length / num);

        for(var i = 0,len = li.length; i<len; i++){
            var li_hei = $(".taking_list li").eq(i).outerHeight() + 13;
            if(i < num){
                arr[i] = li_hei;//把每个li放进数组
                li.eq(i).css({"top":0,"left":i * li_width});//第一行li的top值为0,左坐标是i*li_width;
            }else{
                console.log(arr,"arr")
                min_hei = Math.min.apply(null,arr);//取得数组中的最小值，区块中高度值最小的那个
                minKey = getArraykey(arr,min_hei);//最小的值对应的指针
                arr[minKey] += li_hei;//加上新高度后更新高度值
                li.eq(i).css({"top":min_hei,"left":minKey * li_width});
            }
            $(".taking_list").height(Math.max.apply(null,arr));
        }
    }

    /* 使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个) */
    function getArraykey(s, v) {for(k in s) {if(s[k] == v) {return k;}}}

    window.onload = function(){
        if($(window).width()>=768){
            imgLocation();
        }
    }
    $(window).resize(function(){
        if($(window).width()>=768){
            imgLocation();
        }
    })
})