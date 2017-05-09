	/*
*男生主页地图模式JS
*日期：2013/4/8
*作者：田想兵 55342775@qq.com
*/
$(function(){

	var map = new BMap.Map("mapContainer");
	 map.enableScrollWheelZoom(true);
	 map.addControl(new BMap.NavigationControl());
	var infoBoxArr = [];
	var pointerArr =[];
	var jsonData = $.parseJSON($("#mapDataList").val());
	for (var i=0,l=jsonData.length; i<l ;i++ ){
		var item =jsonData[i];
		pointerArr.push(new BMap.Point(item.x,item.y));
	}
	//[new BMap.Point(120.188482, 30.249866),new BMap.Point(120.194385, 30.246152),new BMap.Point(120.17866, 30.183695)];
	for (var i=0,l=pointerArr.length; i<l;i++ ){
		var point = pointerArr[i];		
		var myIcon = new BMap.Icon($('#icon_url').val(),new BMap.Size(36, 43), {
			 anchor: new BMap.Size(20, 43), 
			 imageOffset: new BMap.Size(-10, -57)
		 } );
		var item =jsonData[i];
		//myIcon.setImageOffset(new BMap.Size(-10 - (item.type-1)*30, -57));//根据类型
		var marker = new BMap.Marker(point, {icon:myIcon});        // 创建标注  
		map.addOverlay(marker);     
		var img = item.img;// "../uploads/Koala.jpg";
		var title = item.title;//"香格拉大饭店";
		var desc= item.desc;//"这是一家神奇的饭店，特色菜是酸辣土豆丝";
		var url = item.url;//"boy.html";
		var  money=item.money;
		var infoBox = new BMapLib.InfoBox(map,'<div class="infoBoxContent"><i></i><div class="lt"><img src="'+img+'" width="60px" height="60px"/><span class="tipbg"><s></s><span>人均'+money+'￥</span></span></div><div class="rt"><h3><a href="'+url+'">'+title+'</a></h3><p>'+desc+'</p></div></div>',{
			boxStyle:{
				width: "260px"
				,height: "80px"
			}
			,hasCloseIcon:false
			,offset:new BMap.Size(10,50)
			,enableAutoPan: true
			,align: INFOBOX_AT_TOP
		});
		infoBoxArr.push(infoBox);
		(function(i,infoBox,url){
			marker.addEventListener('mousedown',function(o){			
				//var mb=new mapBox();
				//mb.open();
				clearInfoBox();
				infoBox.open(o.target);
				$(".infoBoxContent").one('mousedown',function(){
					location.href = url;
					return false;
				});
				return true;
			});
		})(i,infoBox,url);
	}
	
	map.addEventListener("mousedown",function(){
		clearInfoBox();
	});
	function clearInfoBox(){
		for (var i =0 ,l = infoBoxArr.length;i<l ;i++ ){
			infoBoxArr[i].close();
		}
	}
	map.setViewport(pointerArr);
	//map.clearOverlays()	
});