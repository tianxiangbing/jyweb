var LoveClock={
	init:function(options){
		this.options = options || {};
		this.date = options.date;
		this.rx = options.rx;
		this.ry=options.ry;
		this.radio=options.radio;
	},
	start:function(){
		options = this.options || {};
		this.drawBg();
		this.drawHour();
		this.drawMinutes();
		this.drawSecond();
		this.drawFont();
		this.drawHeat();
		var can = document.getElementById("can_bg");
		if (can.getContext) {
			setInterval(function(){
				LoveClock.init(this.options);
				LoveClock.drawSecond();
			}, 100);
			setInterval(function(){
				LoveClock.init(this.options);
				LoveClock.drawHeat();
			}, 10);
		}
			
	},
	drawBg:function(){			
		var can = document.getElementById("can_bg");
		if (can.getContext) {
			var ctx = can.getContext("2d");
			ctx.strokeStyle = "rgba(30,30,30,.5)";
			ctx.translate(this.rx, this.ry);
			ctx.save();
			ctx.beginPath();
			ctx.arc(0, 0,this.radio, 0, Math.PI * 2, true);
			ctx.restore();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, 2, 0, Math.PI * 2, true);
			ctx.stroke();
			ctx.strokeStyle = "#ccc";
			ctx.save();
			for (var i = 0; i < 12; i++) {
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(0, -this.radio);
				ctx.lineTo(0, -(this.radio - 8));
				ctx.stroke();
				ctx.lineWidth = 1;
				for (var j = 0; j < 4; j++) {
					ctx.rotate(Math.PI / 30);
					ctx.beginPath();
					ctx.moveTo(0, -this.radio);
					ctx.lineTo(0, -(this.radio - 5));
					ctx.stroke();
				}
				ctx.rotate(Math.PI / 30);
			}
		}
	},
	drawHour:function(){		
		var now = this.date;
		var hour = now.getHours();
		var minutes =now.getMinutes();
		var can = document.getElementById("can_hour");
		if (can.getContext) {
			var ctx = can.getContext("2d");
			ctx.clearRect(0, 0, can.width, can.height);
			ctx.save();
			ctx.translate(this.rx, this.ry);
			ctx.strokeStyle = "#ccc";
			ctx.beginPath();
			ctx.rotate(Math.PI / 6 * (hour + minutes/60));
			ctx.lineWidth = 3;
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -35);
			ctx.stroke();
			ctx.restore();
		}
	},
	drawMinutes:function(){			
		var now = this.date;
		var minutes = now.getMinutes();
		var can = document.getElementById("can_min");
		if (can.getContext) {
			var ctx = can.getContext("2d");
			ctx.clearRect(0, 0, can.width, can.height);
			ctx.save();
			ctx.translate(this.rx, this.ry);
			ctx.strokeStyle = "#ccc";
			ctx.beginPath();
			ctx.rotate(Math.PI / 30 * minutes);
			ctx.lineWidth = 2;
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -45);
			ctx.stroke();
			ctx.restore();
		}
	},
	drawSecond:function(){		
		var now = this.date;
		this.date.setTime(this.date.getTime()+100);
		var second = now.getSeconds();
		var millisecond = now.getMilliseconds();
		var minutes =now.getMinutes();
		var can = document.getElementById("can_sec");
		if (can.getContext) {
			var ctx = can.getContext("2d");
			ctx.clearRect(0, 0, can.width, can.height);
			ctx.save();
			ctx.translate(this.rx, this.ry);
			ctx.strokeStyle = "#ccc";
			ctx.beginPath();
			ctx.rotate(Math.PI / 30 * (second + millisecond/1000));
			ctx.lineWidth = 1;
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -50);
			ctx.stroke();
			ctx.restore();
			if (second == 0) {
				this.drawMinutes();
			}
			if (minutes % 6 == 0) {
				this.drawHour();
			}
			this.drawFont();//Êý×ÖÊ±ÖÓ
		}
	},
	drawFont:function(){	
		var can = document.getElementById("can_bg");
		if (can.getContext) {
			var ctx = can.getContext("2d");
			ctx.translate(0, 0);
			ctx.clearRect(20, 60, 200, 200);
			ctx.font = "12px Times New Roman";
			var now = this.date;
			if (ctx.fillText) {
				ctx.save();
				ctx.fillText("Áµ°®Ê±ÖÓlovewebgames", -100, -90);
				ctx.fillText(now.toLocaleTimeString(), 20, 90);
				ctx.restore();
			}else
			if (ctx.mozDrawText) {
				ctx.save();
				ctx.translate(-90, -90);
				ctx.mozTextStyle = "12px Times New Roman";
				ctx.mozDrawText("Áµ°®Ê±ÖÓlovewebgames");
				ctx.restore();
				ctx.save();
				ctx.translate(20, 90);
				ctx.mozDrawText(now.toLocaleTimeString());
				ctx.restore();
			}
		}
	},
	drawHeat:function(){
		var can=document.getElementById("can_heat");
		var now = this.date;
		//this.date.setTime(this.date.getTime()+10);
		var second = now.getSeconds();
		var millisecond = now.getMilliseconds();
		var minutes =now.getMinutes();
		if(can.getContext){
		var f=1;
			if(second%2==0)f=-f;
			var ctx = can.getContext("2d");
			ctx.clearRect(0, 0, can.width, can.height);
			ctx.save();
			ctx.translate(this.rx,0);
			ctx.beginPath();
			ctx.moveTo(0,20);
			ctx.rotate(Math.PI/6* (1-millisecond/500)*f);
			ctx.strokeStyle="rgba(0,25,20,0.5)";
			ctx.lineTo(0,150);
			ctx.drawImage(document.getElementById("img_heat"),-10,140,20,20);
			ctx.stroke();
			ctx.restore();
		}
	}
};
window.onload=function(){
	LoveClock.init({date:new Date(),rx:100,ry:100,radio:60});
	LoveClock.start();
}





