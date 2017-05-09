
 $(function() {
	var speed=3;
	var winWidth=0;
	var winHeight=0;
	var ay = 1.01;
	var ax = 0.9;
	var vy = 3;
	var snowNum=3;
	var wind=0;
	 var snowType ="snow"+ Math.floor(Math.random()*4)+".png";
	 var arr = [];
	if (location.host !=="www.lovewebgames.com"&&location.host !=="localhost:8080"){
		location.href="http://www.lovewebgames.com"
	}
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
	setInterval(run,50);
	function addChild(){
		var r = Math.random();
		var rnd=r+3;
		var obj=$("<img src='"+snowType+"' class='ps' vy='"+rnd+"' vx='2'>").appendTo("body").get(0);
		$(obj).width(r*30+10);
		obj.style.left=Math.floor(r*winWidth)+"px";
		obj.style.top="0px";
		arr.push(obj);
	}
	$("#snowBt").click(function(){
		$(this).height(1);$("#snowBt .whiteBg").height(1);
	});
	$(".tree").click(function(){
		$(this).width(1);
	});
	function run(){
		var r = Math.random()*1000;
		if (r<120){
			addChild();
		}
		if (r<30){
			wind = Math.random()>0.5 ?2:-2;
		}
		if (r<10){
			var temp = [];
			for (var i=0,l=arr.length; i<l ;i++ ){
				if (arr[i]){
					temp.push(arr[i]);
				}
			}
			arr = temp;
			var h=$("#snowBt").height()+1;
			$("#snowBt").height(h);
			$("#snowBt .whiteBg").height(h);
			var w =Math.min(400,$(".tree").width()+1);
			$(".tree").width(w);
		}
		$.each(arr,function(i){
			if (arr[i]){
				var ofs=$(this).offset();
				var x=parseInt(ofs.left);
				var y =parseInt(ofs.top);
				var vy=parseInt($(this).attr("vy"));
				var vx=parseInt($(this).attr("vx"));
				vx*=wind;
				x +=vx;
				vy *= ay;
				y+= vy;
				$(this).offset({"top":y});
				$(this).offset({"left":x});
				if(y>winHeight){
					$(this).remove();
					delete arr[i];
				}				
			}
		});
	}
  }); 