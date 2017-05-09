
var speed=20;
var winWidth=0;
var winHeight=0;
var ax=2;
var rainNum=10;
var wind=0;
 $(function() {
		nyanuri =document.location.href.split("?")[1];
		if(nyanuri.indexOf("http://")<0){
			nyanuri="http://"+nyanuri;
		}
		$("#txtUrl").val(nyanuri);
		$("#myframe").attr("src",nyanuri);
        $('#myframe').height($(window).height()).width($(window).width());
        $(window).resize(function () {$('#myframe').height($(window).height()).width($(window).width());
		winWidth=parseInt($(window).width());
		winHeight=parseInt($(window).height());});
		winWidth=parseInt($(window).width());
		winHeight=parseInt($(window).height());
        setInterval(rain,500);
		setInterval(run,80);
		$("#goUrl").click(function(){
			location.href="http://www.lovewebgames.com/rain?"+$("#txtUrl").val();
		});
		$("#txtUrl").keydown(function(event){
			//alert(event.keyCode);
			if(event.keyCode==13){
				$("#goUrl").click();
			}
		});
		$("#bigRain").click(function(){
			rainNum*=1.2;
		});
		$("#smallRain").click(function(){
			rainNum*=0.8;
		});
		$("#eastWind").click(function(){
			wind+=2;
		});
		$("#westWind").click(function(){
			wind-=2;
		});
      }); 
	function rain(){
		var rnd=Math.floor(Math.random() * rainNum);
		for(var i=0;i<rnd;i++){
			addChild();
		}
	}
	function addChild(){
		var rnd=Math.random()*10+5;
		var obj=$("<img src='rain.png' class='ps' width='10px' vy='"+rnd+"' vx='0'>").appendTo("body").get(0);
		obj.style.left=Math.floor(Math.random()*winWidth)+"px";
		obj.style.top="0px";
	}
	function run(){
		$(".ps").each(function(){
			var ofs=$(this).offset();
			var x=parseInt(ofs.left);
			var y =parseInt(ofs.top);
			var vy=parseInt($(this).attr("vy"))+ax;
			var vx=parseInt($(this).attr("vx"))+wind;
			$(this).attr("vy",vy);
			$(this).attr("vx",vx);
			y+=vy;
			x+=vx;
			$(this).offset({"top":y});
			$(this).offset({"left":x});
			if(y>winHeight){
				$(this).remove();
			}
		});
	}